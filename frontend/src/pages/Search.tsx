/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ListCourse from "../components/Home/ListCourse";
import ListTeacher from "../components/Home/ListTeacher";
import ListCategory from "../components/Home/ListCategory";
import { useSearchParams } from "react-router-dom";
import { searchService } from "@/api";
import { ICourseDetail, ITeacher, ITopic } from "@/types/type";
interface IResultSearch {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses: ICourseDetail[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  teachers: ITeacher[];
  topics: ITopic[];
}
const Search = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const [data, setData] = React.useState<IResultSearch>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const keyword = searchParams.get("query");
  React.useEffect(() => {
    if (searchParams.get("query") === null) return;
    // call api
    const callApi = async () => {
      setIsLoading(true);
      try {
        const data = await searchService.search(keyword ? keyword : "", 10);
        setData(data);
      } catch (error) {
        Promise.reject(error);
      }
      setIsLoading(false);
    };
    callApi();
  }, [keyword, searchParams]);
  return (
    <div className="flex flex-col space-y-5 py-2 px-4">
      <div className="w-full bg-white shadow-sm flex items-center px-4 py-4">
        <h5 className="text-black text-xl font-semibold">
          Kết Quả Tìm Kiếm Theo Từ Khoá {keyword ? `: ${keyword}` : ""}
        </h5>
      </div>
      <ListCourse
        isLoading={isLoading}
        title="Khoá Học"
        data={data?.courses ? data.courses : []}
      />
      <ListTeacher
        isLoading={isLoading}
        title="Giáo Viên"
        data={data?.teachers ? data.teachers : []}
      />
      <ListCategory
        isLoading={isLoading}
        title="Chủ Đề"
        data={data?.topics ? data.topics : []}
      />
    </div>
  );
};

export default Search;
