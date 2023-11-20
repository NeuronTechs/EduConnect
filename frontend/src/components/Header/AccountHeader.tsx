import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { configRouter } from "@/configs/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutThunk } from "@/features/auth/authSlice";
import { resetStoreCart } from "@/features/cart/cartSlice";
import { resetStoreCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";
import { resetCheckOutCart } from "@/features/checkoutCourse/checkoutSlice";
import { SliceState } from "@/types/type";

const AccountHeader = () => {
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );

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
          <h5 className="text-sm font-medium">
            {currentUser.full_name
              ? currentUser.full_name
              : "chưa cập nhật thông tin"}
          </h5>
          <p className="text-xs font-normal text-gray-600">
            {currentUser.username}
          </p>
        </div>
        <Menu>
          <MenuHandler>
            <div className="avatar-account cursor-pointer">
              <ImageWithError
                src={
                  currentUser.avatar
                    ? currentUser.avatar
                    : assets.images.noAvatar
                }
                fallbackSrc={assets.images.noAvatar}
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
