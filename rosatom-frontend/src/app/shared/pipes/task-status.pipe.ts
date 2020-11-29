import { Pipe, PipeTransform } from '@angular/core';
import { statusTranslations } from 'src/app/core/constants';
import { TaskStatus } from 'src/app/core/types/task.type';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(input: TaskStatus): string {
    if (typeof input === 'number') {
      return statusTranslations[input];
    }
    return input;
  }
}
