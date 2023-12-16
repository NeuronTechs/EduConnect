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
import { convertTimeToTemplate, formatCurrency } from "../../utils/const";
import { SliceState } from "@/types/type";
import { useNavigate, useParams } from "react-router-dom";
import { configRouter } from "@/configs/router";
import {
  CourseCheckout,
  getCoureCheckout,
  resetCheckOutCart,
} from "@/features/checkoutCourse/checkoutSlice";
import BuyCourseLoading from "./Loading/BuyCourseLoading";
import * as courseApi from "../../api/courseApi/courseApi";
import { resetStoreCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";
import { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

const BuyCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
  const { id } = useParams();

  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );

  const cartCurrent = useSelector(
    (state: SliceState) => state.cartSlice.cartCurrent
  );

  const loading = useSelector(
    (state: SliceState) => state.courseOverviewSlice.loading
  );

  const handleAddToCart = async () => {
    if (currentUser?.username) {
      await dispatch(
        addToCart({
          student_id: currentUser?.user_id as string,
          course_id: id as string,
        })
      );
      await dispatch(getCarts(currentUser?.user_id as string));
    } else {
      navigate("/login");
      toast.warn("Hãy đăng nhập để sử dụng dịch vụ");
    }
  };

  const handleRedirectCheckoutPage = async () => {
    if (currentUser?.username) {
      if (currentCourse?.discount === 0) {
        try {
          const addTransactionInCourse = await courseApi.addTransactionInCourse(
            {
              student_id: currentUser?.user_id,
              course_id: currentCourse?.course_id,
              amount: currentCourse?.discount,
              status: "Thành công",
              transaction_id: generateRandomString(),
              full_name: currentUser?.full_name,
              email: currentUser?.email,
              course_name: currentCourse?.title,
            }
          );
          if (addTransactionInCourse.status === 200) {
            setLoadingCheckout(false);
            dispatch(resetCheckOutCart());
            dispatch(resetStoreCourseOverview());
            alert("Thanh toán thành công");
            navigate(`/course/learn/${currentCourse?.course_id}`);
          } else {
            setLoadingCheckout(false);
            alert(addTransactionInCourse.message);
          }
        } catch (err: any) {
          console.log(err);
          setLoadingCheckout(false);
          alert(err.message);
        }
      } else {
        const courseCurrent: CourseCheckout = {
          course_id: currentCourse?.course_id,
          teacher_id: currentCourse?.teacher_id,
          full_name: currentCourse?.fullName,
          discount: currentCourse?.discount,
          price: currentCourse?.price,
          title: currentCourse?.title,
          image: currentCourse?.image,
        };
        await dispatch(getCoureCheckout([courseCurrent]));
        navigate(configRouter.checkout);
      }
    } else {
      navigate("/login");
      toast.warn("Hãy đăng nhập để sử dụng dịch vụ");
    }
  };

  const handleRedirectToCouse = (course_id: string) => {
    navigate(`/course/learn/${course_id}`);
  };

  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleRedirectToCart = async () => {
    navigate(`/courses-cart`);
  };

  const isCourseIdExist = (courseId: string) => {
    if (cartCurrent?.length === 0 || cartCurrent === null) {
      return false;
    } else {
      for (let i = 0; i < cartCurrent?.length; i++) {
        if (cartCurrent[i].course_id === courseId) {
          return true;
        }
      }
    }
  };

  return (
    <div
      className={`${
        loading && "animate-pulse"
      } w-full lg:w-[30%] p-[10px] bg-white`}
    >
      {loading ? (
        <BuyCourseLoading />
      ) : (
        <>
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
                  <Clock
                    color="#ffcc80"
                    weight="fill"
                    size={20}
                    className="mr-3"
                  />
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
                  <User
                    color="#ffcc80"
                    weight="fill"
                    size={20}
                    className="mr-3"
                  />
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
                  {convertTimeToTemplate(
                    currentCourse?.totalTime !== null
                      ? (currentCourse?.totalTime as number)
                      : 0
                  )}
                </p>
              </li>
              <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
                <div className="flex items-center justify-between my-3">
                  <Gauge
                    color="#ffcc80"
                    weight="fill"
                    size={20}
                    className="mr-3"
                  />
                  <p className="text-[16px]">Mức độ</p>
                </div>
                <p className="text-[16px]">{currentCourse?.level}</p>
              </li>
              <li className="flex items-center justify-between border-b border-b-solid border-b-gray-400 p-[5px]">
                <div className="flex items-center justify-between my-3">
                  <Globe
                    color="#ffcc80"
                    weight="fill"
                    size={20}
                    className="mr-3"
                  />
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
                {currentCourse?.price !== null
                  ? formatCurrency(currentCourse?.price as number)
                  : "Chưa xác định"}
              </p>
              <p className="font-semibold">
                {currentCourse?.discount !== null
                  ? formatCurrency(currentCourse?.discount as number)
                  : "Chưa xác định"}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              {(currentCourse?.student_id !== null &&
                currentCourse?.student_id?.includes(
                  currentUser?.user_id as string
                )) ||
              (currentCourse?.teacher_id === currentUser?.user_id &&
                currentUser?.role === "1") ||
              currentUser?.role === "2" ? (
                <button
                  onClick={() =>
                    handleRedirectToCouse(currentCourse?.course_id as string)
                  }
                  className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
                >
                  Truy cập khóa học <ArrowRight size={18} />
                </button>
              ) : (
                <>
                  {!isCourseIdExist(currentCourse?.course_id as string) ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
                    >
                      Thêm vào giỏ hàng <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={handleRedirectToCart}
                      className="flex items-center justify-center border border-blue-300 w-full py-2 rounded-lg text-blue-400"
                    >
                      Tới giỏ hàng <ArrowRight size={18} />
                    </button>
                  )}

                  <button
                    onClick={handleRedirectCheckoutPage}
                    className="flex items-center justify-center border text-white w-full py-2 rounded-lg bg-blue-300"
                  >
                    {loadingCheckout ? (
                      <div className="flex justify-center">
                        <Spinner />
                      </div>
                    ) : (
                      <>
                        Mua khóa học
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyCourse;
