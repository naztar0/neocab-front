export enum StepType {
  Faculty,
  Speciality,
  Program,
  Department,
  Specialization,
  Group,
  User,
}

export enum OrderType {
  Asc = 'asc',
  Desc = 'desc',
}

export const defaultPagePerPage = { page: 1, perPage: 25 };
export const pageSizeOptions = [10, 25, 50, 100];
export const searchPattern = /^[0-9a-zA-Zа-яА-ЯґҐєЄіІїЇ' -]+$/;
export const searchPatternString = String(searchPattern).slice(1, -1);

export interface DataType {
  name: string;
  id: number;
}

export interface UserDataType extends User {
  id: number;
}
