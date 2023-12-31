import React from "react";
import TeacherItem from "../TeacherItem";
import { ITeacher } from "../../types/type";
import ListTeacherLoading from "../Loading/ListTeacherLoading";
import { Link } from "react-router-dom";
interface props {
  data: ITeacher[];
  title: string;
  isLoading: boolean;
  showMore?: boolean;
}
const ListTeacher = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full overflow-hidden">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-lg font-bold uppercase">{props.title}</h5>
        {props.showMore ? (
          <Link to={""}>
            <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-between px-3 py-1 w-full">
        {props.isLoading ? (
          <>
            <ListTeacherLoading numberShow={6} />
          </>
        ) : (
          <div className="grid grid-cols-4 gap-3 w-full">
            {props.data.length === 0 && (
              <div className="flex items-center justify-center w-full py-15 col-span-6">
                <p className="text-center text-lg font-semibold">
                  Không có giáo viên nào
                </p>
              </div>
            )}
            {props.data.map((teacher) => {
              return <TeacherItem data={teacher} key={teacher.teacher_id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTeacher;
