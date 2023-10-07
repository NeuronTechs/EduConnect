import BlankLayout from "../layout/BlankLayout/blankLayout";
import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import Checkout from "../pages/Checkout";
import CoursesCart from "../pages/CoursesCart";
import CategoryFilter from "../pages/CategoryFilter";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OverviewCourse from "../pages/OverviewCourse";
import RegisterInformation from "../pages/RegisterInformation";
import Search from "../pages/Search";
import SignUp from "../pages/SignUp";
import Dashboard from "@/pages/Dashboard";
import Payout from "@/pages/Payout";
import ListStudent from "@/pages/ListStudent";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/login", component: Login, layout: BlankLayout },
  { path: "/signUp", component: SignUp, layout: BlankLayout },
  { path: "/login", component: Home, layout: null },
  {
    path: "/register-information",
    component: RegisterInformation,
    layout: BlankLayout,
  },
  {
    path: "/course/:id",
    component: OverviewCourse,
    layout: DefaultLayout,
  },
  {
    path: "/coursescart",
    component: CoursesCart,
    layout: BlankLayout,
  },
  {
    path: "/checkout",
    component: Checkout,
    layout: BlankLayout,
  },
  {
    path: "/category-filter",
    component: CategoryFilter,
    layout: DefaultLayout,
  },
  {
    path: "/search",
    component: Search,
    layout: DefaultLayout,
  },
  {
    path: "/teacher/dashboard",
    component: Dashboard,
    layout: DefaultLayout,
  },
  {
    path: "/teacher/payout",
    component: Payout,
    layout: DefaultLayout,
  },
  {
    path: "/teacher/liststudent",
    component: ListStudent,
    layout: DefaultLayout,
  },
];
const privateRoutes = [{ path: "/", component: Home }];
export { publicRoutes, privateRoutes };
