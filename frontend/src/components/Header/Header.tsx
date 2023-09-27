import SearchHeader from "./SearchHeader";
import NotificationHeader from "./NotificationHeader";
import AccountHeader from "./AccountHeader";
import MessageHeader from "./MessageHeader";
import { List } from "@phosphor-icons/react";
import React from "react";
interface propsHeader {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = (props: propsHeader): React.ReactElement => {
  return (
    <div className="w-full h-[80px] bg-white shadow-sm flex items-center justify-between px-3 py-2 ">
      <div className="left flex space-x-3">
        <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200">
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
        <MessageHeader />
        <AccountHeader />
      </div>
    </div>
  );
};

export default Header;
