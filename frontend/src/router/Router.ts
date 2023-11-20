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
  role: string | null;
}

const publicRoutes: IRouter[] = [
  {
    path: configRouter.login,
    component: lazy(() => import("../pages/Login")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.signUp,
    component: lazy(() => import("../pages/SignUp")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.forgetPassword,
    component: lazy(() => import("../pages/ForgetPassword")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.resetPassword,
    component: lazy(() => import("../pages/ResetPassword")),
    layout: BlankLayout,
    role: null,
  },
  {
    path: configRouter.registerInformation,
    component: lazy(() => import("../pages/RegisterInformation")),
    layout: BlankLayout,
    role: "null",
  },
  // user
  {
    path: configRouter.course,
    component: lazy(() => import("../pages/OverviewCourse")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.learning,
    component: lazy(() => import("../pages/Course")),
    layout: BlankLayout,
    role: "0",
  },

  {
    path: configRouter.home,
    component: lazy(() => import("../pages/Home")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.categoryFilter,
    component: lazy(() => import("../pages/CategoryFilter")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.teacherCategory,
    component: lazy(() => import("@/pages/TeacherCategory")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.search,
    component: lazy(() => import("../pages/Search")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.chat,
    component: lazy(() => import("@/pages/Chat")),
    layout: DefaultLayout,
    role: "0",
  },

  {
    path: configRouter.course,
    component: lazy(() => import("../pages/OverviewCourse")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.learning,
    component: lazy(() => import("../pages/Course")),
    layout: BlankLayout,
    role: "0",
  },
  {
    path: configRouter.myCourse,
    component: lazy(() => import("../pages/MyCourse/MyCourse")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.allTask,
    component: lazy(() => import("../pages/MyCourse/AllTask")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.profile,
    component: lazy(() => import("../pages/Profile")),
    layout: DefaultLayout,
    role: "0",
  },
  {
    path: configRouter.coursesCart,
    component: lazy(() => import("../pages/CoursesCart")),
    layout: BlankLayout,
    role: "0",
  },
  {
    path: configRouter.checkout,
    component: lazy(() => import("../pages/Checkout")),
    layout: BlankLayout,
    role: "0",
  },
  // user

  {
    path: configRouter.dashboardAdmin,
    component: lazy(() => import("@/pages/DashboardAdmin")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.reportSale,
    component: lazy(() => import("@/pages/ReportSale")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.complaintCourseDetail,
    component: lazy(() => import("@/pages/ComplaintCourseDetail")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.managerComplaintCourse,
    component: lazy(() => import("@/pages/ManagerComplaintCourse")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.reportMember,
    component: lazy(() => import("@/pages/ReportMember")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.adminListStudent,
    component: lazy(() => import("@/pages/Admin/StudentList")),
    layout: DefaultLayout,
    role: "2",
  },
  {
    path: configRouter.managerComplaintCourse,
    component: lazy(() => import("@/pages/ManagerComplaintCourse")),
    layout: DefaultLayout,
    role: "2",
  },
  // admin
  {
    path: configRouter.dashboardTeacher,
    component: lazy(() => import("@/pages/DashboardTeacher")),
    layout: DefaultLayout,
    role: "1",
  },
  {
    path: configRouter.courseMyTeacher,
    component: lazy(() => import("@/pages/CourseMyTeacher")),
    layout: DefaultLayout,
    role: "1",
  },
  {
    path: configRouter.createCourse,
    component: lazy(() => import("@/pages/CreateCourseTitle")),
    layout: BlankLayout,
    role: "1",
  },
  {
    path: configRouter.manageCourse,
    component: lazy(() => import("@/pages/CreateCourseTeacher")),
    layout: BlankLayout,
    role: "1",
  },
  {
    path: configRouter.liststudent,
    component: lazy(() => import("@/pages/ListStudent")),
    layout: DefaultLayout,
    role: "1",
  },
  {
    path: configRouter.payout,
    component: lazy(() => import("@/pages/Payout")),
    layout: DefaultLayout,
    role: "1",
  },
];
export { publicRoutes };
