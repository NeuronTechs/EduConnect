// import SearchHeader from "../Header/SearchHeader";
import NotificationHeader from "../Header/NotificationHeader";
// import MessageHeader from "../Header/MessageHeader";
import CourseCart from "../Header/CourseCart";
import AccountHeader from "../Header/AccountHeader";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";

const HeaderCart = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );
  const handleRedirectHomePage = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-[80px] bg-white shadow-xl flex items-center justify-between py-2">
      <div
        className="w-[300px] h-full flex items-center justify-center hover:cursor-pointer"
        onClick={handleRedirectHomePage}
      >
        <img
          src={assets.images.logoMain}
          alt=""
          className="h-[50px] object-cover"
        />
      </div>
      {/* <div className="w-[500px]">
        <SearchHeader />
      </div> */}
      <div className="flex items-center justify-center gap-3 pr-3">
        <NotificationHeader />
        {/* <MessageHeader /> */}
        {/* <CourseCart /> */}
        {currentUser?.role === "0" && <CourseCart />}
        <AccountHeader />
      </div>
    </div>
  );
};

export default HeaderCart;
