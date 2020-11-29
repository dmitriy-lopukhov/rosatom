import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { statusTranslations } from 'src/app/core/constants';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { EmployeeReportFilters } from 'src/app/core/types';
import { Employee, Task, TaskStatus } from 'src/app/core/types/task.type';

const getEmployeeName = (employee: Employee) => {
  return employee ? `${employee.name} ${employee.lastname}` : '';
};

const formatter = (item: number) => {
  return Math.round(item);
};

const getSerieValue = (
  tasks: Task[],
  employee: Employee,
  key: 'status' | 'prior',
  value: number
) => {
  return tasks.filter((i) => i.executor === employee.id && i[key] === value)
    .length;
};

type ChartSerie = {
  name: string;
  value: number;
};

type ChartNode = {
  name: string;
  series: ChartSerie[];
};

type ChartEntry = {
  name: string;
  value: number;
  label: string;
  series: string;
};

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html',
  styleUrls: ['./employees-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesReportComponent {
  @Input() set filters(filters: EmployeeReportFilters | null) {
    this.employeeReportFilters.next(filters);
  }
  private employeeReportFilters = new BehaviorSubject<EmployeeReportFilters | null>(
    null
  );
  data$: Observable<ChartNode[]>;
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition = 'below';
  legendTitle = '';
  showXAxisLabel = true;
  yAxisLabel = '';
  showYAxisLabel = true;
  xAxisLabel = 'Количество задач';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5'],
  };
  statuses: number[] = Object.keys(TaskStatus)
    .filter((i) => !isNaN(parseInt(i, 10)))
    .map((i) => +i);
  xAxisTickFormatting = formatter;
  ticks: number[] = [0, 1];

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {
    this.data$ = combineLatest([
      this.tasksService.tasks$,
      this.employeeService.employees$,
      this.employeeReportFilters,
    ]).pipe(
      debounceTime(100),
      map(([tasks, employees, employeeReportFilters]) => {
        const arr =
          employeeReportFilters && employeeReportFilters.orgunit
            ? Object.values(employees).filter(
                (i) => i.orgunit === employeeReportFilters.orgunit
              )
            : Object.values(employees);
        const items: ChartNode[] = arr.reduce((res: ChartNode[], employee) => {
          const item: ChartNode = {
            name: getEmployeeName(employee),
            series: this.statuses.map((status: TaskStatus) => {
              const key =
                (employeeReportFilters && employeeReportFilters.type) ??
                'status';
              const serie: ChartSerie = {
                name: statusTranslations[status],
                value: getSerieValue(tasks, employee, key, status),
              };
              return serie;
            }),
          };
          res.push(item);
          return res;
        }, []);
        this.ticks = this.getTicks(items);
        return items;
      })
    );
  }

  private getTicks(data: ChartNode[]): number[] {
    const counts = data
      .map((i) => i.series)
      .reduce((acc, val) => acc.concat(val), [])
      .map((i) => i.value);
    const max = Math.max(...counts);
    return [...Array(Number.isInteger(max) ? max : 0).keys()];
  }

  onSelect(data: ChartEntry): void {
    // console.log('Item clicked', data);
  }

  onActivate(data: { entries: ChartEntry[]; value: ChartEntry }): void {
    // console.log('Activate', data);
  }

  onDeactivate(data: { entries: ChartEntry[]; value: ChartEntry }): void {
    // console.log('Deactivate', data);
  }
}
