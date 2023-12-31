import React from "react";
import Course from "../Course";
import { ICourseDetail } from "../../types/type";
import ListCourseLoading from "../Loading/ListCourseLoading";
import { Link } from "react-router-dom";
import { configRouter } from "@/configs/router";
interface props {
  data: ICourseDetail[];
  title: string;
  isLoading: boolean;
  showMore?: boolean;
}
const ListCourse = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full overflow-hidden">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-lg font-bold uppercase">{props.title}</h5>
        {props.showMore && (
          <Link to={configRouter.categoryCourse}>
            <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
          </Link>
        )}
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
