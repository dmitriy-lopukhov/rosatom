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
import { employeeTranslations } from 'src/app/core/constants';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Employee } from 'src/app/core/types/task.type';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: (keyof Employee)[] = [
    'id',
    'name',
    'patronym',
    'lastname',
    'position',
    'phone',
  ];
  employeeTranslations = employeeTranslations;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource(
    [] as Employee[]
  );
  destroy$ = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeService.employees$
      .pipe(takeUntil(this.destroy$))
      .subscribe((employees) => {
        this.dataSource.data = Object.values(employees);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  navigateToEmployee(event: Event, id: number): void {
    event.preventDefault();
    // this.employeeService.se(id);
    // this.router.navigate(['/secure/task-details/', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
