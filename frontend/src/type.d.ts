export interface Auth {
  username: string;
  password: string;
}
export interface signupState {
  username: string;
  email: string;
  password: string;
  full_name: string;
}
export interface User {
  userId: string;
  username: string;
  role: string | null;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phone: string;
  email: string;
  accessToken: string;
  user_id: string;
}
