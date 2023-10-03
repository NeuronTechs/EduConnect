import React from "react";
import TeacherItem from "../TeacherItem";
import { ITeacher } from "../../types/type";
import ListTeacherLoading from "../Loading/ListTeacherLoading";
interface props {
  data: ITeacher[];
  title: string;
  isLoading: boolean;
}
const ListTeacher = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full overflow-hidden">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">{props.title}</h5>
        <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
      </div>
      <div className="flex justify-between px-3 py-1">
        {props.isLoading ? (
          <>
            <ListTeacherLoading />
          </>
        ) : (
          <>
            {props.data.map((teacher) => {
              return <TeacherItem data={teacher} key={teacher.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ListTeacher;
