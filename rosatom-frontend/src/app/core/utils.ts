import { priorTranslations, statusTranslations } from './constants';
import { EmployeeDict, TaskPrior, TaskStatus } from './types/task.type';

export const getPriorTranslations = (item: TaskPrior): string => {
  return priorTranslations[item];
};
export const getStatusTranslations = (item: TaskStatus): string => {
  return statusTranslations[item];
};

export const getEmployeeName = (
  employees?: EmployeeDict,
  id?: number
): string => {
  return id && employees && employees[id]
    ? `${employees[id].name} ${employees[id].lastname}`
    : 'Неизвестен';
};

export const isPositiveInteger = (num: number) => {
  return Number.isInteger(num) && num >= 0;
};
