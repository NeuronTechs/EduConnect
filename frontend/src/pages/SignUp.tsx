import { Books } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import assets from "../assets";
const SignUp = () => {
  return (
    <div className="flex h-[100vh]">
      <div className="flex-initial w-[794px] flex flex-col ">
        <div className="flex justify-center mt-5  mb-2 text-2xl space-x-5">
          <Books size={32} /> <h1>EduConnect</h1>
        </div>
        <div className="flex flex-col items-center w-full mt-20">
          <h1 className="text-base">
            <strong> Sign up and start learning </strong>
          </h1>
          <div className="text-sm">
            {/* email  */}
            <div className="mb-2">
              <h6>Username</h6>
              <input
                type="text"
                className="border-[1px] border-slate-600 rounded-md w-full h-[35px] pl-3"
              />
            </div>
            <div className="mb-2">
              <h6>Email</h6>
              <input
                type="text"
                className="border-[1px] border-slate-600 rounded-md w-full h-[35px] pl-3"
              />
            </div>
            {/* phone and gender  */}

            <div className="mb-2 mt-2">
              <h6>Password</h6>
              <input
                type="text"
                className="border-[1px] border-slate-600 rounded-md w-full h-[35px] pl-3"
              />
            </div>
            {/* address  */}
            <div className="mb-2 mt-2">
              <h6>Re-Password</h6>
              <input
                type="text"
                className="border-[1px] border-slate-600 rounded-md w-full h-[35px] pl-3"
              />
            </div>
            {/* submit  */}
            <div className="flex items-center justify-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-gradient-to-r mt-3 from-blue-500 to-purple-500"
                id="RememberCheck"
              />
              <label htmlFor="" className="text-xs ml-8 mt-3">
                By signing up, you agree to our Terms of Use and Privacy Policy.
              </label>
            </div>
            <div className="flex space-x-5 mt-20 text-xs">
              <button className="bg-gradient-to-r from-orange-500 to-blue-500 w-[195px] h-10 text-white rounded-lg">
                <strong> SignUp</strong>
              </button>
              <Link to="/login">
                <button className=" w-[195px] h-10 border-2 border-slate-600 rounded-lg">
                  <strong> Back to Login</strong>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-initial  w-full flex items-center "
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
    </div>
  );
};

export default SignUp;
