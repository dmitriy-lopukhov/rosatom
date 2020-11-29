import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItemsComponent } from './navigation-items.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [NavigationItemsComponent],
  imports: [CommonModule, MatListModule, RouterModule, MatRippleModule],
  exports: [NavigationItemsComponent],
})
export class NavigationItemsModule {}
