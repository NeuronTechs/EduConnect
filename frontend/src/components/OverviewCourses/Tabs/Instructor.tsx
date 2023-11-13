import { Avatar } from "@material-tailwind/react";
import {
  ChatCenteredDots,
  PlayCircle,
  Star,
  User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import * as courseApi from "../../../api/courseApi/courseApi";
import { formatBirthDay } from "@/utils/const";

const Instructor = () => {
  const [teacher, setTeacher] = useState<any>(null);
  useEffect(() => {
    const getTeacherOverviewCourse = async () => {
      const data = await courseApi.getTeacherInOverviewCourse("05168");
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
          src={teacher?.avatar}
          alt="avatar"
        />
        <div className="lg:p-[10px] p-[5px]">
          <p className="font-semibold">{teacher?.full_name}</p>
          <p className="font-semibold">{teacher?.major}</p>
          <div className="flex items-center">
            <p className="flex items-center justify-center mr-5">
              <Star size={20} color="yellow" weight="fill" className="mr-1" />
              4.5 sao
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <ChatCenteredDots size={20} className="mr-1" />
              100 bình luận
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <User size={20} className="mr-1" />
              362 học sinh
            </p>
            <p className="flex items-center justify-start mr-5">
              <PlayCircle size={20} className="mr-1" />
              20 khóa học
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
        trong lĩnh vực công nghệ thông tin.
      </div>
    </div>
  );
};

export default Instructor;
