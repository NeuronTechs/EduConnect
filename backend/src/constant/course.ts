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
