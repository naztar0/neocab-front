interface Contract {
  id: number;
  user_id: number;
  title: string;
  price: number;
  total: number;
  created_at: string;
  updated_at: string;
  payments: Payment[];
}

interface Payment {
  id: number;
  contract_id: number;
  amount: number;
  semester: number;
  created_at: string;
  updated_at: string;
}
