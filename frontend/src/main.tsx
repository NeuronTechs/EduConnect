import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import CreateCourseProvider from "./context/CreateCourseContext";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
        <CreateCourseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CreateCourseProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
