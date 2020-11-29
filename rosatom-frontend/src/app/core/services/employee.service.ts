import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee, EmployeeDict } from '../types/task.type';

/** Constants used to fill up our data base. */
const NAMES: string[] = [
  'Иван',
  'Пётр',
  'Константин',
  'Максим',
  'Борис',
  'Дмитрий',
  'Арсений',
  'Николай',
  'Виталий',
  'Виктор',
  'Владлен',
  'Владимир',
  'Алексей',
  'Александр',
];

const LASTNAMES: string[] = [
  'Иванов',
  'Петров',
  'Сидоров',
  'Смирнов',
  'Алексеев',
  'Попов',
  'Беглов',
  'Миронов',
  'Нечаев',
  'Прокопенко',
  'Николаев',
  'Ложкин',
];
const PATRONYMS: string[] = [
  'Иванович',
  'Петрович',
  'Сергеевич',
  'Константинович',
  'Алексеевич',
  'Викторович',
  'Владимирович',
  'Николаевич',
];
const POSITIONS: string[] = [
  'Инженер',
  'Программист',
  'Технолог',
  'Мастер',
  'Начальник цеха',
  'Начальник отдела',
  'Сброщик',
  'Руководитель подразделения',
];
const ORGUINITS: string[] = [
  'Отдел 1',
  'Отдел 2',
  'Отдел 3',
  'Отдел 4',
  'Цех 1',
  'Цех 2',
  'Цех 3',
  'Цех 4',
];

function getRandomValue(arr: string[]): string {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function createEmployee(id: number): Employee {
  const name = getRandomValue(NAMES);
  const lastname = getRandomValue(LASTNAMES);
  const orgunit = getRandomValue(ORGUINITS);
  const phone = `+7${Date.now()}`;
  const patronym = getRandomValue(PATRONYMS);
  const position = getRandomValue(POSITIONS);

  return {
    id,
    created: new Date().toISOString(),
    name,
    lastname,
    orgunit,
    phone,
    patronym,
    position,
  };
}

type State = {
  employees: EmployeeDict;
  ids: number[];
  currentEmployeeId: number | null;
};

const initialState: State = {
  employees: {},
  ids: [],
  currentEmployeeId: null,
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = new BehaviorSubject<State>(initialState);
  public readonly employees$ = this.employees
    .asObservable()
    .pipe(map((state) => state.employees));
  public readonly currentEmployee$ = this.employees.asObservable().pipe(
    debounceTime(100),
    map((state) =>
      state.currentEmployeeId ? state.employees[state.currentEmployeeId] : null
    )
  );
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(`${environment.apiUrl}/employee`)
      .pipe(tap((data) => this.setState(data)));
    // return timer(200).pipe(
    //   switchMap(() =>
    //     of(Array.from({ length: 20 }, (_, k) => createEmployee(k + 1))).pipe(
    //       tap((tasks) => this.setState(tasks))
    //     )
    //   )
    // );
  }

  setState(employees: Employee[]): void {
    const state: State = this.getState(employees);
    this.employees.next(state);
  }

  private getState(employees: Employee[]): State {
    return {
      ...this.employees.getValue(),
      employees: employees.reduce((res: EmployeeDict, i) => {
        res[i.id] = i;
        return res;
      }, {}),
      ids: employees.map((i) => i.id),
    };
  }
}
