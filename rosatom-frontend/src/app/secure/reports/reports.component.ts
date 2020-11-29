import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeReportFilters } from 'src/app/core/types';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit {
  showSidebar = true;
  currentTabIndex = 0;
  filters: EmployeeReportFilters | null = null;
  constructor() {}

  ngOnInit(): void {}

  onMenuToggle(): void {
    this.showSidebar = !this.showSidebar;
  }

  onFiltersChanged(filters: EmployeeReportFilters): void {
    this.filters = filters;
  }
}
