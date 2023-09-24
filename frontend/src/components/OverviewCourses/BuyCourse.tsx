import {
  ArrowRight,
  Clock,
  Gauge,
  Globe,
  NotePencil,
  PlayCircle,
  User,
} from "@phosphor-icons/react";

const BuyCourse = () => {
  return (
    <div className="w-[30%] px-3">
      <div className="w-full h-[200px] my-3">
        <img
          className="h-full w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
      </div>
      <div className="py-3">
        <h1 className="border border-b-solid border-b-orange-200 font-semibold pb-1">
          Thông tin khóa học
        </h1>
        <ul className="px-4">
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <Clock color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Thời hạn</p>
            </div>
            <p className="text-[16px]">48 giờ</p>
          </li>
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <NotePencil
                color="#ffcc80"
                weight="fill"
                size={20}
                className="mr-3"
              />
              <p className="text-[16px]">Bài giảng</p>
            </div>
            <p className="text-[16px]">15 bài</p>
          </li>
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <User color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Học sinh</p>
            </div>
            <p className="text-[16px]">Tối đa 15</p>
          </li>
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <PlayCircle
                color="#ffcc80"
                weight="fill"
                size={20}
                className="mr-3"
              />
              <p className="text-[16px]">Thời gian</p>
            </div>
            <p className="text-[16px]">10 giờ</p>
          </li>
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <Gauge color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Mức độ</p>
            </div>
            <p className="text-[16px]">Cơ bản</p>
          </li>
          <li className="flex items-center justify-between border border-b-solid border-b-gray-400">
            <div className="flex items-center justify-between my-3">
              <Globe color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Ngôn ngữ</p>
            </div>
            <p className="text-[16px]">Tiếng Việt</p>
          </li>
        </ul>
      </div>
      <div className="my-3 px-3">
        <div className="flex justify-between items-center">
          <p className="line-through">400.000 VND</p>
          <p className="font-semibold">200.000 VND</p>
        </div>
        <div className="flex flex-col my-3 justify-center items-center">
          <button className="flex items-center justify-center border border-blue-300 w-[300px] py-2 rounded-lg text-blue-400">
            Thêm vào giỏ hàng <ArrowRight size={18} />
          </button>
          <button className="flex items-center justify-center border text-white w-[300px] py-2 rounded-lg bg-blue-300 my-3">
            Mua khóa học
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="py-3">
        <h1 className="border border-b-solid border-b-orange-200 font-semibold pb-1">
          Khóa học đề xuất
        </h1>
      </div>
    </div>
  );
};

export default BuyCourse;