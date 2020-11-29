import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriorPipe } from './task-prior.pipe';
import { TaskStatusPipe } from './task-status.pipe';

const pipes = [TaskPriorPipe, TaskStatusPipe];

@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes],
})
export class PipesModule {}
