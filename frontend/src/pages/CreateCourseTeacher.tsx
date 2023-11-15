import CreateCourseContainer from "@/components/CreateCourse/CreateCourseContainer";
import { configRouter } from "@/configs/router";
import CreateCourseProvider from "@/context/CreateCourseContext";
import { ArrowLineLeft } from "@phosphor-icons/react";

// import CreateCourseTitle from "@/components/CreateCourse/CreateCourseTitle";
import React from "react";
import { Link } from "react-router-dom";

const CreateCourseTeacher = (): React.ReactElement => {
  // const [activeCreate, setActiveCreate] = React.useState<number>(0);

  return (
    <CreateCourseProvider>
      <LayoutCreateCourse>
        <div className=" w-full h-full space-y-4">
          {/* <CreateCourseTitle /> */}
          <CreateCourseContainer />
        </div>
      </LayoutCreateCourse>
    </CreateCourseProvider>
  );
};

export default CreateCourseTeacher;

const LayoutCreateCourse = (props: {
  children: React.ReactElement;
}): React.ReactElement => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full h-[60px] bg-blue-gray-900 flex items-center justify-between sticky top-0">
        <div className="flex items-center">
          <Link to={configRouter.courseMyTeacher}>
            <div className="flex items-center border-r px-3 border-gray-400 h-full py-5 text-gray-300 hover:text-white cursor-pointer">
              <div className="">
                <ArrowLineLeft size={25} />
              </div>
              <div className="ml-2 text-sm font-thin">
                Quay lại trang khoá học
              </div>
            </div>
          </Link>
          <div className="text-base font-bold text-white px-5">
            Khoá học của tôi
          </div>
        </div>

        <div></div>
        <div className="flex items-center justify-center h-full px-5 gap-4">
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
          >
            Chế độ công khai
          </button>
          <button
            type="button"
            className="py-1.5 px-4 text-sm font-medium text-white focus:outline-none bg-gray-300/50 rounded-lg   hover:bg-blue-700 hover:text-white "
          >
            xem khoá học xem khoá học
          </button>
        </div>
      </div>
      <div className="w-full h-full bg-blue-200/30">{props.children}</div>
    </div>
  );
};
