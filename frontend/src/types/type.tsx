export interface ICourse {
  id: string;
  thumbnail: string;
  title: string;
  teacher: string;
  avatarTeacher: string;
  rating: number;
  priceOfficial: string;
  originalPrice: string;
  numberLesson: number;
  numberStudent: number;
  numberSecurity: number;
}

export interface ICategory {
  id: string;
  title: string;
  numberCourse: number;
  images: string;
}

export interface ITeacher {
  id: string;
  name: string;
  subject: string;
  numberCourser: number;
  numberStudent: number;
  avatar: string;
}
