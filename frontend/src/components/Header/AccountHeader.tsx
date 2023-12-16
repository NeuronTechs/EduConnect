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
import { User } from "@/type";
import ImageWithError from "../ImageWithError";
import assets from "@/assets";
import { clearState } from "@/features/course/courseSlice";

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
    await dispatch(clearState());
    nav(configRouter.login);
  };

  const handleRedirectMyCourse = () => {
    if (currentUser?.role === "1") {
      nav(configRouter.courseMyTeacher);
    } else {
      nav(configRouter.myCourse);
    }
  };

  const handleRedirectTeacher = () => {
    nav(configRouter.dashboardTeacher);
  };

  const handleRedirectInfo = () => {
    nav(configRouter.profile);
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
                    ? currentUser.avatar instanceof FileList
                      ? URL.createObjectURL(currentUser.avatar[0])
                      : currentUser.avatar[0]
                    : assets.images.noAvatar
                }
                fallbackSrc={assets.images.noAvatar}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
            </div>
          </MenuHandler>
          <MenuList>
            {(currentUser?.role === "1" || currentUser?.role === "0") && (
              <MenuItem onClick={handleRedirectMyCourse}>
                Khoá học của tôi
              </MenuItem>
            )}
            {(currentUser?.role === "1" || currentUser?.role === "0") && (
              <MenuItem onClick={handleRedirectInfo}>
                Thông tin cá nhân
              </MenuItem>
            )}
            {currentUser?.role === "1" && (
              <MenuItem onClick={handleRedirectTeacher}>
                Trang giáo viên
              </MenuItem>
            )}
            {(currentUser?.role === "1" || currentUser?.role === "0") && (
              <hr className="my-3" />
            )}
            <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AccountHeader;
