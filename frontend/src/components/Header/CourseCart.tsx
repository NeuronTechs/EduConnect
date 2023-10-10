import { ShoppingCart, Video } from "@phosphor-icons/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/const";
import { RootState } from "@/redux/store";

const CourseCart = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const cartCurrent = useSelector((state: RootState) => state);

  const handleRedirectCart = () => {
    navigate("/courses-cart");
  };

  return (
    <div
      className="cursor-pointer relative z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRedirectCart}
    >
      <ShoppingCart size={22} />
      {isHovered && (
        <div className="absolute w-[400px] h-[300px] right-0 z-1 bg-white p-3 border border-[#ccc] rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-auto">
          <div className="mb-3 font-semibold text-[14px]">
            Khoá học mới đã thêm
          </div>
          {cartCurrent?.cartSlice?.cartCurrent?.length !== 0 ? (
            cartCurrent?.cartSlice?.cartCurrent?.map(
              (data: any, index: any) => (
                <div className="my-3" key={index}>
                  <div className="flex-1 grid grid-cols-[50px_auto_90px] justify-stretch items-center my-3">
                    <img
                      className="w-[50px] h-[50px] object-contain"
                      src={data.image}
                      alt="course image"
                      loading="lazy"
                    />
                    <div className="truncate text-[14px] mx-2">
                      <p className="my-1 font-semibold truncate">{data.name}</p>
                      <p className="my-1 truncate">{data.teacher}</p>
                    </div>
                    <div>
                      <p className="text-[14px] text-blue-600 line-through">
                        {formatCurrency(data?.price)}
                      </p>
                      <p className="text-[14px] text-blue-600 font-semibold">
                        {formatCurrency(data?.discount)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Video size={32} />
              Không có khóa học
            </div>
          )}
          {cartCurrent?.cartSlice?.cartCurrent?.length !== 0 && (
            <div className="my-3 absolute right-3">
              <button
                onClick={handleRedirectCart}
                className="bg-blue-600 text-white px-3 py-1 rounded-md"
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
