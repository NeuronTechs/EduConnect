import SearchHeader from "./SearchHeader";
import NotificationHeader from "./NotificationHeader";
import AccountHeader from "./AccountHeader";
// import MessageHeader from "./MessageHeader";
import { List } from "@phosphor-icons/react";
import React from "react";
import CourseCart from "./CourseCart";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
interface propsHeader {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = (props: propsHeader): React.ReactElement => {
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );
  return (
    <div className="w-full h-[80px] bg-white shadow-sm flex items-center justify-between px-3 py-2 relative z-999 ">
      <div className="left flex space-x-3 items-center">
        <div className="rounded-full cursor-pointer p-2  flex transition-all delay-200 items-center justify-center h-auto">
          <List
            size={25}
            className="text-gray-500"
            onClick={() => props.setIsOpen((prev) => !prev)}
          />
        </div>
        <SearchHeader />
      </div>
      <div className="right flex gap-3 items-center">
        <NotificationHeader />
        {/* <MessageHeader /> */}
        {currentUser?.role === "0" && <CourseCart />}
        <AccountHeader />
      </div>
    </div>
  );
};

export default Header;
