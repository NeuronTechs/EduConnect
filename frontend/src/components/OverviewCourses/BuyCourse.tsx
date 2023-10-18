import {
  ArrowRight,
  Clock,
  Gauge,
  Globe,
  NotePencil,
  PlayCircle,
  User,
} from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { Cart, addToCart } from "../../features/cart/cartSlice";
import { AppDispatch } from "../../redux/store";
import { formatCurrency } from "../../utils/const";

const BuyCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  };
  const handleAddToCart = async () => {
    let dataCart: Cart = {
      id_course: generateRandomString(),
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
      name: "Reactjs cơ bản cho người mới bắt đầu",
      teacher: "Nguyen Thu Huong",
      discount: 200000,
      price: 400000,
      star: 5,
    };

    // Dispatch the async thunk directly
    await dispatch(addToCart(dataCart));
  };
  return (
    <div className="w-full lg:w-[30%] p-[10px] bg-white">
      {/* image */}
      <div className="hidden lg:block w-full h-[120px] p-[10px]">
        <img
          loading="lazy"
          className="h-full w-full rounded-lg object-cover object-center"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
      </div>
      {/* Thông tin khóa học */}
      <div className="p-[10px]">
        <h1 className="border-b border-b-solid border-b-orange-200 font-semibold p-[20px_0px]">
          Thông tin khóa học
        </h1>
        <ul>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px] ">
            <div className="flex items-center justify-between my-3">
              <Clock color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Thời hạn</p>
            </div>
            <p className="text-[16px]">48 giờ</p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
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
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <User color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Học sinh</p>
            </div>
            <p className="text-[16px]">Tối đa 15</p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
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
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Gauge color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Mức độ</p>
            </div>
            <p className="text-[16px]">Cơ bản</p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Globe color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Ngôn ngữ</p>
            </div>
            <p className="text-[16px]">Tiếng Việt</p>
          </li>
        </ul>
      </div>
      {/* thanh toasn */}
      <div className="p-[10px] gap-2">
        <div className="flex justify-between items-center py-2">
          <p className="line-through">{formatCurrency(400000)}</p>
          <p className="font-semibold">{formatCurrency(200000)}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
          >
            Thêm vào giỏ hàng <ArrowRight size={18} />
          </button>
          <button className="flex items-center justify-center border text-white w-full py-2 rounded-lg bg-blue-300">
            Mua khóa học
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      {/* Khóa học đề xuất */}
      <div className="p-[10px]">
        <h1 className="border-b border-b-solid border-b-orange-200 font-semibold pb-1">
          Khóa học đề xuất
        </h1>
      </div>
    </div>
  );
};

export default BuyCourse;
