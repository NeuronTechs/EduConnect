import {
  ArrowRight,
  Clock,
  Gauge,
  Globe,
  NotePencil,
  PlayCircle,
  User,
} from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCarts } from "../../features/cart/cartSlice";
import { AppDispatch } from "../../redux/store";
import { convertTime, formatCurrency } from "../../utils/const";
import { SliceState } from "@/types/type";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import {
  CourseCheckout,
  getCoureCheckout,
} from "@/features/checkoutCourse/checkoutSlice";

const BuyCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const handleAddToCart = async () => {
    await dispatch(addToCart({ student_id: "00657", course_id: "15938" }));
    await dispatch(getCarts("00657"));
  };

  const handleRedirectCheckoutPage = async () => {
    const courseCurrent: CourseCheckout = {
      course_id: currentCourse?.course_id,
      teacher_id: currentCourse?.teacher_id,
      full_name: currentCourse?.fullName,
      discount: currentCourse?.discount,
      price: currentCourse?.price,
      title: currentCourse?.title,
      image: currentCourse?.image,
    };
    await dispatch(getCoureCheckout(courseCurrent));
    navigate(configRouter.checkout);
  };

  const handleRedirectToCouse = (course_id: string) => {
    navigate(`/course/learn/${course_id}`);
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
        <h2 className="border-b border-b-solid border-b-orange-200 font-semibold p-[20px_0px]">
          Thông tin khóa học
        </h2>
        <ul>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px] ">
            <div className="flex items-center justify-between my-3">
              <Clock color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Thời hạn</p>
            </div>
            <p className="text-[16px]">
              {currentCourse?.timeLine === "MAX"
                ? "Không có"
                : `${currentCourse?.timeLine} giờ`}
            </p>
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
            <p className="text-[16px]">{currentCourse?.totalLecture} bài</p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <User color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Học sinh</p>
            </div>
            <p className="text-[16px]">
              {currentCourse?.student === "MAX"
                ? "Không có giới hạn"
                : `${currentCourse?.timeLine} học sinh`}
            </p>
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
            <p className="text-[16px]">
              {/* {convertTime(currentCourse?.totalTime as number)} */}
            </p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Gauge color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Mức độ</p>
            </div>
            <p className="text-[16px]">{currentCourse?.level}</p>
          </li>
          <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
            <div className="flex items-center justify-between my-3">
              <Globe color="#ffcc80" weight="fill" size={20} className="mr-3" />
              <p className="text-[16px]">Ngôn ngữ</p>
            </div>
            <p className="text-[16px]">{currentCourse?.language}</p>
          </li>
        </ul>
      </div>
      {/* thanh toasn */}
      <div className="p-[10px] gap-2">
        <div className="flex justify-between items-center py-2">
          <p className="line-through">
            {/* {formatCurrency(currentCourse?.price as number)} */}
          </p>
          <p className="font-semibold">
            {/* {formatCurrency(currentCourse?.discount as number)} */}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {currentCourse?.student_id.includes("00657") ? (
            <button
              onClick={() => handleRedirectToCouse(currentCourse?.course_id)}
              className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
            >
              Truy cập khóa học <ArrowRight size={18} />
            </button>
          ) : (
            <>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
              >
                Thêm vào giỏ hàng <ArrowRight size={18} />
              </button>
              <button
                onClick={handleRedirectCheckoutPage}
                className="flex items-center justify-center border text-white w-full py-2 rounded-lg bg-blue-300"
              >
                Mua khóa học
                <ArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      {/* Khóa học đề xuất */}
      <div className="p-[10px]">
        <h2 className="border-b border-b-solid border-b-orange-200 font-semibold pb-1">
          Khóa học đề xuất
        </h2>
      </div>
    </div>
  );
};

export default BuyCourse;
