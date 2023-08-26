export interface Auth {
  username: string;
  password: string;
}
export interface User {
  data: {
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    mobile: string;
    lastLogin: date;
    intro: string;
    profile: string;
    authGoogleId: string;
    authGithubId: string;
    authType: string;
    accessToken: string;
  };
}
