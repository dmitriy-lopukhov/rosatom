import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { TaskDetailsComponent } from './task-details.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarMenuModule } from 'src/app/shared/avatar-menu/avatar-menu.module';
import { TaskDetailsFormComponent } from './task-details-form/task-details-form.component';
import { NavbarModule } from 'src/app/shared/navbar/navbar.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LinkedTasksComponent } from './linked-tasks/linked-tasks.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { NavigationItemsModule } from 'src/app/shared/navigation-items/navigation-items.module';

@NgModule({
  declarations: [
    TaskDetailsComponent,
    TaskDetailsFormComponent,
    LinkedTasksComponent,
  ],
  imports: [
    CommonModule,
    TaskDetailsRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    PipesModule,
    AvatarMenuModule,
    NavbarModule,
    NavigationItemsModule,
  ],
})
export class TaskDetailsModule {}
