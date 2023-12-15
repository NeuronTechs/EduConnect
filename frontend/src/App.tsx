import "./App.css";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { publicRoutes } from "./router/Router";
import { AppDispatch, RootState, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { configRouter } from "./configs/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { FC } from "react";
import RequireAuth from "./router/RequireAuth";
import { AnimatePresence } from "framer-motion";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { User } from "./type";
interface LayoutProps {
  children?: React.ReactNode;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const location = useLocation();
  setupInterceptor(store, dispatch);
  const routerCheck = publicRoutes;
  const useCurrentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );

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
                      requiredRole={route.role}
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
