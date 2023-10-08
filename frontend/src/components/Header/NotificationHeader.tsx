import { Bell } from "@phosphor-icons/react";
import { useState } from "react";

const fakeData = [
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs cơ bản cho người mới bắt đầu",
    time: "1 phút trước",
  },
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs nang cao",
    time: "1 phút trước",
  },
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs hook",
    time: "1 phút trước",
  },
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs hook",
    time: "1 phút trước",
  },
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs hook",
    time: "1 phút trước",
  },
  {
    img: "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    name: "Reactjs hook",
    time: "1 phút trước",
  },
];
const NotificationHeader = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="cursor-pointer relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Bell size={22} />
      {isHovered && (
        <div className="absolute w-[400px] h-[400px] right-0 z-1 bg-white p-3 border border-[#ccc] rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto">
          <div className="mb-3 font-semibold text-[14px]">Thông báo</div>
          {fakeData?.length !== 0 ? (
            fakeData.map((data, index) => (
              <div className="my-3" key={index}>
                <div className="flex-1 grid grid-cols-[50px_auto_90px] justify-stretch items-center my-3">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src={data.img}
                    alt="course image"
                    loading="lazy"
                  />
                  <div className="truncate text-[14px] mx-2">
                    <p className="my-1 font-semibold truncate">{data.name}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Bell size={32} />
              Không có thông báo mới
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationHeader;
