import { ICourse } from "@/types/type";
import React from "react";
import ListCourseLoading from "../Loading/ListCourseLoading";
import Card from "./Card";
interface props {
  data: ICourse[];
  isLoading: boolean;
}
const ListCourse = (props: props): React.ReactElement => {
  console.log(props.data);

  return (
    <>
      {props.isLoading ? (
        <ListCourseLoading numberShow={3}></ListCourseLoading>
      ) : (
        <div className="grid grid-cols-3 ">
          {props?.data?.map((data) => {
            return <Card data={data} />;
          })}
        </div>
      )}
    </>
  );
};

export default ListCourse;
