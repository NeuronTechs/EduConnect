import { Rating } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Overview from "../Tabs/Overview";
import Reviews from "../Tabs/Reviews";
import Instructor from "../Tabs/Instructor";

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

const DetailCourseLoading = () => {
  return (
    <div className="animate-pulse">
      <div className="my-3 bg-gray-300 w-full h-[200px] rounded-lg"></div>
      {/* Infor course */}
      <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:justify-between p-[10px] h-[50px]">
        <div className="flex">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="mx-3 h-10 w-10">
            <div className="font-semibold h-10 w-10"></div>
            <div className="h-10 w-10"></div>
          </div>
          <div className="flex items-center">
            <Rating
              value={3}
              readonly
              unratedColor="amber"
              ratedColor="amber"
            />
            <div className="hidden lg:block text-[14px] ml-1 italic font-normal">
              {/* {1200} đánh giá */}
            </div>
          </div>
        </div>
        <div className="hidden lg:block text-blue-300">
          <p className="font-semibold text-blue-500"></p>
          <p></p>
        </div>
      </div>
      {/* Overview */}
      <div className="p-[10px]">
        <h1 className="font-semibold text-[20px] lg:text-[24px] my-3"></h1>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default DetailCourseLoading;
