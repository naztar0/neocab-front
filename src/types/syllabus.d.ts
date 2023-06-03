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
