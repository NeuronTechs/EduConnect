import HeaderCart from "@/components/CoursesCart/HeaderCart";
import { SliceState } from "@/types/type";
import { formatCurrency } from "@/utils/const";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as courseApi from "../api/courseApi/courseApi";
import { AppDispatch } from "@/redux/store";
import {
  CourseCheckout,
  resetCheckOutCart,
} from "@/features/checkoutCourse/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { Video } from "@phosphor-icons/react";
import { configRouter } from "@/configs/router";
import { removeToCart } from "@/features/cart/cartSlice";
import { BASE_URL } from "@/configs/environment";
import { toast } from "react-toastify";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>("");

  const currentCourse = useSelector(
    (state: SliceState) => state.checkoutSlice?.courseCurrent
  );

  const currentCart = useSelector(
    (state: SliceState) => state.cartSlice.cartCurrent
  );

  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  const handleRedirectHomePage = () => {
    nav(configRouter.home);
  };

  let totalPrice = currentCourse?.reduce(
    (total: number, course: CourseCheckout) => {
      return total + (course?.discount ? course?.discount : 0);
    },
    0
  );

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

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let res;
    let totalSuccess = 0;
    try {
      if (cardName === "") {
        toast.error("Vui lòng nhập tên thẻ!");
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        for (const course of currentCourse || []) {
          setLoading(true);
          if ((course?.discount as number) < 5000) {
            const addTransactionInCourse =
              await courseApi.addTransactionInCourse({
                student_id: currentUser?.user_id,
                course_id: course?.course_id,
                amount: course?.discount ? course?.discount : 0,
                status: "Thành công",
                transaction_id: generateRandomString(),
                full_name: currentUser?.full_name,
                email: currentUser?.email,
                course_name: course?.title,
              });
            if (addTransactionInCourse.status === 200) {
              dispatch(
                removeToCart(
                  currentCart?.filter(
                    (cart) => cart?.course_id === course?.course_id
                  )[0].cart_id as string
                )
              );
              setLoading(false);
              totalSuccess++;
              // toast.success("Thanh toán thành công");
              // nav(`/course/learn/${course?.course_id}`);
            } else {
              setLoading(false);
              toast.error(addTransactionInCourse.message);
            }
          } else {
            const paymentData = {
              amount: course?.discount,
            };

            res = await axios.post(
              `${BASE_URL}/payment/process`,
              paymentData,
              config
            );

            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
              return;
            }
            const cardElement = elements.getElement(CardNumberElement);
            if (cardElement) {
              const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                  card: cardElement,
                  billing_details: {
                    name: currentUser?.full_name,
                    email: currentUser?.email,
                  },
                },
              });
              if (result.error) {
                setLoading(false);
                toast.error(result.error.message);
              } else {
                if (result.paymentIntent.status === "succeeded") {
                  const addTransactionInCourse =
                    await courseApi.addTransactionInCourse({
                      student_id: currentUser?.user_id,
                      course_id: course?.course_id,
                      amount: course?.discount,
                      status: "Thành công",
                      transaction_id: result?.paymentIntent?.id,
                      full_name: currentUser?.full_name,
                      email: currentUser?.email,
                      course_name: course?.title,
                    });
                  if (addTransactionInCourse.status === 200) {
                    if (
                      currentCart?.filter(
                        (cart) => cart?.course_id === course?.course_id
                      ) &&
                      currentCart?.filter(
                        (cart) => cart?.course_id === course?.course_id
                      )?.length > 0
                    ) {
                      dispatch(
                        removeToCart(
                          currentCart?.filter(
                            (cart) => cart?.course_id === course?.course_id
                          )[0].cart_id as string
                        )
                      );
                    }
                    totalSuccess++;
                    if (totalSuccess === currentCourse?.length) {
                      setLoading(false);
                      dispatch(resetCheckOutCart());
                      toast.success("Thanh toán thành công");
                      nav("/");
                    }
                  } else {
                    setLoading(false);
                    toast.error(addTransactionInCourse.message);
                  }
                } else {
                  setLoading(false);
                  toast.error("Có một vài vấn đề trong lúc thanh toán!!!");
                }
              }
            }
          }
        }
      }

      // const paymentData = {
      //   amount: currentCourse?.discount,
      // };

      // res = await axios.post(
      //   "http://localhost:3000/v1/payment/process",
      //   paymentData,
      //   config
      // );

      // const clientSecret = res.data.client_secret;

      // if (!stripe || !elements) {
      //   return;
      // }
      // const cardElement = elements.getElement(CardNumberElement);
      // if (cardElement) {
      //   const result = await stripe.confirmCardPayment(clientSecret, {
      //     payment_method: {
      //       card: cardElement,
      //       billing_details: {
      //         name: currentUser?.full_name,
      //         email: currentUser?.email,
      //       },
      //     },
      //   });
      //   if (result.error) {
      //     setLoading(false);
      //     alert(result.error.message);
      //   } else {
      //     if (result.paymentIntent.status === "succeeded") {
      //       const addTransactionInCourse =
      //         await courseApi.addTransactionInCourse({
      //           student_id: currentUser?.user_id,
      //           course_id: currentCourse?.course_id,
      //           amount: currentCourse?.discount,
      //           status: "Thành công",
      //           transaction_id: result?.paymentIntent?.id,
      //           full_name: currentUser?.full_name,
      //           email: currentUser?.email,
      //           course_name: currentCourse?.title,
      //         });
      //       console.log(addTransactionInCourse);
      //       if (addTransactionInCourse.status === 200) {
      //         if (
      //           currentCart?.filter(
      //             (cart) => cart?.course_id === currentCourse?.course_id
      //           ) &&
      //           currentCart?.filter(
      //             (cart) => cart?.course_id === currentCourse?.course_id
      //           )?.length > 0
      //         ) {
      //           dispatch(
      //             removeToCart(
      //               currentCart?.filter(
      //                 (cart) => cart?.course_id === currentCourse?.course_id
      //               )[0].cart_id as string
      //             )
      //           );
      //         }
      //         setLoading(false);
      //         dispatch(resetCheckOutCart());
      //         alert("Thanh toán thành công");
      //         nav("/");
      //       } else {
      //         setLoading(false);
      //         alert(addTransactionInCourse.message);
      //       }
      //     } else {
      //       setLoading(false);
      //       alert("Có một vài vấn đề trong lúc thanh toán!!!");
      //     }
      //   }
      // }
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto">
      <HeaderCart />
      <div className="mt-3 xl:mx-20 px-6">
        <div>
          <h1 className="font-semibold text-[30px] my-3 w-full">Thanh toán</h1>
        </div>
        {currentCourse ? (
          <div className="flex items-center justify-around w-full ">
            <div className="w-[50%] shadow-lg px-5 py-3 bg-white rounded-lg">
              <form onSubmit={submitHandler}>
                <h1 className="mb-4 font-semibold my-3 text-[20px]">
                  Phương thức thanh toán
                </h1>
                <div className="w-full">
                  <label htmlFor="card_name_field">Name on card</label>
                  <br></br>
                  <input
                    className="w-full border border-gray-300 focus:ring-gray-300 focus:border-gray-300"
                    type="text"
                    id="card_name_field"
                    placeholder="Card Name"
                    required
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    // type="text"
                    id="card_num_field"
                    className="w-full border p-3 "
                    options={options}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    // type="text"
                    id="card_exp_field"
                    className="w-full border p-3"
                    options={options}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    // type="text"
                    id="card_cvc_field"
                    className="w-full border p-3"
                    options={options}
                  />
                </div>
              </form>
              <div className="my-3 w-full">
                <h1 className="mb-4 font-semibold my-3 text-[20px]">
                  Khóa học
                </h1>
                {currentCourse.map((course, index) => (
                  <div key={index}>
                    <div className="w-full flex-1 grid grid-cols-[80px_auto_40px] md:grid-cols-[80px_auto_80px] justify-stretch items-center my-3">
                      <img
                        className="w-full h-[80px] object-cover p-1"
                        src={course?.image}
                        alt="course image"
                        loading="lazy"
                      />
                      <div className="truncate text-[16px] mx-2 cursor-pointer">
                        <p className="my-1 font-semibold truncate">
                          {course?.title}
                        </p>
                        <p className="my-1 truncate">{course?.full_name}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[14px] text-black">
                          {formatCurrency(
                            course?.discount ? course?.discount : 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* info total bill */}
            <div className="w-full my-5 lg:my-0 lg:w-[30%] lg:px-5">
              <div className="font-semibold text-[15px] my-3 pb-1 ">
                Thông tin đơn hàng
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">
                  Tạm tính ({currentCourse?.length} khóa học)
                </div>
                <div className="text-[15px] font-semibold">
                  {formatCurrency(totalPrice ? totalPrice : 0)}
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <div className="text-[15px] text-gray-800">Phí vận chuyển</div>
                <div className="text-[15px] font-semibold">
                  {formatCurrency(0)}
                </div>
              </div>
              <div className="flex items-start justify-between my-2">
                <div className="text-[15px]">Tổng cộng</div>
                <div className="text-[15px] font-semibold flex flex-col items-end justify-center">
                  <p>{formatCurrency(totalPrice ? totalPrice : 0)}</p>
                  <p className="font-normal">Đã bao gồm VAT (nếu có)</p>
                </div>
              </div>
              <div className="my-3">
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <button
                    onClick={submitHandler}
                    className="w-full bg-blue-500 text-white py-2 px-3 rounded-md"
                  >
                    THANH TOÁN
                  </button>
                )}
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
    </div>
  );
};
export default Checkout;
