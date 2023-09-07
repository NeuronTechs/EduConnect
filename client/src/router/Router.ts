import BlankLayout from "../layout/BlankLayout/blankLayout";
import DefaultLayout from "../layout/DefaultLayout/defaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/login", component: Login, layout: BlankLayout },
  { path: "/register", component: Home, layout: BlankLayout },
];
const privateRoutes = [{ path: "/", component: Home }];
export { publicRoutes, privateRoutes };
