import { Pipe, PipeTransform } from '@angular/core';
import { priorTranslations } from 'src/app/core/constants';
import { TaskPrior } from 'src/app/core/types/task.type';

@Pipe({
  name: 'taskPrior',
})
export class TaskPriorPipe implements PipeTransform {
  transform(input: TaskPrior): string {
    if (typeof input === 'number') {
      return priorTranslations[input];
    }
    return input;
  }
}
