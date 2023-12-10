import { Avatar, Rating } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Overview from "./Tabs/Overview";
import Reviews from "./Tabs/Reviews";
import Instructor from "./Tabs/Instructor";
import { formatCurrency } from "../../utils/const";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import DetailCourseLoading from "./Loading/DetailCourseLoading";
import assets from "@/assets";

const dataTab = [
  {
    label: "Tổng quan",
    value: "Tổng quan",
    desc: <Overview />,
  },
  {
    label: "Đánh giá",
    value: "Đánh giá",
    desc: <Reviews />,
  },
  {
    label: "Giáo viên",
    value: "Giáo viên",
    desc: <Instructor />,
  },
];

const DetailCourse = () => {
  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const loading = useSelector(
    (state: SliceState) => state.courseOverviewSlice.loading
  );
  return (
    <div
      className={`${
        loading && "animate-pulse"
      } w-full lg:w-[70%] lg:p-[10px] h-auto bg-white`}
    >
      {loading ? (
        <DetailCourseLoading />
      ) : (
        <>
          {/* image */}
          {currentCourse?.image === "" ? (
            <div className="my-3 bg-gray-400 w-full h-[200px] rounded-lg"></div>
          ) : (
            <div className={`my-3 w-full lg:h-[200px] p-[0_10px]`}>
              {loading ? (
                <div className="my-3 bg-gray-300 w-full h-[200px] rounded-lg"></div>
              ) : (
                <img
                  loading="lazy"
                  className="h-full w-full rounded-lg object-cover object-center"
                  src={currentCourse?.image}
                  alt="image course"
                />
              )}
            </div>
          )}
          {/* Infor course */}
          <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:justify-between p-[10px] h-[50px]">
            <div className="flex">
              <Avatar
                src={
                  currentCourse?.avatar !== "null"
                    ? currentCourse?.avatar
                    : assets?.images?.noAvatar
                }
                alt="avatar"
                loading="lazy"
              />
              <div className="mx-3">
                <p className="font-semibold">{currentCourse?.fullName}</p>
                <p>{currentCourse?.educational_level}</p>
              </div>
              {/* <div className="flex items-center">
                <Rating
                  value={3}
                  readonly
                  unratedColor="amber"
                  ratedColor="amber"
                />
                <p className="hidden lg:block text-[14px] ml-1 italic font-normal">
                  {1200} đánh giá
                </p>
              </div> */}
            </div>
            <div className="hidden lg:block text-blue-300">
              {currentCourse?.discount ? (
                <>
                  <p className="line-through">
                    {currentCourse?.price !== null
                      ? formatCurrency(currentCourse?.price)
                      : "Chưa xác định"}
                  </p>
                  <p className="font-semibold text-blue-500">
                    {currentCourse?.discount !== null
                      ? formatCurrency(currentCourse?.discount)
                      : "Chưa xác định"}
                  </p>
                </>
              ) : (
                <p>{currentCourse?.price}VND</p>
              )}
            </div>
          </div>
          {/* Overview */}
          <div className="p-[10px]">
            <h1 className="font-semibold text-[20px] lg:text-[24px] my-3">
              {currentCourse?.title}
            </h1>
          </div>
          <div>
            <Tabs value="Tổng quan" className="w-full">
              <TabsHeader
                className="bg-gray-200 p-[8px_20px] rounded"
                indicatorProps={{
                  className: "bg-blue-400 rounded-md !text-white",
                }}
              >
                {dataTab.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    className="w-[100px] rounded-md mx-1 bg-white text-gray-700 "
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {dataTab.map(({ value, desc }) => (
                  <TabPanel key={value} value={value} className="p-0">
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailCourse;
