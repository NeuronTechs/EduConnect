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
import { resetCheckOutCart } from "@/features/checkoutCourse/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useState } from "react";

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

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetCheckOutCart());
  //   };
  // }, [dispatch]);

  const currentCourse = useSelector(
    (state: SliceState) => state.checkoutSlice?.courseCurrent
  );

  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  const submitHandler = async (e: any) => {
    e.preventDefault();

    let res;
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const paymentData = {
        amount: currentCourse?.discount,
      };

      res = await axios.post(
        "http://localhost:3000/v1/payment/process",
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
              name: currentUser?.fullName,
              email: currentUser?.email,
            },
          },
        });
        if (result.error) {
          setLoading(false);
          alert(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            const addTransactionInCourse =
              await courseApi.addTransactionInCourse({
                student_id: currentUser?.user_id,
                course_id: currentCourse?.course_id,
                amount: currentCourse?.discount,
                status: "Thành công",
                transaction_id: result?.paymentIntent?.id,
              });
            console.log(addTransactionInCourse);
            if (addTransactionInCourse.status === 200) {
              setLoading(false);
              dispatch(resetCheckOutCart());
              alert("Thanh toán thành công");
              nav("/");
            } else {
              setLoading(false);
              alert(addTransactionInCourse.message);
            }
          } else {
            setLoading(false);
            alert("Có một vài vấn đề trong lúc thanh toán!!!");
          }
        }
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto">
      <HeaderCart />
      <div className="mt-3 xl:mx-20 px-6">
        <div>
          <h1 className="font-semibold text-[30px] my-3 w-full">Thanh toán</h1>
        </div>
        <div className="flex items-center justify-around w-full">
          <div className="w-[50%] shadow-lg px-5 py-3">
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
              <h1 className="mb-4 font-semibold my-3 text-[20px]">Khóa học</h1>
              <div className="w-full flex-1 grid grid-cols-[80px_auto_40px] md:grid-cols-[80px_auto_80px] justify-stretch items-center my-3">
                <img
                  className="w-full h-[80px] object-cover p-1"
                  src={currentCourse?.image}
                  alt="course image"
                  loading="lazy"
                />
                <div className="truncate text-[16px] mx-2 cursor-pointer">
                  <p className="my-1 font-semibold truncate">
                    {currentCourse?.title}
                  </p>
                  <p className="my-1 truncate">{currentCourse?.full_name}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-[14px] text-black">
                    {formatCurrency(currentCourse?.discount as number)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* info total bill */}
          <div className="w-full my-5 lg:my-0 lg:w-[30%] lg:px-5">
            <div className="font-semibold text-[15px] my-3 pb-1 ">
              Thông tin đơn hàng
            </div>
            <div className="flex items-center justify-between my-2">
              <div className="text-[15px] text-gray-800">
                Tạm tính (3 khóa học)
              </div>
              <div className="text-[15px] font-semibold">
                {formatCurrency(currentCourse?.discount as number)}
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
                <p>{formatCurrency(currentCourse?.discount as number)}</p>
                <p className="font-normal">Đã bao gồm VAT (nếu có)</p>
              </div>
            </div>
            <div className="my-3">
              {loading ? (
                <Spinner className="flex justify-center" />
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
      </div>
    </div>
  );
};
export default Checkout;
