import CreateCourseContainer from "@/components/CreateCourse/CreateCourseContainer";
// import CreateCourseTitle from "@/components/CreateCourse/CreateCourseTitle";
import React from "react";

const CreateCourseTeacher = (): React.ReactElement => {
  // const [activeCreate, setActiveCreate] = React.useState<number>(0);
  return (
    <div className=" w-full h-full space-y-4">
      {/* <CreateCourseTitle /> */}
      <CreateCourseContainer />
    </div>
  );
};

export default CreateCourseTeacher;
