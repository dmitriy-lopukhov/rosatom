import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Task } from 'src/app/core/types/task.type';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsComponent implements OnInit {
  showSidebar = true;
  currentTabIndex = 0;
  currentTask$: Observable<Task | null>;

  constructor(private tasksService: TasksService) {
    this.currentTask$ = this.tasksService.currentTask$.pipe(
      filter((val) => !!val)
    );
  }

  ngOnInit(): void {}

  onMenuToggle(): void {
    this.showSidebar = !this.showSidebar;
  }
}
