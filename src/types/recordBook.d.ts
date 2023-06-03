interface RecordBook extends Timestamps {
  id: number;
  user_id: number;
  syllabus_id: number;
  mark_id: number;
  mark: number;
  debt_date: ?string;
  syllabus: Syllabus;
}
