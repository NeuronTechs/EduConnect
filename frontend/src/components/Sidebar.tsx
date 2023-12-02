import React from "react";
import assets from "../assets";
import {
  BookOpenText,
  Calendar,
  Chat,
  FolderPlus,
  House,
  MaskSad,
  UserCircle,
  UsersThree,
  Wallet,
  X,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { configRouter } from "@/configs/router";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Ref = HTMLDivElement;

const ITEM_SIDEBAR = [
  {
    title: "Trang Chủ",
    icon: <House size={25} />,
    to: configRouter.home,
  },
  {
    title: "Khoá Học Của Tôi",
    icon: <BookOpenText size={25} />,
    to: configRouter.myCourse,
  },
  {
    title: "kế hoạch",
    icon: <Calendar size={25} />,
    to: configRouter.myCourse,
  },
  // {
  //   title: "Thông báo",
  //   icon: <Notification size={25} />,
  //   to: configRouter.myCourse,
  // },
  {
    title: "Tin Nhắn",
    icon: <Chat size={25} />,
    to: "/chat",
  },
  {
    title: "Hồ sơ",
    icon: <UserCircle size={25} />,
    to: "/profile",
  },
  // {
  //   title: "Cài đặt",
  //   icon: <Gear size={25} />,
  //   to: "/setting",
  // },
];

const ITEM_TEACHER_SIDEBAR = [
  {
    title: "Trang Chủ",
    icon: <House size={25} />,
    to: configRouter.dashboardTeacher,
  },
  {
    title: "Quản lý học viên",
    icon: <UsersThree size={25} />,
    to: configRouter.liststudent,
  },
  {
    title: "Quản lý doanh thu",
    icon: <Wallet size={25} />,
    to: configRouter.payout,
  },
  {
    title: "Khóa học",
    icon: <BookOpenText size={25} />,
    to: configRouter.courseMyTeacher,
  },
  {
    title: "Tạo khóa học",
    icon: <FolderPlus size={25} />,
    to: configRouter.createCourse,
  },
];

const ITEM_ADMIN_SIDEBAR = [
  {
    title: "Trang Chủ",
    icon: <House size={25} />,
    to: configRouter.dashboardAdmin,
  },
  {
    title: "Quản lý học viên",
    icon: <UsersThree size={25} />,
    to: configRouter.adminListStudent,
  },
  {
    title: "Quản lý Khóa Học",
    icon: <BookOpenText size={25} />,
    to: configRouter.courseManager,
  },
  {
    title: "Khiếu nại",
    icon: <MaskSad size={25} />,
    to: configRouter.managerComplaintCourse,
  },
];
const ItemSidebar = (props: {
  title: string;
  icon: React.ReactElement;
  to: string;
  isOpen: boolean;
}) => {
  const location = useLocation();
  return (
    <Link
      to={props.to}
      className={`w-full px-2.5 py-2 ${
        location.pathname === props.to
          ? "bg-blue-400 text-white"
          : "text-gray-500 hover:bg-gray-100"
      } rounded-lg select-none `}
    >
      <div
        className={`w-[250px]  flex items-center justify-start space-x-5 flex-nowrap overflow-hidden`}
      >
        {props.icon}
        <p
          className={`text-base font-medium font-sans flex items-center justify-center `}
        >
          {props.title}
        </p>
      </div>
    </Link>
  );
};
const Sidebar = React.forwardRef<Ref, Props>(
  (props, ref): React.ReactElement => {
    const location = useLocation();
    return (
      <div className="relative xl:w-[60px] h-screen w-[0px] z-9999">
        <div
          className={`absolute z-9999 ${
            props.isOpen ? "w-[250px]" : "w-[60px]"
          } h-full overflow-auto shadow-sm z-50 bg-white top-0 left-0 xl:translate-x-0 ${
            props.isOpen ? "-translate-x-0" : "-translate-x-[250px]"
          } transition-all delay-200 flex flex-col px-2 py-4 gap-3`}
          ref={ref}
        >
          {/* logo */}
          <div className="relative w-full flex items-center justify-center mb-10">
            <img src={assets.images.logoMain} alt="" className="h-[40px]" />
            <div className="absolute left-3">
              <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200">
                <X
                  size={25}
                  className="text-gray-500"
                  onClick={() => props.setIsOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>
          {/* item  */}
          {location.pathname.split("/")[1] === "teacher" &&
            ITEM_TEACHER_SIDEBAR.map((item, index) => {
              return (
                <ItemSidebar
                  isOpen={props.isOpen}
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                />
              );
            })}
          {location.pathname.split("/")[1] === "admin" &&
            ITEM_ADMIN_SIDEBAR.map((item, index) => {
              return (
                <ItemSidebar
                  isOpen={props.isOpen}
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                />
              );
            })}
          {location.pathname.split("/")[1] !== "teacher" &&
            location.pathname.split("/")[1] !== "admin" &&
            ITEM_SIDEBAR.map((item, index) => {
              return (
                <ItemSidebar
                  isOpen={props.isOpen}
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

export default Sidebar;
