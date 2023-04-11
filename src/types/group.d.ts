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

interface GroupSortingParams {
  ordName?: OrderType;
  search?: string;
}

type GroupQueryParams = BaseQueryParams & GroupSortingParams;
