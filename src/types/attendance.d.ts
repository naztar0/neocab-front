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

type AttendanceQueryParams = BaseQueryParams;
