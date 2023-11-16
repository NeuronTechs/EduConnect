import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { configRouter } from "@/configs/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutThunk } from "@/features/auth/authSlice";
import { resetStoreCart } from "@/features/cart/cartSlice";
import { resetStoreCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";
import { resetCheckOutCart } from "@/features/checkoutCourse/checkoutSlice";

const AccountHeader = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async () => {
    await dispatch(logoutThunk());
    await dispatch(resetStoreCart());
    await dispatch(resetStoreCourseOverview());
    await dispatch(resetCheckOutCart());
    nav(configRouter.login);
  };
  const handleRedirectTeacher = () => {
    nav(configRouter.dashboardTeacher);
  };
  return (
    <div>
      <div className="flex items-center justify-center px-3 py-2 gap-3">
        <div className="account-info flex flex-col justify-center items-end">
          <h5 className="text-sm font-medium">Nguyen Van Tu</h5>
          <p className="text-xs font-normal text-gray-600">HCMUTE</p>
        </div>
        <Menu>
          <MenuHandler>
            <div className="avatar-account cursor-pointer">
              <img
                src={assets.images.avatar1}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
            </div>
          </MenuHandler>
          <MenuList>
            <MenuItem>Khoá học của tôi</MenuItem>
            <MenuItem>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleRedirectTeacher}>Trang giáo viên</MenuItem>
            <hr className="my-3" />
            <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AccountHeader;
