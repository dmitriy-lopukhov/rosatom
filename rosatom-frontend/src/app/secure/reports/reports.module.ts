import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarMenuModule } from 'src/app/shared/avatar-menu/avatar-menu.module';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { NavigationItemsModule } from 'src/app/shared/navigation-items/navigation-items.module';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeesReportComponent } from './employees-report/employees-report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FiltersComponent } from './filters/filters.component';
import { MatSelectModule } from '@angular/material/select';
import { TimechartComponent } from './timechart/timechart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    ReportsComponent,
    EmployeesReportComponent,
    FiltersComponent,
    TimechartComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    AvatarMenuModule,
    NavbarModule,
    NavigationItemsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
})
export class ReportsModule {}
