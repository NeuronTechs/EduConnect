import React from "react";
import CategoryItem from "../CategoryItem";

const ListCategory = () => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">Chủ đề nổi bật</h5>
        <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
      </div>
      <div className="grid gap-4 grid-cols-4 w-full px-3">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </div>
  );
};

export default ListCategory;
