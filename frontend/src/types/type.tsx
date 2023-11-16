import { AuthState } from "@/features/auth/authSlice";
import { CartState } from "@/features/cart/cartSlice";
import { CheckoutState } from "@/features/checkoutCourse/checkoutSlice";
import { CourseState } from "@/features/course/courseSlice";
import { CourseOverviewState } from "@/features/overviewCourse/courseOverviewSlice";

export interface SliceState {
  authSlice: AuthState;
  courseSlice: CourseState;
  cartSlice: CartState;
  courseOverviewSlice: CourseOverviewState;
  checkoutSlice: CheckoutState;
}
export interface ICourse {
  course_id: string;
  teacher_id: string;
  topic_id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  total_hours: number;
  createdAt: string;
  updatedAt: string;
  sessions?: ISession[] | null;
  teacher_avatar?: string;
  teacher_name?: string;
  completed_lectures?: number;
  total_lectures?: number;
}

export interface ICourseDetail {
  course_id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  study: string;
  requirement: string;
  level: string;
  language: string;
  discount: number;
  ranking?: number;
  total_ranking?: number;
  total_enrollment?: number;
  total_lecture?: number;
  total_hour?: number;
  total_student?: number;
  teacher_id: string;
  topic_id: string;
  teacher?: ITeacher;
  user?: IUser;
  topic?: ITopic;
}
export interface IUser {
  username: string;
  full_name: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
  birthday: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}
export interface ITopic {
  topic_id: string;
  title: string;
  description?: string;
  course_count: number;
  images?: string;
}

export interface ITeacher {
  teacher_id: string;
  username: string;
  introduce?: string;
  subject?: string;
  educational_level?: string;
  email: string;
  phone: string;
  avatar: string;
  course?: string;
  major: string;
  school: string;
  address_school?: string;
  amount?: number;
  totalStudent?: number;
  scoreReview?: number;
  totalReview?: number;
  totalCourse?: number;
  linkWeb?: string;
  linkFacebook?: string;
  linkYoutube?: string;
  linkLinkedin?: string;
  user?: IUser;
}
export interface IComment {
  comment_id?: string | undefined | null;
  content: string;
  username: string;
  lecture_id: string;
  createdAt?: number;
  resource?:
    | {
        path: string;
        size: number;
        mimetype: string;
        originalname: string;
      }[]
    | null;
  timestamp: string;
  avatar?: string | null;
}
export interface ISession {
  session_id: string;
  course_id: string;
  name: string;
  lectures: ILecture[] | null;
}

export interface ILecture {
  lecture_id: string;
  lecture_name: string;
  description: string;
  source: string;
  course_id: string;
  session_id: string;
  type: string;
  comments: IComment[] | null;
  duration: string;
  has_watched?: string;
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

export interface IStudentProgress {
  student_id: string;
  course_id: string;
  session_id: string;
  lecture_id: string;
  progress: number;
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
// section quiz
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
// overview course
export interface ICourseOverview {
  course_id: string;
  title: string;
  image: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requirement: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  study: any;
  price: number;
  discount: number;
  level: string;
  language: string;
  totalTime?: number;
  totalLecture?: number;
  timeLine?: number | string;
  student?: number | string;
  teacher_id: string;
  fullName: string;
  educational_level: string;
  avatar: string;
  student_id: string;
  sessions: ISessionOverview[];
}

export interface ISessionOverview {
  session_id: string;
  name: string;
  lectures: ILectureOverview[];
}

export interface ILectureOverview {
  lecture_id: string;
  lecture_name: string;
  description: string;
  source: string;
  type: string;
  time: number;
}

export interface IReview {
  review_id: string;
  content: string;
  title: string;
  createdAt: string;
  rating: number;
  course_id: string;
  full_name: string;
  username: string;
  avatar: string;
}

export interface addReview {
  course_id: string;
  content: string;
  author_id: string;
  rating: number;
  title: string;
}
