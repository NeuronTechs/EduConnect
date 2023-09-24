import React, { useState } from "react";
import bg from "../../public/bgLogin.png";
import {
  Books,
  FacebookLogo,
  GoogleLogo,
  HandWaving,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex h-[100vh]">
      <div
        className="flex-initial  w-full flex items-center "
        style={{
          backgroundImage: `url(${bg})`,
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
      <div className="flex-initial w-[794px] flex flex-col ml-[7rem] ">
        <div className="flex mt-10 mb-10 text-2xl space-x-5">
          <Books size={32} /> <h1>EduConnect</h1>
        </div>

        <div className="mb-12">
          <div className="flex">
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
              className="border-2 border-slate-500 rounded-md w-[350px] h-[40px] pl-3"
            />
          </div>

          <div>
            <h6>Password</h6>
            <input
              type="password"
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
              <label htmlFor="RememberCheck">Remember me</label>
            </div>
            <h6 className="underline">Forgot password?</h6>
          </div>

          <div className="flex space-x-5 mt-5">
            <button className="bg-gradient-to-r from-orange-500 to-blue-500 w-[170px] h-10 text-white rounded-lg">
              <strong> Login</strong>
            </button>
            <Link to="/signUp">
              <button className=" w-[170px] h-10 border-2 border-slate-950 rounded-lg">
                <strong> Sign Up</strong>
              </button>
            </Link>
          </div>

          <div className="flex flex-col w-9/12 items-center mt-10">
            <h6>Or, Login With</h6>
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
        </div>
      </div>
    </div>
  );
};

export default Login;