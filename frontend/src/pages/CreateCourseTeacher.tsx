import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLineLeft } from "@phosphor-icons/react";
// components
import CreateCourseContainer from "@/components/CreateCourse/CreateCourseContainer";
// type
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { configRouter } from "@/configs/router";
import { CreateCourseContext } from "@/context/CreateCourseContext";
// api
import * as teacehrApi from "@/api/teacherApi/teacherApi";

const CreateCourseTeacher = (): React.ReactElement => {
  // const [activeCreate, setActiveCreate] = React.useState<number>(0);
  const { dataDescription, handleSetDataDescription } =
    React.useContext(CreateCourseContext);

  const currentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );
  const param = useParams<{ id: string }>();
  React.useEffect(() => {
    if (dataDescription === undefined) {
      const requestApi = async () => {
        try {
          const res = await teacehrApi.getCourseTeacherById({
            teacherId: currentUser.user_id,
            courseId: param.id ? param.id : "",
          });
          console.log(res.data);
          handleSetDataDescription(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      requestApi();
    }
  }, [
    currentUser.user_id,
    dataDescription,
    handleSetDataDescription,
    param.id,
  ]);

  return (
    // <CreateCourseProvider>
    <LayoutCreateCourse>
      <div className=" w-full h-full space-y-4">
        {/* <CreateCourseTitle /> */}
        <CreateCourseContainer />
      </div>
    </LayoutCreateCourse>
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
      <div className="w-full h-auto">{props.children}</div>
    </div>
  );
};
