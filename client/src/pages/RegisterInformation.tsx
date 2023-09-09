import React from "react";

import { Radio, Step, Stepper, Typography } from "@material-tailwind/react";

import assets from "../assets";
import { UseFormRegister, useForm } from "react-hook-form";

const RegisterInformation = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-12 bg-white">
      <div className="h-full col-span-5 flex-col justify-center items-center py-2">
        <div className="logo flex gap-2 items-center justify-center">
          <img className="" src={assets.images.logoMain}></img>
          <h3 className="text-black font-semibold text-2xl">Educonnect</h3>
        </div>
        <div className="w-full">
          <StepperWithContent />
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

export default RegisterInformation;

type propsStepperMain = {
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
};
const StepperMain = (props: propsStepperMain) => {
  return (
    <Stepper
      className="mb-[50px]"
      activeStep={props.activeStep}
      isLastStep={(value) => props.setIsLastStep(value)}
      isFirstStep={(value) => props.setIsFirstStep(value)}
      activeLineClassName="bg-blue-300"
      lineClassName="bg-gray-300"
    >
      <Step
        className="h-8 w-8"
        onClick={() => props.setActiveStep(0)}
        activeClassName="ring-0 !bg-blue-300 text-white"
        completedClassName="!bg-blue-300 text-white"
      >
        {/* <UserCircle size={32} /> */}
        <p className="p-1">1</p>
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            variant="paragraph"
            color={props.activeStep === 0 ? "blue-gray" : "gray"}
          >
            Thông tin
          </Typography>
        </div>
      </Step>
      <Step
        className="h-8 w-8"
        onClick={() => props.setActiveStep(1)}
        activeClassName="ring-0 !bg-blue-300 text-white"
        completedClassName="!bg-blue-300 text-white"
      >
        {/* <CogIcon className="h-5 w-5" /> */}
        <p className="p-1">2</p>
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            variant="paragraph"
            color={props.activeStep === 1 ? "blue-gray" : "gray"}
          >
            công việc
          </Typography>
        </div>
      </Step>
      <Step
        className="h-8 w-8"
        onClick={() => props.setActiveStep(2)}
        activeClassName="ring-0 !bg-blue-300 text-white"
        completedClassName="!bg-blue-300 text-white"
      >
        {/* <BuildingLibraryIcon className="h-5 w-5" /> */}
        <p className="p-1">3</p>
        <div className="absolute -bottom-[2rem] w-max text-center">
          <Typography
            variant="paragraph"
            color={props.activeStep === 2 ? "blue-gray" : "gray"}
          >
            Hoàn thành
          </Typography>
        </div>
      </Step>
    </Stepper>
  );
};
type propsContentStepper = {
  activeStep: number;
  register: UseFormRegister<IFormInput>;
};
const ContentStepper = (props: propsContentStepper): React.ReactElement => {
  return (
    <div className="w-full">
      {props.activeStep === 0 && (
        <div className="content w-full flex flex-col items-center justify-center space-y-10">
          <div className="logo flex flex-col items-center justify-center space-y-1">
            <div className="w-[80px] h-[80px] overflow-hidden">
              <img
                src={assets.images.avatar1}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-gray-200 px-3 py-2 rounded-md">
              Tải Hình ảnh
            </button>
          </div>
          <div className="form w-full">
            <div className="grid grid-cols-2 gap-3 gap-y-5">
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm ">
                  Họ và Tên Đệm
                </Typography>
                <input
                  {...props.register("firstName")}
                  type="text"
                  name="firstName "
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Họ và Tên Đệm"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Tên
                </Typography>
                <input
                  {...props.register("lastName")}
                  type="text"
                  name="lastName"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Tên"
                />
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Email
                </Typography>
                <input
                  {...props.register("email")}
                  type="text"
                  name="email"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="robert.langster@gmail.com"
                />
              </div>
              <div className=" flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Số điện thoại
                </Typography>
                <input
                  {...props.register("phone")}
                  type="number"
                  name="phone"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  // placeholder="robert.langster@gmail.com"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Giới tính
                </Typography>
                <div className="flex gap-10">
                  <Radio
                    {...props.register("gender")}
                    value={"male"}
                    name="gender"
                    label="Nam"
                    defaultChecked
                    crossOrigin={undefined}
                    color="blue"
                  />
                  <Radio
                    {...props.register("gender")}
                    value={"female"}
                    name="gender"
                    label="Nữ"
                    crossOrigin={undefined}
                    color="blue"
                  />
                  <Radio
                    {...props.register("gender")}
                    value={"other"}
                    name="gender"
                    label="khác"
                    crossOrigin={undefined}
                    color="blue"
                  />
                </div>
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Ngày Sinh
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  {...props.register("birthday")}
                  type="date"
                  name="birthday"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="robert.langster@gmail.com"
                />
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  ĐỊa Chỉ
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  {...props.register("address")}
                  type="text"
                  name="address"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ĐỊa Chỉ"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {props.activeStep === 1 && (
        <div className="content w-full flex flex-col items-center justify-center space-y-10">
          <div className="form w-full">
            <div className="grid grid-cols-2 gap-3 gap-y-5">
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Chức vụ
                </Typography>
                <div className="flex gap-10">
                  <Radio
                    name="Position"
                    label="Học sinh, Sinh Viên"
                    defaultChecked
                    crossOrigin={undefined}
                    color="blue"
                  />
                  <Radio
                    name="Position"
                    label="Giáo Viên"
                    crossOrigin={undefined}
                    color="blue"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Tình độ học vấn
                </Typography>
                <input
                  type="text"
                  name="Tình độ học vấn"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Tình độ học vấn"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Ngành học
                </Typography>
                <input
                  type="text"
                  name="Ngành học"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Ngành học"
                />
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Trường Học
                </Typography>
                <input
                  type="text"
                  name="schoole"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Trường"
                />
              </div>

              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Khoá Học
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  type="date"
                  name="date"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="robert.langster@gmail.com"
                />
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  ĐỊa Chỉ Trường
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  type="text"
                  name="address"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ĐỊa Chỉ"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {props.activeStep === 2 && (
        <div className="content w-full flex flex-col items-center justify-center space-y-10 mb-20">
          <img src={assets.images.successInfo} alt="" className="" />
          <h5 className="text-lg font-semibold text-black">
            Nhập Thông Tin thành công
          </h5>
          <p className="w-[70%] text-center">
            Vui lòng xem lại tất cả thông tin bạn đã nhập trước đó ở các bước
            trước và nếu tất cả đều ổn.
          </p>
        </div>
      )}
    </div>
  );
};

enum enumGender {
  female = "female",
  male = "male",
  other = "other",
}
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  gender: enumGender;
  birthday: Date;
  address: string;
}
export function StepperWithContent() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLastStep, setIsLastStep] = React.useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = React.useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  console.log(watch());
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const handleUpload = () => {};

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <>
      <div className="w-full px-16 py-4">
        <StepperMain
          activeStep={activeStep}
          setIsLastStep={setIsLastStep}
          setIsFirstStep={setIsFirstStep}
          setActiveStep={setActiveStep}
        />
        <ContentStepper activeStep={activeStep} register={register} />
        <div className="mt-5 flex justify-between gap-5">
          <button
            onClick={handlePrev}
            disabled={isFirstStep}
            className="w-full border px-4 py-2 rounded-lg border-gray-500 text-gray-500 text-center active:bg-gray-200"
          >
            Quay Lại
          </button>
          {activeStep !== 2 && (
            <button
              onClick={handleNext}
              disabled={isLastStep}
              className="w-full border px-4 py-2 rounded-lg  text-white text-center bg-gradient-to-r from-[#3B82F6] from-0% via-[#928290] via-57% to-[#FA8315] to-90% transition-all ease-in-out  duration-500 hover:from-0% hover:via-60% hover:to-100% "
            >
              Tiếp Theo
            </button>
          )}
          {activeStep === 2 && (
            <button
              onClick={handleUpload}
              className="w-full border px-4 py-2 rounded-lg  text-white text-center bg-gradient-to-r from-[#3B82F6] from-0% via-[#928290] via-57% to-[#FA8315] to-90% hover:from-0% hover:via-60% hover:to-100% transition-all ease-in-out  duration-500"
            >
              xác nhận thông tin
            </button>
          )}
        </div>
      </div>
    </>
  );
}
