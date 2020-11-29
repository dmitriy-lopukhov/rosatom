import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { taskTranslations } from 'src/app/core/constants';
import { TasksService } from 'src/app/core/services/tasks.service';
import { TaskPrior, TaskStatus } from 'src/app/core/types/task.type';
import {
  getPriorTranslations,
  getStatusTranslations,
  isPositiveInteger,
} from 'src/app/core/utils';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnDestroy {
  destroy$ = new Subject();
  taskTranslations = taskTranslations;
  getPriorTranslations = getPriorTranslations;
  getStatusTranslations = getStatusTranslations;
  priorities: number[] = [
    -1,
    ...Object.keys(TaskPrior)
      .filter((i) => !isNaN(parseInt(i, 10)))
      .map((i) => +i),
  ];
  statuses: number[] = [
    -1,
    ...Object.keys(TaskStatus)
      .filter((i) => !isNaN(parseInt(i, 10)))
      .map((i) => +i),
  ];
  form: FormGroup = new FormGroup({
    status: new FormControl(null),
    prior: new FormControl(null),
  });

  constructor(private tasksService: TasksService) {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        const filters = {
          prior: isPositiveInteger(changes.prior) ? changes.prior : undefined,
          status: isPositiveInteger(changes.status)
            ? changes.status
            : undefined,
        };
        this.tasksService.setFilters(filters);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
