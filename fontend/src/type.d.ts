export interface Auth {
  username: string;
  password: string;
}
export interface signupState {
  username: string;
  email: string;
  password: string;
  fullname: string;
}
export interface User {
  userId: string | null;
  username: string | null;
  role: string | null;
  fullName: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  avatar: string | null;
  phone: string | null;
  email: string | null;
  accessToken: string | null;
}
