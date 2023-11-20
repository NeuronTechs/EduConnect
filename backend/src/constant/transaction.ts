export interface ITransaction {
  transaction_id: string;
  student_id: string;
  course_id: string;
  amount: string;
  createdAt: string;
}

export interface ITransactionReport {
  year: number;
  month: number;
  revenue: number;
  total_student: number;
}
