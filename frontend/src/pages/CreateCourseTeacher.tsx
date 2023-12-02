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
import * as teacherApi from "@/api/teacherApi/teacherApi";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

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
          const res = await teacherApi.getCourseTeacherById({
            teacherId: currentUser.user_id,
            courseId: param.id ? param.id : "",
          });
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
        {/* <ToastContainer /> */}
      </div>
    </LayoutCreateCourse>
  );
};

export default CreateCourseTeacher;

const LayoutCreateCourse = (props: {
  children: React.ReactElement;
}): React.ReactElement => {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* header */}
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
          <MenuStatus />
          <button
            type="button"
            className="py-1.5 px-4 text-sm font-medium text-white focus:outline-none bg-gray-300/50 rounded-lg   hover:bg-blue-700 hover:text-white "
          >
            xem khoá học xem khoá học
          </button>
        </div>
      </div>
      {/* content */}
      <div className="w-full h-[calc(100vh-60px)]">{props.children}</div>
    </div>
  );
};

const MenuStatus = (): React.ReactElement => {
  const [status, setStatus] = React.useState<number>(0);
  const { dataDescription } = React.useContext(CreateCourseContext);
  const handClick = (data: number) => {
    const requestApi = async () => {
      try {
        if (dataDescription === undefined) {
          return;
        }

        const res = await teacherApi.updateCourseTeacher({
          ...dataDescription,
          status_show: data,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    requestApi();
    setStatus(data);
  };
  return (
    <div className="flex items-center justify-center h-full px-5 gap-4">
      <Menu>
        <MenuHandler>
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
          >
            {status === 1 ? "Chế độ công khai" : "Chế độ riêng tư"}
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => handClick(1)}>Chế độ công khai</MenuItem>
          <MenuItem onClick={() => handClick(0)}>Chế độ riêng tư</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
