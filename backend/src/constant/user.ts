export interface User {
  userId: number;
  username: string;
  password: string;
  role: string | null;
  fullName: string;
  createdAt: string | null;
  updatedAt: string | null;
  avatar: string | null;
  phone: string | null;
  email: string | null;
}

export interface registerResponse {
  status: boolean;
  data: User | null;
  message: string;
}
