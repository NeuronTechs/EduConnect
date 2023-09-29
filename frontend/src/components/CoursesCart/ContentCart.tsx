import { Trash, Video } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
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
import { Cart, removeToCart } from "../../features/cart/cartSlice";

const ContentCart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [totals, setTotals] = useState<number>(0);
  const navigate = useNavigate();
  const cartCurrent = useSelector((state: any) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    cartCurrent?.cartSlice?.cartCurrent?.map((data: any) => {
      setTotals((prev) => prev + data?.price);
    });
  }, [cartCurrent]);

  const handleRedirectHomePage = () => {
    navigate("/");
  };

  const handleRedirectCheckoutPage = () => {
    navigate("/checkout");
  };

  const handleRedirectCourse = (id: string) => {
    navigate(`/course/${id}`);
  };

  const handleOpen = () => setOpen(!open);

  const handleRemoveCourseToCart = async (data: Cart) => {
    setOpen(!open);
    await dispatch(removeToCart(data));
  };

  return (
    <div className="mt-3 mx-20 px-6">
      {cartCurrent?.cartSlice?.cartCurrent?.length !== 0 ? (
        <div>
          <h1 className="font-semibold text-[30px] my-3 w-full">Giỏ hàng</h1>
          <div className="flex justify-between w-full">
            <div className="w-[70%]">
              <h1 className="font-semibold text-[15px] my-3 border border-b-gray-400 pb-1 w-full">
                {cartCurrent?.cartSlice?.cartCurrent?.length} khóa học trong giỏ
                hàng
              </h1>
              {cartCurrent?.cartSlice?.cartCurrent?.map(
                (data: any, index: any) => (
                  <div className="my-3 w-full" key={index}>
                    <div className="flex-1 grid grid-cols-[120px_auto_100px_40px] justify-stretch items-center my-3">
                      <img
                        className="w-full h-[80px] object-cover p-1"
                        src={data.image}
                        alt="course image"
                        loading="lazy"
                      />
                      <div
                        className="truncate text-[16px] mx-2 cursor-pointer"
                        onClick={() => handleRedirectCourse("123")}
                      >
                        <p className="my-1 font-semibold truncate">
                          {data.name}
                        </p>
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
                      <div>
                        <Trash
                          cursor="pointer"
                          size={32}
                          onClick={handleOpen}
                        />
                        <Dialog open={open} handler={handleOpen}>
                          <DialogHeader>
                            Xoá khóa học khỏi giỏ hàng
                          </DialogHeader>
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
                              onClick={() => handleRemoveCourseToCart(data)}
                            >
                              <span>Xóa</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="w-[30%] px-5">
              <div className="font-semibold text-[15px] my-3 pb-1 ">
                Thông tin đơn hàng
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">
                  Tạm tính ({cartCurrent?.cartSlice?.cartCurrent?.length} khóa
                  học)
                </div>
                <div className="text-[15px] font-semibold">
                  {formatCurrency(totals / 2)}
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">Phí vận chuyển</div>
                <div className="text-[15px] font-semibold">
                  {formatCurrency(0)}
                </div>
              </div>
              <div className="flex items-center justify-between my-5 mx-2">
                <input
                  type="text"
                  className="outline-none border border-gray-400 p-2 rounded-md hover:border-blue-300 active:border-blue-300 focus:border-blue-300"
                  placeholder="Mã giảm giá (Chỉ áp dụng một lần)"
                />
                <button className="bg-blue-500 text-white py-2 px-3 rounded-md">
                  ÁP DỤNG
                </button>
              </div>
              <div className="flex items-start justify-between my-2">
                <div className="text-[15px]">Tổng cộng</div>
                <div className="text-[15px] font-semibold flex flex-col items-end justify-center">
                  <p>{formatCurrency(totals / 2)}</p>
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
