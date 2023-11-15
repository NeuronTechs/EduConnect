import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import {
  IRouter,
  adminRoutes,
  privateRoutes,
  publicRoutes,
  teacherRoutes,
} from "./router/Router";
import { AppDispatch, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { configRouter } from "./configs/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { FC } from "react";
import RequireAuth from "./router/RequireAuth";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";
interface LayoutProps {
  children?: React.ReactNode;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const location = useLocation();
  setupInterceptor(store, dispatch);
  let routerCheck: IRouter[];
  const useCurrentUser = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.authSlice.currentUser
  );
  routerCheck = publicRoutes;
  if (useCurrentUser?.role === "0") {
    routerCheck = [...privateRoutes];
  } else if (useCurrentUser?.role === "1") {
    routerCheck = [...privateRoutes, ...teacherRoutes];
  } else if (useCurrentUser?.role === "2") {
    routerCheck = [...privateRoutes, ...adminRoutes];
  } else {
    routerCheck = [...publicRoutes, ...privateRoutes];
  }
  return (
    // <Router>
    <div className="App">
      <AnimatePresence>
        <Routes>
          {routerCheck.map((route, index) => {
            const Page = route.component;
            let Layout: FC<LayoutProps> = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else {
              Layout = DefaultLayout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <RequireAuth
                      requiredRole={useCurrentUser?.role}
                      user={useCurrentUser}
                    >
                      <Layout>
                        <React.Suspense fallback={<LoadingPage />}>
                          {/* // If the route is checkout, render the Elements
                        component, which provides access to Stripe Elements. //
                        Otherwise, render the Page component. */}
                          {route.path === configRouter.checkout ? (
                            <Elements
                              stripe={loadStripe(
                                "pk_test_51O5eyBAaHjtOXDe9Tpr7lvWGeKnA940mQgS8jWHAfM2yfSM8uVDxC6H9hL58KGsAzQCPy6ZtKXLy88tfjhOqulZB00QzKSUUQf"
                              )}
                            >
                              <Page />
                            </Elements>
                          ) : (
                            <Page />
                          )}
                        </React.Suspense>
                      </Layout>
                    </RequireAuth>
                  </>
                }
              />
            );
          })}
        </Routes>
      </AnimatePresence>
    </div>
    // </Router>
  );
}

export default App;
