import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';

import * as dayjs from 'dayjs';
import { TasksService } from 'src/app/core/services/tasks.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { getEmployeeName } from 'src/app/core/utils';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

const baseChartOptions: ChartOptions = {
  series: [],
  chart: {
    height: 750,
    type: 'rangeBar',
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
    formatter(val: any): string {
      const a = dayjs(val[0]);
      const b = dayjs(val[1]);
      const diff = b.diff(a, 'day');
      return diff + (diff > 1 ? ' Дней' : ' День');
    },
  },
  xaxis: {
    type: 'datetime',
  },
  legend: {
    position: 'top',
  },
};

@Component({
  selector: 'app-timechart',
  templateUrl: './timechart.component.html',
  styleUrls: ['./timechart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimechartComponent {
  public chartOptions$: Observable<ChartOptions>;

  constructor(
    private tasksService: TasksService,
    private employeeService: EmployeeService
  ) {
    this.chartOptions$ = combineLatest([
      this.tasksService.tasks$,
      this.employeeService.employees$,
    ]).pipe(
      debounceTime(100),
      map(([tasks, employees]) => {
        const arr = Object.values(employees);
        const series: ApexAxisChartSeries = arr.reduce(
          (res: ApexAxisChartSeries, employee) => {
            const item = {
              name: getEmployeeName(employees, employee.id),
              data: tasks
                .filter((i) => i.executor === employee.id)
                .map((i) => {
                  return {
                    x: i.caption,
                    y: [
                      new Date(i.creationDate).getTime(),
                      new Date(i.deadline ?? 'default').getTime(),
                    ],
                  };
                }),
            };
            res.push(item);
            return res;
          },
          []
        );
        return { ...baseChartOptions, series };
      })
    );
  }
}
