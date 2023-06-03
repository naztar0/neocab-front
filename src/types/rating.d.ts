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
