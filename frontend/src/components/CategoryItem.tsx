import React from "react";
import { ITopic } from "../types/type";
import { Link } from "react-router-dom";
import { configRouter } from "@/configs/router";
interface props {
  data: ITopic;
}
const CategoryItem = (props: props): React.ReactElement => {
  return (
    <Link to={configRouter.categoryTopic.slice(0, -3) + props.data.topic_id}>
      <div className="bg-white rounded-md shadow-sm px-3 flex gap-2 justify-between items-center min-h-[100px]">
        <div className="flex flex-col space-y-2 justify-start p-2.5">
          <h5 className="text-base font-medium">{props.data.title}</h5>
          <p className="text-xs font-light text-gray-600">
            {`${props.data.course_count} khoá học`}
          </p>
        </div>
        <div>
          {props.data.images !== undefined && (
            <div className="h-[40px] w-[40px] bg-gray-300 rounded-full">
              <img
                src={props.data.images}
                alt={props.data.title}
                className="h-[40px] w-[40px]"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
