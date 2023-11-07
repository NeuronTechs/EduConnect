// Type: Interface for comment
export interface IComment {
  comment_id: string;
  student_id: string;
  content: string;
  lecture_id: string;
  timestamp: string;
  resource: string | null;
  createdAt: number;
}
