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
