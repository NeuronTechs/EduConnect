import SearchHeader from "./SearchHeader";
import NotificationHeader from "./NotificationHeader";
import AccountHeader from "./AccountHeader";
import MessageHeader from "./MessageHeader";

const Header = () => {
  return (
    <div className="w-full h-[80px] bg-white shadow-sm flex items-center justify-between px-3 py-2 ">
      <div className="left">
        <SearchHeader />
      </div>
      <div className="right flex gap-3">
        <NotificationHeader />
        <MessageHeader />
        <AccountHeader />
      </div>
    </div>
  );
};

export default Header;
