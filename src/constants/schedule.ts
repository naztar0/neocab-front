export const shiftCoefficient = 1.4;
export const customSubjectDuration = 90;
export type BtnType = 'prev' | 'next';
export const dateFormat = 'MMM yyyy';
export const dayNumFormat = 'dd';
export const dayNameFormat = 'EEEE';
export const timeFormat = 'HH:mm';
export const dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export enum ScheduleType {
  azure,
  custom,
}

export enum ScheduleEditType {
  addNew,
  editMeta,
  editSubjects,
}
