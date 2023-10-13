import TeacherCategory from "@/pages/TeacherCategory";
import BlankLayout from "../layout/BlankLayout/blankLayout";
import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import Checkout from "../pages/Checkout";
import CoursesCart from "../pages/CoursesCart";
import CategoryFilter from "../pages/CategoryFilter";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyCourse from "../pages/MyCourse";
import OverviewCourse from "../pages/OverviewCourse";
import Profile from "../pages/Profile";
import RegisterInformation from "../pages/RegisterInformation";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import { FC } from "react";
import Chat from "@/pages/Chat";
import { configRouter } from "@/configs/router";
import Payout from "@/pages/Payout";
import ListStudent from "@/pages/ListStudent";
import Course from "@/pages/Course";
import DashboardTeacher from "@/pages/DashboardTeacher";
import DashboardAdmin from "@/pages/DashboardAdmin";
import ReportSale from "@/pages/ReportSale";
import ReportMember from "@/pages/ReportMember";
interface IRouter {
  path: string;
  component: FC;
  layout: FC<never>;
}
const publicRoutes: IRouter[] = [
  { path: configRouter.login, component: Login, layout: BlankLayout },
  { path: configRouter.signUp, component: SignUp, layout: BlankLayout },
  { path: configRouter.home, component: Home, layout: DefaultLayout },
  {
    path: configRouter.registerInformation,
    component: RegisterInformation,
    layout: BlankLayout,
  },
  {
    path: configRouter.course,
    component: OverviewCourse,
    layout: DefaultLayout,
  },
  {
    path: configRouter.learning,
    component: Course,
    layout: DefaultLayout,
  },
  { path: configRouter.myCourse, component: MyCourse, layout: DefaultLayout },
  { path: configRouter.profile, component: Profile, layout: DefaultLayout },
  {
    path: configRouter.coursesCart,
    component: CoursesCart,
    layout: BlankLayout,
  },
  {
    path: configRouter.checkout,
    component: Checkout,
    layout: BlankLayout,
  },
  {
    path: configRouter.categoryFilter,
    component: CategoryFilter,
    layout: DefaultLayout,
  },
  {
    path: configRouter.search,
    component: Search,
    layout: DefaultLayout,
  },
  {
    path: configRouter.teacherCategory,
    component: TeacherCategory,
    layout: DefaultLayout,
  },
  {
    path: configRouter.chat,
    component: Chat,
    layout: DefaultLayout,
  },
  {
    path: configRouter.dashboardTeacher,
    component: DashboardTeacher,
    layout: DefaultLayout,
  },
  {
    path: configRouter.payout,
    component: Payout,
    layout: DefaultLayout,
  },
  {
    path: configRouter.liststudent,
    component: ListStudent,
    layout: DefaultLayout,
  },
  {
    path: configRouter.dashboardAdmin,
    component: DashboardAdmin,
    layout: DefaultLayout,
  },
  {
    path: configRouter.reportSale,
    component: ReportSale,
    layout: DefaultLayout,
  },
  {
    path: configRouter.reportMember,
    component: ReportMember,
    layout: DefaultLayout,
  },
];
const privateRoutes = [{ path: "/", component: Home }];
export { publicRoutes, privateRoutes };
