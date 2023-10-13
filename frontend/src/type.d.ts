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
  userId: string;
  username: string;
  role: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phone: string;
  email: string;
  accessToken: string;
}
