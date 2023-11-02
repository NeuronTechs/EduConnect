import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { adminRoutes, publicRoutes } from "./router/Router";
import { AppDispatch, store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { configRouter } from "./configs/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  setupInterceptor(store, dispatch);
  let routerCheck;
  const useCurrentUser = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.authSlice.currentUser
  );
  routerCheck = publicRoutes;
  if (useCurrentUser?.role === "admin") {
    routerCheck = adminRoutes;
  }
  if (useCurrentUser?.role === "user") {
    routerCheck = publicRoutes;
  }
  if (useCurrentUser?.role === "teacher") {
    routerCheck = publicRoutes;
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          {routerCheck.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
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
                  <Layout>
                    {/* <Page /> */}
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
                  </Layout>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {/* <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes> */}
      </div>
    </Router>
  );
}

export default App;
