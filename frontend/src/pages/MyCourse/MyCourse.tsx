import React, { useEffect } from "react";
import assets from "../../assets";
import Calendar from "../../components/MyCourse/Calendar";
import Task from "../../components/MyCourse/Task";
import ListCourse from "@/components/MyCourse/ListCourse";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ICourse, SliceState } from "@/types/type";
import { getCourseByStudentId } from "@/features/course/courseSlice";
import { getCourseLastRecentByStudentId } from "@/api/courseApi/courseApi";

const MyCourse = (): React.ReactElement => {
  const [courseLastRecent, setCourseLastRecent] = React.useState<ICourse[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: SliceState) => state.authSlice);
  const dataCourse: ICourse[] | null = useSelector(
    (state: SliceState) => state.courseSlice.courses
  );
  console.log(dataCourse);
  const getData = async () => {
    if (currentUser) {
      const res = await getCourseLastRecentByStudentId(currentUser?.user_id);
      if (res.length > 0) {
        setCourseLastRecent(res);
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getCourseByStudentId(currentUser?.user_id));
      getData();
    }
  }, []);

  return (
    <div className="flex flex-col w-full px-2 py-2 gap-5">
      <div className="flex">
        <div className="flex flex-col w-full  xl:w-[80%] gap-10 font-bold">
          <img
            src={assets.images.backgroundLogin}
            alt=""
            className="w-[99%] h-[200px] object-fill "
          />
          <div>
            <strong> Các khóa học gần đây</strong>
            {dataCourse !== null && (
              <ListCourse isLoading={false} data={courseLastRecent} />
            )}
          </div>
          <div>
            <div className="mb-5">
              <strong> Các khóa học của bạn</strong>
              {dataCourse !== null && (
                <ListCourse isLoading={false} data={dataCourse} />
              )}
            </div>
          </div>
        </div>
        <div className="w-[20%] hidden xl:block ">
          <Calendar />
          <Task />
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
