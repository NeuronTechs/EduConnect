import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout/defaultLayout";
import { setupInterceptor } from "./utils/interceptor";
import { publicRoutes } from "./router/Router";
function App() {
  setupInterceptor();
  const routerCheck = publicRoutes;
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
                    <Page />
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
