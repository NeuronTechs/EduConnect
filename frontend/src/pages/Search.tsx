import React from "react";
import ListCourse from "../components/Home/ListCourse";
import { dataCategory, dataCourse, dataTeacher } from "../types/constans";
import ListTeacher from "../components/Home/ListTeacher";
import ListCategory from "../components/Home/ListCategory";

const Search = (): React.ReactElement => {
  return (
    <div className="flex flex-col space-y-5 py-2 px-4">
      <div className="w-full bg-white shadow-sm flex items-center px-4 py-4">
        <h5 className="text-black text-xl font-semibold">Kết Quả Tìm Kiếm</h5>
      </div>
      <ListCourse isLoading={false} title="Chủ đề nổi bật" data={dataCourse} />
      <ListTeacher
        isLoading={false}
        title="Chủ đề nổi bật"
        data={dataTeacher}
      />
      <ListCategory
        isLoading={false}
        title="Chủ đề nổi bật"
        data={dataCategory}
      />
    </div>
  );
};

export default Search;
