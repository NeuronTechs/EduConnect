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

export interface IModules {
  id: string;
  title: string;
  numberLesson: number;
  course_id: string;
  totalTime: number;
  createdAt: Date;
  updateAt: Date;
}

export interface ILesson {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  video_url: string;
  courseId: string;
  categoryId: string;
  moduleId: string;
  totalTime: number;
  totalReview: number;
  createdAt: Date;
  updateAt: Date;
}

export interface IDiscuss {
  id: string;
  lesson_id: string;
  content: string;
  user_id: string;
  createdAt: Date;
  updateAt: Date;
}
export interface ITask {
  id: string;
  title: string;
  content: string;
  course_id: string;
  start: Date;
  end: Date;
  createdAt: Date;
  updateAt: Date;
}

export interface IStudent {
  id: string;
  education_level: string;
  major: string;
  school: string;
  username: string;
  email: string;
  createdAt: Date;
  updateAt: Date;
}

export interface ISectionInfo {
  id: string;
  title: string;
  lessons: ILessonInfo[];
}
export interface ILessonInfo {
  id: string;
  title: string;
  type?: string;
  idSection: string;
  draff?: boolean;
}

// quiz
export interface IAnswerInfo {
  id: number;
  question: string | null;
  answer: string;
  image: string | null;
  isCorrect: boolean;
  explain?: string | null;
}
export interface IQuestionInfo {
  id: number;
  question: string | null;
  images: string[] | null;
  type: string;
  answers: IAnswerInfo[];
}
export interface IQuizInfo {
  id: number;
  title: string;
  descriptionShort: string;
  duration: number;
  durationUnit: string;
  isRandom: boolean;
  isShowAnswer: boolean;
  type: string;
  passPercent: number;
  retakePercent: number;
  content: string;
  questions: IQuestionInfo[];
}
