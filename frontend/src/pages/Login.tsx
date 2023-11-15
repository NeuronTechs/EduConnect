import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Auth } from "../type";
import { AppDispatch } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Books,
  FacebookLogo,
  GoogleLogo,
  HandWaving,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import assets from "@/assets";
import { configRouter } from "@/configs/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const notify = () => {
    toast.error("Tài khoản hoặc mật khẩu không chính xác", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const loginHandler = async () => {
    const auth: Auth = { username: username, password: password };
    const loginSuccess = await dispatch(login(auth));

    if (loginSuccess.type === "auth/login/fulfilled") {
      navigate("/");
    } else {
      notify();
    }
  };

  const handleRedirectForgetPassword = () => {
    navigate(configRouter.forgetPassword);
  };
  return (
    <div className="flex h-[100vh]">
      <div
        className="flex-initial  w-full hidden xl:flex items-center "
        style={{
          backgroundImage: `url(${assets.images.backgroundLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-7/12 h-3/6 bg-white opacity-50 backdrop-filter backdrop-blur-sm m-auto ">
          <div className="ml-10 mt-20 w-6/12 text-2xl">
            <h1 className=" text-black">
              <strong> Digital platform for distance</strong>{" "}
            </h1>
            <h1 className="text-gray-600">
              <strong> Learning.</strong>{" "}
            </h1>
            <h1 className="text-base">
              You will never know everything. But you will know more.
            </h1>
          </div>
        </div>
      </div>
      <div className="flex-initial w-[794px] flex flex-col  ml-[7rem] items-center  xl:items-start">
        <div className="flex mt-10 mb-10 text-2xl space-x-5 ">
          <Books size={32} /> <h1>EduConnect</h1>
        </div>

        <div className="mb-12">
          <div className="flex justify-center xl:justify-start">
            <h1 className="text-2xl">
              <strong> Hey, Hello</strong>
            </h1>
            <HandWaving size={32} />
          </div>
          <p className="test-base">Enter your email and password to login.</p>
        </div>

        <div>
          <div className="mb-5">
            <h6>Email</h6>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border-2 border-slate-500 rounded-md w-[350px] h-[40px] pl-3"
            />
          </div>
          <div>
            <h6>Mật khẩu</h6>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-2 border-slate-500 rounded-md w-[350px] h-[40px] pl-3 pr-3"
            />
          </div>
          <div className="mt-5 flex w-[350px] items-center justify-between">
            <div className="space-x-3 flex  items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500"
                id="RememberCheck"
              />
              <label htmlFor="RememberCheck">Ghi nhớ đăng nhập</label>
            </div>
            <h6
              className="underline cursor-pointer"
              onClick={handleRedirectForgetPassword}
            >
              Quên mật khẩu?
            </h6>
          </div>
          <div className="flex space-x-5 mt-5">
            <button
              onClick={loginHandler}
              className="bg-gradient-to-r from-orange-500 to-blue-500 w-[170px] h-10 text-white rounded-lg"
            >
              <strong> Đăng nhập</strong>
            </button>
            <Link to="/signUp">
              <button className=" w-[170px] h-10 border-2 border-gray-500  rounded-lg shadow-xl">
                <strong> Đăng ký</strong>
              </button>
            </Link>
          </div>
          <div className="flex flex-col w-9/12 items-center mt-10 ml-5">
            <h6>Hoặc, Đăng nhập với</h6>
            <div className="flex space-x-3 mt-2">
              <button className="button-logo">
                <FacebookLogo size={32} />
                Facebook
              </button>
              <button className=" button-logo">
                <LinkedinLogo size={32} />
                Linked
              </button>
              <button className="button-logo">
                <GoogleLogo size={32} />
                Google
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
