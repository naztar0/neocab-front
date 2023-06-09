interface AcademicPerformance extends Timestamps {
  record_book_marks: {
    semester: number;
    mark: string;
  }[]
  rating_marks: {
    semester: number;
    position: number;
    total_count: number;
    percentage: number;
  }[]
  attendances: {
    date: string;
    count: number;
  }[]
}
