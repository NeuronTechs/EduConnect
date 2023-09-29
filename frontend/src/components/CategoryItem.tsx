import React from "react";
import { typeCategory } from "../types/type";
interface props {
  data: typeCategory;
}
const CategoryItem = (props: props): React.ReactElement => {
  return (
    <div className="bg-white rounded-md shadow-sm p-3 flex gap-2 justify-between items-center">
      <div className="flex flex-col space-y-2 justify-start p-2.5">
        <h5 className="text-base font-medium">{props.data.title}</h5>
        <p className="text-xs font-light text-gray-600">
          {`${props.data.numberCourse} khoá học`}
        </p>
      </div>
      <div>
        <img
          src={props.data.images}
          alt={props.data.title}
          className="h-[40px] w-[40px]"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
