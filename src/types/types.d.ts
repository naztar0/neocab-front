// noinspection JSUnusedGlobalSymbols

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  image: ?string;
  cover: ?string;
  student_id: number;
  telegram_id: ?number;
  azure_id: ?number;
  group_id: number;
  role: string;
  locale: string;
  created_at: string;
  updated_at: string;
  year: number;
  train_level: string;
  train_form: string;
  payment: string;
  group: Group;
}

interface RecordBook extends Timestamps {
  id: number;
  user_id: number;
  syllabus_id: number;
  mark_id: number;
  mark: number;
  debt_date: ?string;
  syllabus: Syllabus;
}

interface Rating extends Timestamps {
  id: number;
  user_id: ?number;
  semester: number;
  mark: string;
  comment: string;
  user: Profile;
  name: ?string; // backward compatibility
  group: ?string; // backward compatibility
  student_id: ?number; // backward compatibility
  speciality_id: ?number; // backward compatibility
}

interface Syllabus {
  id: number;
  subject_id: number;
  group_id: number;
  semester: number;
  hours: string;
  credit: string;
  control: string;
  individual_task: string;
  subject: Subject;
}

interface Faculty {
  id: number;
  name: string;
}

interface Speciality {
  id: number;
  name: string;
  faculty_id: number;
  faculty: Faculty;
}

interface Program {
  id: number;
  name: string;
  speciality_id: number;
  speciality: Speciality;
}

interface Department {
  id: number;
  name: string;
  program_id: number;
  program: Program;
}

interface Specialization {
  id: number;
  name: string;
  department_id: number;
  department: Department;
}

interface Group {
  id: number;
  name: string;
  specialization_id: number;
  specialization: Specialization;
}

interface Subject {
  id: number;
  title: string;
  notes: ?string;
  professor_id: ?number;
  department_id: ?number;
  professor: ?User;
  department: Department;
  professor_name: ?string; // Backward compatibility
}

interface Timestamps {
  created_at: string;
  updated_at: string;
}

interface CalendarEvent {
  subject: string;
  start: string;
  end: string;
  organizer: string;
  joinUrl: string;
}

interface Schedule {
  id: number;
  week: number;
  description: string;
  group_id: number;
  schedule_subjects: ScheduleSubject[];
}

interface ScheduleSubject {
  id: number;
  schedule_id: number;
  subject_id: number;
  time: string;
  day: number;
  notes: string;
  subject: Subject;
}

interface AttendanceLog {
  id: number;
  user_id: number;
  schedule_subject_id: number;
  date: string;
  schedule_subject: ScheduleSubject;
}

interface AttendanceHistory {
  date: string;
  count: number;
}

interface AttendanceMostVisited {
  title: string;
  count: number;
}

interface AttendanceResponse {
  attendance: AttendanceLog[];
  history: AttendanceHistory[];
  most_visited: AttendanceMostVisited[];
}

interface AttendanceGroup {
  date: string;
  schedule_subject: ScheduleSubject;
  users: User[];
}

interface Pagination<T> {
  current_page: number;
  last_page: number;
  per_page: number;
  data: Array<T>;
  from: number;
  to: number;
  first_page_url: string;
  prev_page_url: string;
  next_page_url: string;
  last_page_url: string;
  total: number;
  path: string;
  links: Array<{
    url: ?string;
    label: string;
    active: boolean;
  }>;
}

interface BaseQueryParams {
  page?: number;
  perPage?: number;
}

interface UserSortingParams {
  ordFirstName?: OrderType;
  ordLastName?: OrderType;
  search?: string;
}

interface GroupSortingParams {
  ordName?: OrderType;
  search?: string;
}

type User = Profile;
type OrderType = 'asc' | 'desc';
type UserQueryParams = BaseQueryParams & UserSortingParams;
type GroupQueryParams = BaseQueryParams & GroupSortingParams;
type AttendanceQueryParams = BaseQueryParams;
