import { Avatar, Rating } from "@material-tailwind/react";
import { useState } from "react";
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
const DetailCourse = () => {
  const [activeTab, setActiveTab] = useState<string>("Tổng quan");
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
  return (
    <div className="w-full lg:w-[70%] h-auto">
      {data?.image === "" ? (
        <div className="my-3 bg-gray-400 w-full h-[150px] rounded-lg"></div>
      ) : (
        <div className="my-3 w-full h-[200px] ">
          <img
            loading="lazy"
            className="h-full w-full rounded-lg object-cover object-center"
            src={data?.image}
            alt="image course"
          />
        </div>
      )}
      <div className="flex flex-col lg:flex lg:items-center lg:justify-between my-5">
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
            <p className="hidden lg:display text-[14px] ml-1 italic font-normal">
              {data.numberReview} đánh giá
            </p>
          </div>
        </div>
        <div className="hidden lg:display text-blue-300">
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
      <div className="my-3">
        <h1 className="my-2 font-semibold text-[20px] lg:text-[24px]">
          {data?.courseName}
        </h1>
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[100%] my-3"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-blue-300 shadow-none rounded-none",
            }}
          >
            {dataTab.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "font-semibold" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {dataTab.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className="text-black">
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
