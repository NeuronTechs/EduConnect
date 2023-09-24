import React from "react";
import TeacherItem from "../TeacherItem";

const ListTeacher = () => {
  return (
    <div className="flex flex-col gap-2 px-2 ">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">Chủ đề nổi bật</h5>
        <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
      </div>
      <div className="flex justify-between px-3 py-1">
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </div>
    </div>
  );
};

export default ListTeacher;
