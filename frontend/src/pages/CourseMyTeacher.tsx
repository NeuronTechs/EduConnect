import CourseTeacher from "@/components/CourseTeacher";
import { Plus } from "@phosphor-icons/react";
import React from "react";

const CourseMyTeacher = (): React.ReactElement => {
  return (
    <div className="w-full p-2 space-y-2">
      <div className="w-full px-3 py-2 flex items-center justify-between bg-white rounded-md">
        <div className="flex items-center justify-start">
          <div className="text-xl font-bold">Khoá học</div>
        </div>
        <div className="flex items-center ">
          <div className="flex items-center gap-4 justify-center px-3 py-2 bg-blue-400 rounded-md hover:bg-blue-500 cursor-pointer">
            <Plus size={20} className="text-white" />
            <p className="text-sm font-bold text-white">Tạo Khoá Học Mới</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <CourseTeacher
          data={{
            id: "fgsjadasdjasdsa",
            thumbnail:
              "https://images.pexels.com/photos/3806753/pexels-photo-3806753.jpeg?auto=compress&cs=tinysrgb&w=1600",
            title: "HTML leaning",
            teacher: "Jionson whet",
            avatarTeacher:
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=740&t=st=1695713066~exp=1695713666~hmac=f87d62b1534e3e2205803c7aa2b17765e6e6c2091e6fbc023c6630a185b13050",
            rating: 4,
            priceOfficial: "150.000",
            originalPrice: "200.000",
            numberLesson: 15,
            numberStudent: 15,
            numberSecurity: 15,
            status: "công khai",
          }}
        />
      </div>
    </div>
  );
};

export default CourseMyTeacher;
