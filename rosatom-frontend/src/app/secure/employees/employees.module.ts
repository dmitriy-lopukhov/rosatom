import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AvatarMenuModule } from 'src/app/shared/avatar-menu/avatar-menu.module';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { NavigationItemsModule } from 'src/app/shared/navigation-items/navigation-items.module';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [EmployeesComponent, EmployeesTableComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AvatarMenuModule,
    NavbarModule,
    NavigationItemsModule,
  ],
})
export class EmployeesModule {}
