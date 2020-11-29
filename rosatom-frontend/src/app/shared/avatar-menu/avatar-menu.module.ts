import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarMenuComponent } from './avatar-menu.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AvatarMenuComponent],
  imports: [CommonModule, MatCardModule],
  exports: [AvatarMenuComponent],
})
export class AvatarMenuModule {}
