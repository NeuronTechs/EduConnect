import CreateQuizProvider from "@/context/CreateQuizContext";
import CreateLessonQuiz from "./CreateLesson/CreateLessonQuiz";
import CreateLessonVideo from "./CreateLesson/CreateLessonVideo";
import CreateLessonDocument from "./CreateLesson/CreateLessonDocument";
import React from "react";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import LessonInformation from "./LessonInfomation";
import courseManageApi from "@/api/courseManageApi";

const CreateContentCourse = (props: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}): React.ReactElement => {
  const { selectLesson, dataDescription, setDataSection } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false);

  // api get data section of course
  React.useEffect(() => {
    const requestApi = async () => {
      if (dataDescription?.course_id) {
        setIsLoading(true);
        try {
          const res = await courseManageApi.getSectionCourse(
            dataDescription.course_id
          );
          if (res) {
            setDataSection(res);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    };
    requestApi();
  }, [dataDescription?.course_id, setDataSection]);

  return (
    <>
      <div className="w-[25%] h-full overflow-auto">
        <LessonInformation
          isOpenModal={props.isOpenModal}
          setIsOpenModal={props.setIsOpenModal}
        />
      </div>
      <div className="h-full overflow-auto bg-white p-2 flex-1">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : selectLesson?.type === "document" ? (
          <CreateLessonDocument />
        ) : selectLesson?.type === "video" ? (
          <CreateLessonVideo />
        ) : selectLesson?.type === "quiz" ? (
          <CreateQuizProvider>
            <CreateLessonQuiz />
          </CreateQuizProvider>
        ) : (
          <div className="w-full flex items-center justify-center"></div>
        )}
      </div>
    </>
  );
};

export default CreateContentCourse;
