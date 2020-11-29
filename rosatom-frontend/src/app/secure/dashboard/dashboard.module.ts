import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TasksTableComponent } from './tasks-table/tasks-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AvatarMenuModule } from 'src/app/shared/avatar-menu/avatar-menu.module';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { FiltersComponent } from './filters/filters.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationItemsModule } from 'src/app/shared/navigation-items/navigation-items.module';

@NgModule({
  declarations: [DashboardComponent, TasksTableComponent, FiltersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    AvatarMenuModule,
    NavbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    PipesModule,
    NavigationItemsModule,
  ],
})
export class DashboardModule {}
