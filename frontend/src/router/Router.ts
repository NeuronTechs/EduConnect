// layout
import BlankLayout from "../layout/BlankLayout/blankLayout";
import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import { configRouter } from "@/configs/router";
import { FC, lazy } from "react";
// pages

interface LayoutProps {
  children?: React.ReactNode;
}
export interface IRouter {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layout: FC<LayoutProps>;
}

const publicRoutes: IRouter[] = [
  {
    path: configRouter.login,
    component: lazy(() => import("../pages/Login")),
    layout: BlankLayout,
  },
  {
    path: configRouter.signUp,
    component: lazy(() => import("../pages/SignUp")),
    layout: BlankLayout,
  },
];
const privateRoutes: IRouter[] = [
  {
    path: configRouter.registerInformation,
    component: lazy(() => import("../pages/RegisterInformation")),
    layout: BlankLayout,
  },
  {
    path: configRouter.home,
    component: lazy(() => import("../pages/Home")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.categoryFilter,
    component: lazy(() => import("../pages/CategoryFilter")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.teacherCategory,
    component: lazy(() => import("@/pages/TeacherCategory")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.search,
    component: lazy(() => import("../pages/Search")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.chat,
    component: lazy(() => import("@/pages/Chat")),
    layout: DefaultLayout,
  },

  {
    path: configRouter.course,
    component: lazy(() => import("../pages/OverviewCourse")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.learning,
    component: lazy(() => import("../pages/Course")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.myCourse,
    component: lazy(() => import("../pages/MyCourse/MyCourse")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.profile,
    component: lazy(() => import("../pages/Profile")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.coursesCart,
    component: lazy(() => import("../pages/CoursesCart")),
    layout: BlankLayout,
  },
  {
    path: configRouter.checkout,
    component: lazy(() => import("../pages/Checkout")),
    layout: BlankLayout,
  },
];
const adminRoutes: IRouter[] = [
  {
    path: configRouter.dashboardAdmin,
    component: lazy(() => import("@/pages/DashboardAdmin")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.reportSale,
    component: lazy(() => import("@/pages/ReportSale")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.complaintCourseDetail,
    component: lazy(() => import("@/pages/ComplaintCourseDetail")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.managerComplaintCourse,
    component: lazy(() => import("@/pages/ManagerComplaintCourse")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.reportMember,
    component: lazy(() => import("@/pages/ReportMember")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.adminListStudent,
    component: lazy(() => import("@/pages/Admin/StudentList")),
    layout: DefaultLayout,
  },
];
const teacherRoutes: IRouter[] = [
  {
    path: configRouter.dashboardTeacher,
    component: lazy(() => import("@/pages/DashboardTeacher")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.courseMyTeacher,
    component: lazy(() => import("@/pages/CourseMyTeacher")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.createCourse,
    component: lazy(() => import("@/pages/CreateCourseTeacher")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.liststudent,
    component: lazy(() => import("@/pages/ListStudent")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.payout,
    component: lazy(() => import("@/pages/Payout")),
    layout: DefaultLayout,
  },
  {
    path: configRouter.managerComplaintCourse,
    component: ManagerComplaintCourse,
    layout: DefaultLayout,
  },
];
export { publicRoutes, privateRoutes, adminRoutes, teacherRoutes };
