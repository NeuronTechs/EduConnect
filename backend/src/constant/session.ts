import { ILecture } from "./lecture";

export interface ISession {
  session_id: string;
  course_id?: string;
  name: string;
  lectures: ILecture[] | null;
}
