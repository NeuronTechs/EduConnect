import React from "react";
import CategoryItem from "../CategoryItem";
import { typeCategory } from "../../types/type";
import ListCategoryLoading from "../Loading/ListCategoryLoading";
interface props {
  data: typeCategory[];
  title: string;
  isLoading: boolean;
}
const ListCategory = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">{props.title}</h5>
        <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
      </div>
      <div className="grid gap-4 grid-cols-4 w-full px-3">
        {props.isLoading ? (
          <ListCategoryLoading className="col-span-4" />
        ) : (
          <>
            {props.data.map((category) => {
              return <CategoryItem data={category} key={category.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ListCategory;
