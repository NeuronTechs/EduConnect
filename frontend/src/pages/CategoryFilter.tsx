import { CaretDown, Funnel, List, SquaresFour } from "@phosphor-icons/react";
import Course from "../components/Course";
import React from "react";
import { TabHome } from "./Home";
import { dataCourseT } from "../types/constans";

const ViewButton = (): React.ReactElement => {
  return (
    <div className="flex items-center overflow-hidden rounded-md">
      <div className="p-2 bg-white text-black shadow-sm">
        <List size={25} />
      </div>
      <div className="p-2 bg-blue-500 text-white shadow-sm">
        <SquaresFour size={25} />
      </div>
    </div>
  );
};
const ControlFilterCategory = (): React.ReactElement => {
  return (
    <div className="py-2 w-full flex justify-end space-x-2">
      <div className="p-2 bg-white text-black shadow-sm rounded-md">
        <Funnel size={25} />
      </div>
      <div className="px-3 py-2 bg-white text-black shadow-sm flex items-center gap-2 rounded-md">
        <p className="text-sm text-gray-500 font-light">lọc theo: </p>
        <div className="text-sm font-medium">
          <div className="rounded-full px-2 py-1  "></div>
        </div>
        <CaretDown size={25} />
      </div>
      <ViewButton />
    </div>
  );
};

const CategoryFilter = () => {
  return (
    <div className="w-full space-y-4">
      <TabHome />
      <ControlFilterCategory />
      <div className="grid grid-cols-5 gap-4 w-full">
        {dataCourseT.map(
          (item): React.ReactElement => (
            <Course data={item} key={item.course_id} />
          )
        )}
        {/* <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course />
        <Course /> */}
      </div>
    </div>
  );
};

export default CategoryFilter;
