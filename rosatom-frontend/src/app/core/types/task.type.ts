export enum TaskStatus {
  UNKNOWN = 0,
  TODO,
  DONE,
  FREEZE,
}

export enum TaskPrior {
  NOT_ESTIMATED = 0,
  HIGH,
  MEDIUM,
  LOW,
}

export type Task = {
  id: number;
  caption: string;
  author: number;
  executor: number | undefined;
  status: TaskStatus;
  prior: TaskPrior;
  description: string;
  deadline: string | undefined;
  creationDate: string;
  updateDate: string;
};

export type Employee = {
  id: number;
  name: string;
  lastname: string;
  patronym: string;
  position: string;
  created: string;
  phone: string;
  orgunit: string;
};

export type EmployeeDict = { [id: number]: Employee };
