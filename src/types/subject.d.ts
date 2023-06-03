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
