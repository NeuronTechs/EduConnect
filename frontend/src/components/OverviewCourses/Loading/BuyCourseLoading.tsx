import {
  Clock,
  Gauge,
  Globe,
  NotePencil,
  PlayCircle,
  User,
} from "@phosphor-icons/react";

const BuyCourseLoading = () => {
  return (
    <div>
      {/* image */}
      <div className="hidden lg:block w-full h-[120px] p-[10px]"></div>
      {/* Thông tin khóa học */}
      <div className="p-[10px]">
        <h2 className="border-b border-b-solid border-b-orange-200 font-semibold p-[20px_0px]"></h2>
        <ul>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px] ">
            <div className="flex items-center justify-between my-3">
              <Clock color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <NotePencil
                color="#ffcc80"
                weight="fill"
                size={20}
                className="mr-3"
              />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <User color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <PlayCircle
                color="#ffcc80"
                weight="fill"
                size={20}
                className="mr-3"
              />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Gauge color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Globe color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]"></p>
            </div>
            <p className="text-[16px]"></p>
          </li>
        </ul>
      </div>
      {/* thanh toasn */}
      <div className="p-[10px] gap-2">
        <div className="flex justify-between items-center py-2">
          <p className="line-through"></p>
          <p className="font-semibold"></p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <button className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"></button>
          <button className="flex items-center justify-center border text-white w-full py-2 rounded-lg bg-blue-300"></button>
        </div>
      </div>
      {/* Khóa học đề xuất */}
      <div className="p-[10px]">
        <h2 className="border-b border-b-solid border-b-orange-200 font-semibold pb-1"></h2>
      </div>
    </div>
  );
};

export default BuyCourseLoading;
