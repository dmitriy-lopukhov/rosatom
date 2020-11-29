import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  priorTranslations,
  statusTranslations,
  taskTranslations,
} from 'src/app/core/constants';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import {
  Employee,
  EmployeeDict,
  Task,
  TaskPrior,
  TaskStatus,
} from 'src/app/core/types/task.type';
import {
  getPriorTranslations,
  getStatusTranslations,
} from 'src/app/core/utils';

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsFormComponent implements OnInit {
  task$: Observable<Task | null>;
  form: FormGroup = new FormGroup({
    caption: new FormControl(null, Validators.required),
    author: new FormControl(null, Validators.required),
    executor: new FormControl(null, Validators.required),
    status: new FormControl(TaskStatus.UNKNOWN, Validators.required),
    prior: new FormControl(TaskPrior.NOT_ESTIMATED, Validators.required),
    description: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
  });
  error: string | null = null;
  taskTranslations = taskTranslations;
  priorities: number[] = Object.keys(TaskPrior)
    .filter((i) => !isNaN(parseInt(i, 10)))
    .map((i) => +i);
  statuses: number[] = Object.keys(TaskStatus)
    .filter((i) => !isNaN(parseInt(i, 10)))
    .map((i) => +i);
  employees$: Observable<Employee[]>;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {
    const currentTaskId = +this.route.snapshot.params.id;
    this.task$ = this.tasksService.currentTask$.pipe(
      tap((task) => {
        if (!task) {
          this.tasksService.setCurrentTaskId(currentTaskId);
        } else {
          this.form.patchValue(task);
        }
      })
    );
    this.employees$ = this.employeeService.employees$.pipe(
      map((data) => Object.values(data))
    );
  }

  getPriorTranslations = getPriorTranslations;
  getStatusTranslations = getStatusTranslations;

  ngOnInit(): void {}

  submit(): void {}
}
