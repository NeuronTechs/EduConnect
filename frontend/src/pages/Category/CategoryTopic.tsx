import Course from "@/components/Course";
import ListCourseLoading from "@/components/Loading/ListCourseLoading";
import { ICourseDetail, ITopic } from "@/types/type";
import React from "react";
import * as topicApi from "@/api/topicApi/topicApi";
import { useParams } from "react-router-dom";
import ListCategory from "@/components/Home/ListCategory";
const CategoryTopic = (): React.ReactElement => {
  const [data, setData] = React.useState<ICourseDetail[]>([]);
  const [topicData, setTopicData] = React.useState<ITopic[]>([]);
  const [loading, setLoading] = React.useState(false);
  const param = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const promises = [
          topicApi.getAllTopic(),
          topicApi.getTopicByCourseId(param.id ? param.id : ""),
        ];
        const [topics, courses] = await Promise.all(promises);
        setTopicData(topics);
        setData(courses);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [param.id]);
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <ListCategory
          data={topicData}
          isLoading={loading}
          title="Tất cả các chủ đề khoá học"
        />
      </div>
      <div className="w-full h-[100px] rounded-md  backdrop-blur-0 flex items-center justify-start px-4">
        <h1 className="text-xl font-bold uppercase">
          Khóa học theo danh mục{" "}
          {topicData
            .find((value) => value.topic_id === param.id)
            ?.title.toString()}
        </h1>
      </div>
      {loading ? (
        <ListCourseLoading numberShow={5} />
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-base font-semibold">Không có khóa học nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 w-full">
          {data.map((item) => {
            return <Course data={item} key={item.course_id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryTopic;
