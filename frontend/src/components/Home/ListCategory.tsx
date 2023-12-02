import React from "react";
import CategoryItem from "../CategoryItem";
import { ITopic } from "../../types/type";
import ListCategoryLoading from "../Loading/ListCategoryLoading";
interface props {
  data: ITopic[];
  title: string;
  isLoading: boolean;
}
const ListCategory = (props: props): React.ReactElement => {
  return (
    <div className="flex flex-col gap-2 px-2 w-full space-y-4">
      <div className="w-full flex items-center justify-between px-1">
        <h5 className="text-xl font-bold">{props.title}</h5>
        {/* <Link to={"/category-filter"}>
          <p className="text-sm font-light text-blue-600">Xem thêm {">>"}</p>
        </Link> */}
      </div>
      <div className="grid gap-4 grid-cols-4 w-full px-3">
        {props.isLoading ? (
          <ListCategoryLoading className="col-span-4" />
        ) : (
          <>
            {props.data.length === 0 && (
              <div className="flex items-center justify-center w-full py-15 col-span-4">
                <p className="text-center text-base font-semibold">
                  Không có danh mục nào
                </p>
              </div>
            )}
            {props.data.map((category) => {
              return <CategoryItem data={category} key={category.topic_id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ListCategory;
