import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task, TaskPrior, TaskStatus } from '../types/task.type';

type TaskDict = { [id: number]: Task };

type State = {
  tasks: TaskDict;
  ids: number[];
  currentTaskId: number | null;
  prior: TaskPrior | null;
  status: TaskStatus | null;
};

const initialState: State = {
  tasks: {},
  ids: [],
  currentTaskId: null,
  prior: null,
  status: null,
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = new BehaviorSubject<State>(initialState);
  public readonly tasks$ = this.tasks.asObservable().pipe(
    map((state) =>
      Object.values(state.tasks)
        .filter((i) => (state.prior === null ? i : state.prior === i.prior))
        .filter((i) => (state.status === null ? i : state.status === i.status))
    )
  );
  public readonly currentTask$ = this.tasks.asObservable().pipe(
    debounceTime(100),
    map((state) =>
      state.currentTaskId ? state.tasks[state.currentTaskId] : null
    )
  );
  public readonly linkedTasks$ = this.tasks.asObservable().pipe(
    map((state) => {
      const random = Math.random() * (Object.keys(state.tasks).length - 1);
      return Object.values(state.tasks).slice(random, random + 3);
    })
  );

  constructor(private httpClient: HttpClient) {
    this.getTasks().subscribe();
  }

  getTasks(): Observable<Task[]> {
    // fake request
    // return timer(200).pipe(
    //   switchMap(() =>
    //     of(Array.from({ length: 100 }, (_, k) => createTask(k + 1))).pipe(
    //       tap((tasks) => this.setState(tasks))
    //     )
    //   )
    // );
    return this.httpClient
      .get<Task[]>(`${environment.apiUrl}/issue`)
      .pipe(tap((data) => this.setState(data)));
  }

  setState(tasks: Task[]): void {
    const state: State = {
      ...this.tasks.getValue(),
      tasks: tasks.reduce((res: TaskDict, i) => {
        res[i.id] = i;
        return res;
      }, {}),
      ids: tasks.map((i) => i.id),
    };
    this.tasks.next(state);
  }

  setCurrentTaskId(id: number): void {
    this.tasks.next({
      ...this.tasks.getValue(),
      currentTaskId: id,
    });
  }

  setFilters({
    prior,
    status,
  }: {
    prior?: TaskPrior;
    status?: TaskStatus;
  }): void {
    const state: State = {
      ...this.tasks.getValue(),
      prior: prior ?? null,
      status: status ?? null,
    };
    this.tasks.next(state);
  }
}

function getRandomNumber(): number {
  return Math.round(Math.random() * 19);
}

function getRandomPrior(): TaskPrior {
  return Math.round(Math.random() * 3);
}
function getRandomStatus(): TaskStatus {
  return Math.round(Math.random() * 3);
}

function createTask(id: number): Task {
  const author = getRandomNumber();
  const caption = `Задача ${id}`;
  const description = `Описание ${id}`;
  const executor = getRandomNumber();
  const prior = getRandomPrior();
  const status = getRandomStatus();

  return {
    id,
    caption,
    author,
    creationDate: new Date().toISOString(),
    deadline: new Date().toISOString(),
    description,
    executor,
    prior,
    status,
    updateDate: new Date().toISOString(),
  };
}
