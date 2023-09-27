import Banner from "../components/Home/Banner";
import ListCategory from "../components/Home/ListCategory";
import ListCourse from "../components/Home/ListCourse";
import ListTeacher from "../components/Home/ListTeacher";

const Home = () => {
  return (
    <div className="flex flex-col w-full px-2 py-2 gap-5">
      <div className="flex items-center justify-start gap-5 w-full shadow-sm bg-white py-2 px-2 rounded-sm">
        <div className="text-blue-500 text-sm font-semibold p-2">Trang Chủ</div>
        <div className="text-blue-500 text-sm font-semibold p-2">Thể Loại</div>
      </div>
      <Banner />
      <ListCourse />
      <ListCategory />
      <ListTeacher />
    </div>
  );
};

export default Home;
