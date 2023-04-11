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

interface UserSortingParams {
  ordFirstName?: OrderType;
  ordLastName?: OrderType;
  search?: string;
}

type User = Profile;
type OrderType = 'asc' | 'desc';
type UserQueryParams = BaseQueryParams & UserSortingParams;
