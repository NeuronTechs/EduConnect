import Course from "@/components/Course";
import ListCourseLoading from "@/components/Loading/ListCourseLoading";
import { ICourseDetail } from "@/types/type";
import React from "react";
import * as topicApi from "@/api/topicApi/topicApi";

const CategoryCourse = (): React.ReactElement => {
  const [data, setData] = React.useState<ICourseDetail[]>([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await topicApi.getRecommendCourse({ limit: "5" });

        setData(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="w-full h-[150px] rounded-md  backdrop-blur-0 flex items-center justify-start ml-4">
        <div className="header__title">
          <h1 className="text-2xl font-bold">Khóa học theo danh mục</h1>
        </div>
      </div>
      {loading ? (
        <ListCourseLoading numberShow={5} />
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-[200px]">
          <p>Không có khóa học nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {data.map((item) => {
            return <Course data={item} key={item.course_id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryCourse;
