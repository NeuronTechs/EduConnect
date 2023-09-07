import Home from "../pages/Home";

const publicRoutes = [
  { path: "/login", component: Home, layout: null },
  { path: "/register", component: Home, layout: null },
  { path: "/register-information", component: Home, layout: null },
];
const privateRoutes = [{ path: "/", component: Home }];
export { publicRoutes, privateRoutes };
