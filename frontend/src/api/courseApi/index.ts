import * as httpRequest from "@/utils/httpRequest";

interface ICourse {
  title: string;
  // description: string;
  level: string;
  topic_id: string;
  teacher_id: string;
  status: number;
}
const createCourse = async (course: ICourse) => {
  try {
    const response = await httpRequest.post("/teachers/courses", course);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default { createCourse };
