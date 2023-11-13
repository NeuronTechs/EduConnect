import { ISession } from "./session";

export interface ICourse {
  course_id: string;
  title: string;
  description: string;
  teacher_id: string;
  price: number;
  discount: number;
  image: string;
  topic_id: string;
  total_hours: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseDetail {
  course_id: string;
  title: string;
  description: string;
  sessions: ISession[];
}

export interface ICourseOverview {
  course_id: string;
  title: string;
  image: string;
  description: string;
  requirement: Object;
  study: Object;
  price: Number;
  discount: Number;
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
  student_id: string,
  sessions: ISession[];
}
