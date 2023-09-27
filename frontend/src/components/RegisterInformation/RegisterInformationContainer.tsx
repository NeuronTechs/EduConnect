import React from "react";
import assets from "../../assets";
import StepperContainer from "./StepperContainer";

const RegisterInformationContainer = (): React.ReactElement => {
  return (
    <div className="w-screen h-screen grid grid-cols-12 bg-white overflow-x-hidden overflow-y-auto">
      <div className="h-full col-span-5 flex-col justify-center items-center py-2">
        <div className="logo flex gap-2 items-center justify-center">
          <img className="" src={assets.images.logoMain}></img>
          <h3 className="text-black font-semibold text-2xl">Educonnect</h3>
        </div>
        <div className="w-full">
          <StepperContainer />
        </div>
      </div>
      <div className="h-full col-span-7 relative flex items-center justify-center select-none">
        <img
          src={assets.images.backgroundLogin}
          alt="gb"
          className="w-full h-full object-cover"
        />
        <div className="h-[70%] w-[70%] absolute bg-[#FFFFFF66] backdrop-blur-[24px] flex items-center justify-start">
          <div className="block p-5 w-[70%] space-y-5">
            <div className="space-y-3">
              <h5 className="text-white text-5xl font-semibold font-sans">
                Nền tảng học tập cho tất cả mọi người
              </h5>
              <p className="text-black text-4xl font-semibold font-sans">
                Giáo Dục Trực Tuyến
              </p>
            </div>

            <p className="text-black text-xl font-light font-sans">
              Bạn sẽ không bao giờ biết tất cả mọi thứ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInformationContainer;
