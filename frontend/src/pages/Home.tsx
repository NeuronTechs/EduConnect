import React from "react";
import Banner from "../components/Home/Banner";
import ListCategory from "../components/Home/ListCategory";
import ListCourse from "../components/Home/ListCourse";
import ListTeacher from "../components/Home/ListTeacher";
import { Link, useLocation } from "react-router-dom";
import { dataCategory, dataCourse, dataTeacher } from "../types/constans";
const TabHome = (): React.ReactElement => {
  const location = useLocation();
  const tabData = [
    {
      title: "Trang Chủ",
      patch: "/",
    },
    {
      title: "Thể Loại",
      patch: "/category-filter",
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
  return (
    <div className="flex flex-col w-full  gap-5">
      <TabHome />
      <Banner isLoading={true} />
      <ListCourse
        isLoading={true}
        data={dataCourse}
        title={"Khoá Học Nỗi Bật"}
      />
      <ListCategory isLoading={true} data={dataCategory} title={"Thể Loại"} />
      <ListTeacher
        isLoading={true}
        data={dataTeacher}
        title={"Giáo Viên Nỗi Bật"}
      />
    </div>
  );
};

export default Home;
