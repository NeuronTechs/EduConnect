import React from "react";
import ListCourse from "../components/Home/ListCourse";
import ListTeacher from "../components/Home/ListTeacher";
import ListCategory from "../components/Home/ListCategory";
import { useSearchParams } from "react-router-dom";
import { dataCategoryT, dataCourseT, dataTeacherT } from "@/types/constans";

const Search = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  React.useEffect(() => {
    console.log(searchParams.get("query"));
  }, [searchParams]);
  return (
    <div className="flex flex-col space-y-5 py-2 px-4">
      <div className="w-full bg-white shadow-sm flex items-center px-4 py-4">
        <h5 className="text-black text-xl font-semibold">Kết Quả Tìm Kiếm</h5>
      </div>
      <ListCourse isLoading={false} title="Chủ đề nổi bật" data={dataCourseT} />
      <ListTeacher
        isLoading={false}
        title="Chủ đề nổi bật"
        data={dataTeacherT}
      />
      <ListCategory
        isLoading={false}
        title="Chủ đề nổi bật"
        data={dataCategoryT}
      />
    </div>
  );
};

export default Search;
