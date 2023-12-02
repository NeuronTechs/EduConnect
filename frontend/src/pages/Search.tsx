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
  React.useEffect(() => {
    if (searchParams.get("query") === null) return;
    // call api
    const keyword = searchParams.get("query");
    console.log(keyword);
    const callApi = async () => {
      setIsLoading(true);
      try {
        const data = await searchService.search(keyword ? keyword : "", 10);
        setData(data);
      } catch (error) {
        Promise.reject(error);
      }
    };
    callApi();
    setIsLoading(false);
  }, [searchParams]);
  return (
    <div className="flex flex-col space-y-5 py-2 px-4">
      <div className="w-full bg-white shadow-sm flex items-center px-4 py-4">
        <h5 className="text-black text-xl font-semibold">Kết Quả Tìm Kiếm</h5>
      </div>
      <ListCourse
        isLoading={isLoading}
        title="khoá học nổi bật"
        data={data?.courses ? data.courses : []}
      />
      <ListTeacher
        isLoading={isLoading}
        title="giáo viên nổi bật"
        data={data?.teachers ? data.teachers : []}
      />
      <ListCategory
        isLoading={isLoading}
        title="chủ đề nổi bật"
        data={data?.topics ? data.topics : []}
      />
    </div>
  );
};

export default Search;
