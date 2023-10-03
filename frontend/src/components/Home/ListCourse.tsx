import React from "react";
import Course from "../Course";
import { ICourse } from "../../types/type";
import ListCourseLoading from "../Loading/ListCourseLoading";
interface props {
  data: ICourse[];
  title: string;
  isLoading: boolean;
}
const ListCourse = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full overflow-hidden">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">{props.title}</h5>
        <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
      </div>
      <div className="flex justify-between px-3 py-1 w-full">
        {props.isLoading ? (
          <ListCourseLoading numberShow={5} />
        ) : (
          <>
            {props.data.map((course) => {
              return <Course data={course} key={course.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ListCourse;
