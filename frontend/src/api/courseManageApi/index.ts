import * as httpRequest from "@/utils/httpRequest";

const getSectionCourse = async (idCourse: string) => {
  try {
    console.log(idCourse);
    const res = await httpRequest.get(`/courses/${idCourse}/sections`);
    return res?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default { getSectionCourse };
