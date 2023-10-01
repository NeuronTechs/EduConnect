export interface typeCourse {
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

export interface typeCategory {
  id: string;
  title: string;
  numberCourse: number;
  images: string;
}

export interface typeTeacher {
  id: string;
  name: string;
  subject: string;
  numberCourser: number;
  numberStudent: number;
  avatar: string;
}
