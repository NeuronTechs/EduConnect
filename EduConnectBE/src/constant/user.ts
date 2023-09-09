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

export interface informationDataUpdate {
  userId: number;
  role: string;
  fullName: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
  educational_level: string | null;
  major: string | null;
  course: string | null;
  school: string | null;
  address_school: string | null;
}

export interface informationResponse {
  status: boolean;
  data?: informationDataUpdate | null;
  message: string;
}
