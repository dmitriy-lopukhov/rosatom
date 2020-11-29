import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  dateAndTimeFormat,
  priorColors,
  statusColors,
  taskTranslations,
} from 'src/app/core/constants';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { EmployeeDict, Task, TaskPrior } from 'src/app/core/types/task.type';
import { getEmployeeName } from 'src/app/core/utils';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: (keyof Task)[] = [
    'id',
    'caption',
    'author',
    'executor',
    'prior',
    'creationDate',
    'deadline',
    'status',
  ];
  taskTranslations = taskTranslations;
  dataSource: MatTableDataSource<Task> = new MatTableDataSource([] as Task[]);
  destroy$ = new Subject();
  employees: EmployeeDict = {};
  getEmployeeName = getEmployeeName;
  dateAndTimeFormat = dateAndTimeFormat;

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.tasksService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.dataSource.data = tasks;
      });
    this.tasksService.getTasks();

    this.employeeService.employees$
      .pipe(takeUntil(this.destroy$))
      .subscribe((employees) => (this.employees = employees));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      return (
        data.caption.indexOf(filter) !== -1 ||
        getEmployeeName(this.employees, data.author)
          .toLocaleLowerCase()
          .indexOf(filter) !== -1 ||
        getEmployeeName(this.employees, data.executor)
          .toLocaleLowerCase()
          .indexOf(filter) !== -1
      );
    };
  }

  getPriorColor(prior: TaskPrior): string {
    return priorColors[prior];
  }
  getStatusColor(status: TaskPrior): string {
    return statusColors[status];
  }

  applyFilter(event: Event): void {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmtpyMessage(query: string): string {
    return query ? `Ничего не найдено по фильтру "${query}"` : '';
  }

  navigatoToTask(event: Event, id: number): void {
    event.preventDefault();
    this.tasksService.setCurrentTaskId(id);
    this.router.navigate(['/secure/task-details/', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
