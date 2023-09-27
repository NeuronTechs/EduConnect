import React from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import StepperMain from "./StepperMain";
import assets from "../../assets";
import { Radio, Typography } from "@material-tailwind/react";
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
const StepperContainer = (): React.ReactElement => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLastStep, setIsLastStep] = React.useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = React.useState<boolean>(false);

  const {
    register,
    // setValue,
    // handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<IFormInput>();
  console.log(watch());
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const handleUpload = () => {};

  // const onSubmit = handleSubmit((data) => console.log(data));
  return (
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
  );
};

export default StepperContainer;

type propsContentStepper = {
  activeStep: number;
  register: UseFormRegister<IFormInput>;
};
const ContentStepper = (props: propsContentStepper): React.ReactElement => {
  // const [imageAvatar, setImageAvatar] = React.useState();
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
