import { Employee, Task, TaskPrior, TaskStatus } from './types/task.type';

export const logo = 'assets/images/logo-rosatom.png';

export const taskTranslations: Record<keyof Task, string> = {
  id: 'Код',
  caption: 'Тема',
  author: 'Автор',
  executor: 'Исполнитель',
  prior: 'Приоритет',
  creationDate: 'Дата создания',
  deadline: 'Дедлайн',
  status: 'Статус',
  description: 'Описание',
  updateDate: 'Дата изменения',
};
export const employeeTranslations: Record<keyof Employee, string> = {
  id: 'Код',
  name: 'Имя',
  lastname: 'Фамилия',
  patronym: 'Отчество',
  position: 'Должность',
  created: 'Создан',
  orgunit: 'Подразделение',
  phone: 'Телефон',
};

export const priorTranslations: Record<TaskPrior | -1, string> = {
  '-1': 'Все',
  [TaskPrior.NOT_ESTIMATED]: 'Нет',
  [TaskPrior.LOW]: 'Низкий',
  [TaskPrior.MEDIUM]: 'Средний',
  [TaskPrior.HIGH]: 'Высокий',
};

export const statusTranslations: Record<TaskStatus | -1, string> = {
  '-1': 'Все',
  [TaskStatus.UNKNOWN]: 'Неизвестно',
  [TaskStatus.TODO]: 'В работе',
  [TaskStatus.DONE]: 'Выполнено',
  [TaskStatus.FREEZE]: 'Остановлено',
};

export const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.UNKNOWN]: '',
  [TaskStatus.TODO]: '#0c265d',
  [TaskStatus.DONE]: 'green',
  [TaskStatus.FREEZE]: 'gray',
};

export const priorColors: Record<TaskPrior, string> = {
  [TaskPrior.NOT_ESTIMATED]: '',
  [TaskPrior.LOW]: '#2f9877',
  [TaskPrior.MEDIUM]: 'orange',
  [TaskPrior.HIGH]: 'red',
};

export const dateAndTimeFormat = 'dd.MM.yyyy HH:mm';
