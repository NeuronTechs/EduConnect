import CourseTeacher from "@/components/CourseTeacher";
import { configRouter } from "@/configs/router";
import { ICourseDetail } from "@/types/type";
import { Plus } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as teacherApi from "@/api/teacherApi/teacherApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import ListCourseLoading from "@/components/Loading/ListCourseLoading";

const CourseMyTeacher = (): React.ReactElement => {
  const [dataCourse, setDataCourse] = React.useState<ICourseDetail[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const useCurrentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );
  useEffect(() => {
    setIsLoading(true);
    const requestApi = async () => {
      try {
        const res = await teacherApi.getCourseTeacherApi({
          teacherId: useCurrentUser.user_id,
          limit: 10,
        });
        setDataCourse(res.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    requestApi();
  }, []);
  return (
    <div className="w-full p-2 space-y-2">
      <div className="w-full px-3 py-2 flex items-center justify-between bg-white rounded-md">
        <div className="flex items-center justify-start">
          <div className="text-xl font-bold">Khoá học</div>
        </div>
        <div className="flex items-center ">
          <Link to={configRouter.createCourse}>
            <div className="flex items-center gap-4 justify-center px-3 py-2 bg-blue-400 rounded-md hover:bg-blue-500 cursor-pointer">
              <Plus size={20} className="text-white" />
              <p className="text-sm font-bold text-white">Tạo Khoá Học Mới</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 w-full">
        {isLoading ? (
          <div className="col-span-5 flex items-center justify-center py-5 w-full">
            <ListCourseLoading numberShow={5} />
          </div>
        ) : (
          <>
            {dataCourse.length === 0 && (
              <div className="col-span-5 flex items-center justify-center py-5">
                <div className="text-xl font-bold">
                  Bạn chưa có khoá học nào
                </div>
              </div>
            )}
            {dataCourse.map((item) => {
              return <CourseTeacher data={item} key={item.course_id} />;
            })}
          </>
        )}

        {/* <CourseTeacher data={dataCourseT[0]} /> */}
      </div>
    </div>
  );
};

export default CourseMyTeacher;
