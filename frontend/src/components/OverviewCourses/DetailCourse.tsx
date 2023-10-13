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

const data = {
  image:
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/a7c5400e51272c78b710ce9b56fd3178.png?auto=format%2Ccompress&dpr=1&w=562&h=221&q=40&fit=crop",
  teacher: "Nguyen Thu Huong",
  position: "Web developer",
  avatar:
    "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
  start: 3,
  numberReview: 1200,
  price: 400000,
  discount: 200000,
  courseName: "Reactjs cơ bản cho người mới bắt đầu",
};

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
  return (
    <div className="w-full lg:w-[70%] lg:p-[10px] h-auto bg-white">
      {/* image */}
      {data?.image === "" ? (
        <div className="my-3 bg-gray-400 w-full h-[200px] rounded-lg"></div>
      ) : (
        <div className="my-3 w-full lg:h-[200px] p-[0_10px]">
          <img
            loading="lazy"
            className="h-full w-full rounded-lg object-cover object-center"
            src={data?.image}
            alt="image course"
          />
        </div>
      )}
      {/* Infor course */}
      <div className="flex flex-col lg:flex lg:flex-row lg:items-center lg:justify-between p-[10px] h-[50px]">
        <div className="flex">
          <Avatar src={data?.avatar} alt="avatar" loading="lazy" />
          <div className="mx-3">
            <p className="font-semibold">{data?.teacher}</p>
            <p>{data?.position}</p>
          </div>
          <div className="flex items-center">
            <Rating
              value={data?.start}
              readonly
              unratedColor="amber"
              ratedColor="amber"
            />
            <p className="hidden lg:block text-[14px] ml-1 italic font-normal">
              {data.numberReview} đánh giá
            </p>
          </div>
        </div>
        <div className="hidden lg:block text-blue-300">
          {data?.discount ? (
            <>
              <p className="line-through">{formatCurrency(data?.price)}</p>
              <p className="font-semibold text-blue-500">
                {formatCurrency(data?.discount)}
              </p>
            </>
          ) : (
            <p>{data?.price}VND</p>
          )}
        </div>
      </div>
      {/* Overview */}
      <div className="p-[10px]">
        <h1 className="font-semibold text-[20px] lg:text-[24px]">
          {data?.courseName}
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
    </div>
  );
};

export default DetailCourse;
