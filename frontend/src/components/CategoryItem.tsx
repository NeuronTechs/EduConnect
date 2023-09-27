import React from "react";
import assets from "../assets";

const CategoryItem = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-3 flex gap-2 justify-between items-center">
      <div className="flex flex-col space-y-2 justify-start p-2.5">
        <h5 className="text-base font-medium">Ui/UX thiết kế</h5>
        <p className="text-xs font-light text-gray-600">10 khoá học</p>
      </div>
      <div>
        <img
          src={assets.images.categoryItem}
          alt=""
          className="h-[40px] w-[40px]"
        />
      </div>
    </div>
  );
};

export default CategoryItem;
