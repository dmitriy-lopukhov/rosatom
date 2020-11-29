import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../core/services/employee.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecureComponent implements OnDestroy {
  destroy$ = new Subject();

  constructor(private employeeService: EmployeeService) {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
