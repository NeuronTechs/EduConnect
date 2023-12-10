import React from "react";
import Banner from "../components/Home/Banner";
import ListCategory from "../components/Home/ListCategory";
import ListCourse from "../components/Home/ListCourse";
import { Link, useLocation } from "react-router-dom";
import * as topicApi from "@/api/topicApi/topicApi";
import * as teacherApi from "@/api/teacherApi/teacherApi";
import { ICourseDetail, ITeacher, ITopic } from "@/types/type";
import ListTeacher from "@/components/Home/ListTeacher";
import { configRouter } from "@/configs/router";

const TabHome = (): React.ReactElement => {
  const location = useLocation();
  const tabData = [
    {
      title: "Trang Chủ",
      patch: "/",
    },
    {
      title: "Thể Loại",
      patch: configRouter.categoryCourse,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-start gap-5 w-full shadow-sm bg-white  px-2 rounded-sm">
        {tabData.map((item, index): React.ReactElement => {
          return (
            <Link to={item.patch} key={index}>
              <div
                className={` relative text-blue-500 flex text-center justify-center text-sm font-semibold py-4 px-4 ${
                  location.pathname === item.patch &&
                  "after:content-[''] after:absolute after:bottom-0 after:h-[5px] after:w-12 after:rounded-xl after:bg-blue-500"
                }`}
              >
                {item.title}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export { TabHome };

const Home = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataCourse, setDataCourse] = React.useState<ICourseDetail[]>([]);
  const [dataCategory, setDataCategory] = React.useState<ITopic[]>([]);
  const [dataTeacher, setDataTeacher] = React.useState<ITeacher[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const promises = [
          topicApi.getRecommendCourse({ limit: "5" }),
          topicApi.getTopicCategory({ limit: "8" }),
          teacherApi.teacherRecommendationsApi({ limit: "5" }),
        ];
        const [courses, categories, teachers] = await Promise.all(promises);
        setDataCourse(courses);
        setDataCategory(categories as ITopic[]);
        setDataTeacher(teachers as ITeacher[]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full  gap-5">
      {/* <TabHome /> */}
      <Banner isLoading={isLoading} />
      <ListCourse
        isLoading={isLoading}
        data={dataCourse}
        title={"Khoá Học Nổi Bật"}
      />
      <ListCategory
        isLoading={isLoading}
        data={dataCategory}
        title={"Thể Loại"}
      />
      <ListTeacher
        isLoading={isLoading}
        data={dataTeacher}
        title={"Giáo Viên Nổi Bật"}
      />
    </div>
  );
};

export default Home;
