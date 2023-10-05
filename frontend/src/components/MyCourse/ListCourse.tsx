import { ICourse } from "@/types/type";
import React from "react";
import ListCourseLoading from "../Loading/ListCourseLoading";
import Card from "./Card";
interface props {
  data: string;
  title: string;
  isLoading: boolean;
}
const ListCourse = (props: props): React.ReactElement => {
  return (
    <>
      {props.isLoading ? (
        <ListCourseLoading numberShow={3}></ListCourseLoading>
      ) : (
        <div className="grid grid-cols-4 ">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      )}
      {/* {props.isLoading?(<Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>):<ListCourseLoading numberShow={5} />} */}
    </>
  );
};

export default ListCourse;
