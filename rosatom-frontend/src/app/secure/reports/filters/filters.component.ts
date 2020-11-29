import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { taskTranslations } from 'src/app/core/constants';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeReportFilters, FilterType } from 'src/app/core/types';
import { Employee } from 'src/app/core/types/task.type';
import { isPositiveInteger } from 'src/app/core/utils';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnDestroy {
  @Output() filtersChanged = new EventEmitter<EmployeeReportFilters>();
  destroy$ = new Subject();
  taskTranslations = taskTranslations;
  form: FormGroup = new FormGroup({
    orgunit: new FormControl(-1),
    type: new FormControl('status'),
  });
  orgunits$: Observable<string[]>;
  types: { title: string; key: FilterType }[] = [
    {
      title: taskTranslations.prior,
      key: 'prior',
    },
    {
      title: taskTranslations.status,
      key: 'status',
    },
  ];

  constructor(private employeeService: EmployeeService) {
    this.orgunits$ = this.employeeService.employees$.pipe(
      map((employees) => Object.values(employees).map((i) => i.orgunit))
    );
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        const filters = {
          orgunit: changes.orgunit ? changes.orgunit : undefined,
          type: changes.type,
        };
        this.filtersChanged.emit(filters);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
