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
      <div className="px-3 py-1 w-full">
        {props.isLoading ? (
          <ListCourseLoading numberShow={5} />
        ) : (
          <>
            {props.data.length === 0 && (
              <div className="flex items-center justify-center w-full py-15">
                <p className="text-center text-lg font-semibold">
                  Không có khóa học nào
                </p>
              </div>
            )}
            <div className="grid 2xl:grid-cols-5 md:grid-cols-4 grid-cols-2  gap-3 w-full">
              {props.data.map((course) => {
                return <Course data={course} key={course.course_id} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListCourse;
