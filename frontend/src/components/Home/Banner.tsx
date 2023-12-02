import React from "react";
import assets from "../../assets";
import BannerLoading from "../Loading/BannerLoading";
interface props {
  isLoading: boolean;
}
const Banner = (props: props): React.ReactElement => {
  return (
    <>
      {props.isLoading ? (
        <BannerLoading />
      ) : (
        <div className="w-full rounded-3xl min-h-[250px] flex bg-white overflow-hidden relative">
          <img
            src={assets.images.bgCourse}
            alt=""
            className="absolute w-full h-full object-cover"
          />
          {/* content */}
          <div className="flex flex-col relative ml-[50px] justify-center space-y-2">
            <h5 className="text-lg text-white font-semibold">
              Truyền tải tri thức không giới hạn
            </h5>
            <span className="text-gray-300 w-[50%]">
              nền tảng hỗ trợ xây dựng website khoá học hiệu quả nhất. Tối ưu
              quản lý khóa học, tương tác học viên, bán hàng bằng các công cụ
              trực quan và dễ dàng sử dụng.
            </span>
            {/* <div className="flex w-full ">
              <div className="bg-blue-500 rounded-3xl px-4 py-2 text-white">
                Xem
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
