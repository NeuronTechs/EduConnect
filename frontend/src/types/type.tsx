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
  email: string;
  phone: string;
  avatar: string;
  position: string;
  school: string;
  totalStudent: number;
  scoreReview: number;
  totalReview: number;
  totalCourse: number;
  subject: string;
  introduce: string;
  linkWeb: string;
  linkFacebook: string;
  linkYoutube: string;
  linkLinkedin: string;
}

export interface IConventionChat {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  isOnline: boolean;
  chatNew: number;
}
// export interface IMediaLink {
//   link: string;
//   type: "video" | "image" | "file" | "audio";
// }
export interface IMessage {
  id: string | number;
  avatar: string;
  name: string;
  time: number;
  seeMessage: string[];
  message: string;
  images?: {
    src: string;
    alt?: string;
  }[];
  videos?: {
    src: string;
    alt?: string;
  }[];
  audios?: {
    src: string;
    name: string;
    duration: number;
  }[];
  files?: {
    src: string;
    name: string;
    size: number;
  }[];
  isLoading?: boolean;
}
