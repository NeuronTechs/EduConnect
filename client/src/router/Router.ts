import BlankLayout from "../layout/BlankLayout/blankLayout";
import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/login", component: Login, layout: BlankLayout },
  { path: "/signUp", component: SignUp, layout: BlankLayout },
];
const privateRoutes = [{ path: "/", component: Home }];
export { publicRoutes, privateRoutes };
