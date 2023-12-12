import { Avatar } from "@material-tailwind/react";
import { PlayCircle, User } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import * as courseApi from "../../../api/courseApi/courseApi";
import { formatBirthDay } from "@/utils/const";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import assets from "@/assets";

const Instructor = () => {
  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const [teacher, setTeacher] = useState<any>(null);
  useEffect(() => {
    const getTeacherOverviewCourse = async () => {
      const data = await courseApi.getTeacherInOverviewCourse(
        currentCourse?.teacher_id as string
      );
      setTeacher(data?.data);
    };
    getTeacherOverviewCourse();
  }, []);
  return (
    <div className="w-full h-full lg:p-[10px] p-[5px]">
      <div className="flex items-center justify-start py-[6px]">
        <Avatar
          loading="lazy"
          className="w-[80px] h-[80px]"
          src={
            teacher?.avatar !== "null"
              ? teacher?.avatar
              : assets?.images?.noAvatar
          }
          alt="avatar"
        />
        <div className="lg:p-[10px] p-[5px]">
          <p className="font-semibold">{teacher?.full_name}</p>
          <p className="font-semibold">{teacher?.major}</p>
          <div className="flex items-center">
            <p className="flex items-center justify-start mr-5">
              <PlayCircle size={20} className="mr-1" />
              {teacher?.total_courses} khóa học
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <User size={20} className="mr-1" />
              {teacher?.total_students} học sinh
            </p>
          </div>
        </div>
      </div>
      <div className="p-[10px] lg:p-0 lg:my-3">
        Xin chào tất cả mọi người,{" "}
        <span className="font-semibold">{teacher?.full_name}</span> hiện đang là
        giáo viên tại {teacher?.school}, sinh năm{" "}
        {formatBirthDay(teacher?.birthday)}, chuyên ngành hiện tại là{" "}
        <span className="italic">{teacher?.major}. </span> Hiện tại mình đang
        sinh sống tại {teacher?.address}. <br></br>
        Các khóa học của mình phù hợp với tất vả mọi sinh viên, người đi làm
        trong lĩnh vực công nghệ thông tin.<br></br>
        {teacher?.description}
      </div>
    </div>
  );
};

export default Instructor;
