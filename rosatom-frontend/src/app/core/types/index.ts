export type FilterType = 'prior' | 'status';
export type EmployeeReportFilters = {
  orgunit?: string;
  type: FilterType;
};
