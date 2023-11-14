import { Trash, Video } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { formatCurrency } from "../../utils/const";
import { AppDispatch } from "../../redux/store";
import { Cart, getCarts, removeToCart } from "../../features/cart/cartSlice";
import { configRouter } from "@/configs/router";
import { SliceState } from "@/types/type";

const ContentCart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const cartCurrent = useSelector(
    (state: SliceState) => state.cartSlice.cartCurrent
  );
  // let totalPrice = cartCurrent?.reduce((total: number,cart: Cart) => {
  //   return total + parseInt(cart?.discount)
  // }, 0);
  const dispatch = useDispatch<AppDispatch>();

  const handleRedirectHomePage = () => {
    navigate(configRouter.home);
  };

  const handleRedirectCheckoutPage = () => {
    navigate(configRouter.checkout);
  };

  const handleRedirectCourse = (id: string) => {
    navigate(`/course/${id}`);
  };

  const handleOpen = () => setOpen(!open);

  const handleRemoveCourseToCart = async (cart_id: string) => {
    setOpen(!open);
    await dispatch(removeToCart(cart_id));
    await dispatch(getCarts("00657"));
  };

  return (
    <div className="mt-3 xl:mx-20 px-6">
      {cartCurrent?.length !== 0 && cartCurrent !== null ? (
        <div>
          <h1 className="font-semibold text-[30px] my-3 w-full">Giỏ hàng</h1>
          <div className="lg:flex lg:justify-between w-full">
            <div className="w-full lg:w-[70%]">
              <h1 className="font-semibold text-[15px] my-3 border-b border-b-gray-400 pb-1 w-full">
                {cartCurrent?.length} khóa học trong giỏ hàng
              </h1>
              {cartCurrent?.map((data: Cart, index: any) => (
                <div className="my-3 w-full" key={index}>
                  <div className="flex-1 grid grid-cols-[80px_auto_40px] md:grid-cols-[120px_auto_100px_40px] justify-stretch items-center my-3">
                    <img
                      className="w-full h-[80px] object-cover p-1"
                      src={data?.image}
                      alt="course image"
                      loading="lazy"
                    />
                    <div
                      className="truncate text-[16px] mx-2 cursor-pointer"
                      onClick={() => handleRedirectCourse("123")}
                    >
                      <p className="my-1 font-semibold truncate">
                        {data?.title}
                      </p>
                      <p className="my-1 truncate">{data?.full_name}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[14px] text-blue-600 line-through">
                        {/* {formatCurrency(data?.price as number)} */}
                      </p>
                      <p className="text-[14px] text-blue-600 font-semibold">
                        {/* {formatCurrency(data?.discount as number)} */}
                      </p>
                    </div>
                    <div>
                      <Trash cursor="pointer" size={32} onClick={handleOpen} />
                      <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Xoá khóa học khỏi giỏ hàng</DialogHeader>
                        <DialogBody divider>
                          Bạn có chắc chắn muốn xóa khóa học?
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                          >
                            <span>Hủy</span>
                          </Button>
                          <Button
                            variant="gradient"
                            color="green"
                            onClick={() =>
                              handleRemoveCourseToCart(data?.cart_id as string)
                            }
                          >
                            <span>Xóa</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full my-5 lg:my-0 lg:w-[30%] lg:px-5">
              <div className="font-semibold text-[15px] my-3 pb-1 ">
                Thông tin đơn hàng
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">
                  Tạm tính ({cartCurrent?.length} khóa học)
                </div>
                <div className="text-[15px] font-semibold">
                  {/* {formatCurrency(parseInt(totalPrice))} */}
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">Phí vận chuyển</div>
                <div className="text-[15px] font-semibold">
                  {formatCurrency(0)}
                </div>
              </div>
              <div className="flex items-center justify-between my-5 mx-2 w-full">
                <input
                  type="text"
                  className="w-[60%] outline-none border border-gray-400 p-2 rounded-md hover:border-blue-300 active:border-blue-300 focus:border-blue-300"
                  placeholder="Mã giảm giá (Chỉ áp dụng một lần)"
                />
                <button className=" w-[35%] bg-blue-500 text-white py-2 px-3 rounded-md">
                  Áp dụng
                </button>
              </div>
              <div className="flex items-start justify-between my-2">
                <div className="text-[15px]">Tổng cộng</div>
                <div className="text-[15px] font-semibold flex flex-col items-end justify-center">
                  {/* <p>{formatCurrency(totals / 2)}</p> */}
                  <p className="font-normal">Đã bao gồm VAT (nếu có)</p>
                </div>
              </div>
              <div className="my-3">
                <button
                  className="w-full bg-blue-500 text-white py-2 px-3 rounded-md"
                  onClick={handleRedirectCheckoutPage}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[400px] flex flex-col justify-center items-center">
          <Video size={100} />
          <p>Không có khóa học</p>
          <button
            onClick={handleRedirectHomePage}
            className="py-2 px-3 bg-blue-500 text-white rounded-md my-3"
          >
            Xem thêm khóa học
          </button>
        </div>
      )}
    </div>
  );
};
export default ContentCart;
