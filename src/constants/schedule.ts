export const shiftCoefficient = 1.416;
export const customSubjectDuration = 90;
export type BtnType = 'prev' | 'next';
export const dateFormat = 'MMM yyyy';
export const monthFormat = 'MMM';
export const yearFormat = 'yyyy';
export const dayNumFormat = 'dd';
export const dayNameFormat = 'EEEE';
export const timeFormat = 'HH:mm';
export const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export enum ScheduleType {
  azure,
  custom,
}

export enum ScheduleEditType {
  addNew,
  editMeta,
  editSubjects,
}
