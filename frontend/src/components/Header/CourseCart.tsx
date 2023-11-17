import { ShoppingCart, Video } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/const";
import { AppDispatch } from "@/redux/store";
import { getCarts, removeToCart } from "@/features/cart/cartSlice";
import { configRouter } from "@/configs/router";
import { SliceState } from "@/types/type";
import { getCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";

const CourseCart = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const cartCurrent = useSelector(
    (state: SliceState) => state.cartSlice.cartCurrent
  );
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleGetCarts = async () => {
      await dispatch(getCarts(currentUser?.user_id as string));
    };
    handleGetCarts();
  }, []);

  const handleRedirectCart = () => {
    navigate(configRouter.coursesCart);
  };

  const handleRemoveCourseToCart = async (cart_id: string) => {
    await dispatch(removeToCart(cart_id));
    await dispatch(getCarts(currentUser?.user_id as string));
  };

  const handleRedirectCourse = (id: string) => {
    dispatch(getCourseOverview(id));
    navigate(`/course/${id}`);
  };

  return (
    <div
      className="relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ShoppingCart onClick={handleRedirectCart} cursor="pointer" size={22} />
      {isHovered && (
        <div className="absolute w-[415px] h-[350px] right-0 z-1 bg-white p-3 border border-[#ccc] rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto">
          <div className="mb-3 font-semibold text-[14px]">
            Khoá học mới đã thêm
          </div>
          {/* list course */}
          {cartCurrent?.length !== 0 && cartCurrent !== null ? (
            cartCurrent?.map((data: any, index: any) => (
              <div
                className="w-full py-[10px] border-b border-solid border-gray-300"
                key={index}
              >
                <div className="flex-1 h-[70px] grid grid-cols-[80px_240px_50px] justify-stretch items-center">
                  <div
                    className="mr-1 cursor-pointer"
                    onClick={() => handleRedirectCourse(data?.course_id)}
                  >
                    <img
                      className="w-[80px] h-[60px] object-cover rounded-md"
                      src={data.image}
                      alt="course image"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-[90%] flex flex-col items-start justify-center text-ellipsis overflow-hidden mr-1">
                    <div className="text-[14px] text-ellipsis overflow-hidden">
                      <p
                        className="font-semibold text-ellipsis overflow-hidden cursor-pointer"
                        onClick={() => handleRedirectCourse(data?.course_id)}
                      >
                        {data.title}
                      </p>
                      <p className="truncate">{data.full_name}</p>
                    </div>
                    <div className="flex">
                      <p className="text-[14px] text-blue-600 line-through">
                        {formatCurrency(data?.price)}
                      </p>
                      <p className="text-[14px] text-blue-600 font-semibold">
                        {formatCurrency(data?.discount)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <button
                      onClick={() => handleRemoveCourseToCart(data?.cart_id)}
                      className="border-2 border-blue-300 py-1 px-3 hover:bg-blue-500 hover:text-white transition-all rounded-md"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Video size={32} />
              Không có khóa học
            </div>
          )}
          {cartCurrent?.length !== 0 && (
            <div className="absolute right-3 py-3">
              <button
                onClick={handleRedirectCart}
                className="bg-blue-600 text-white px-3 py-2 rounded-md"
              >
                Xem giỏ hàng
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CourseCart;
