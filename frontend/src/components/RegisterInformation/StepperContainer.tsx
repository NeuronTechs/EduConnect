/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  useForm,
} from "react-hook-form";
import StepperMain from "./StepperMain";
import assets from "../../assets";
import { Radio, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as userRegisterInformationApi from "@/api/registerInfomationUser/registerInfomationUser";
import ImageWithError from "../ImageWithError";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { User } from "@/type";
import { updateInformation } from "@/features/auth/authSlice";
enum enumGender {
  female = "female",
  male = "male",
}
interface IFormInput {
  full_name: string;
  avatar: FileList | string;
  email: string;
  phone: number;
  gender: enumGender;
  birthday: Date;
  address: string;
  role: string;
  educational_level: string;
  major: string;
  course: string;
  school: string;
  address_school: string;
}

const StepperContainer = (): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector<RootState, User>(
    (state) => state.authSlice.currentUser as User
  );

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isLastStep, setIsLastStep] = React.useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = React.useState<boolean>(false);
  const [isLoad, setIsLoad] = React.useState<boolean>(false);

  // useform hook
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
    // formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
      avatar: currentUser.avatar,
      phone: parseInt(currentUser?.phone as string),
      // gender: "female",
      birthday: new Date(currentUser?.birthday ? currentUser?.birthday : ""),
      address: currentUser?.address,
    },
  });
  // handle stepper
  const handleNext = async () => {
    await trigger();
    await clearErrors();
    if (activeStep === 0) {
      await trigger(["full_name", "email", "phone", "birthday", "address"]);
    }
    if (activeStep === 1) {
      await trigger([
        "role",
        "educational_level",
        "major",
        "course",
        "school",
        "address_school",
      ]);
    }
    if (
      errors.full_name ||
      errors.email ||
      errors.phone ||
      errors.birthday ||
      errors.address ||
      errors.role ||
      errors.educational_level ||
      errors.major ||
      errors.course ||
      errors.school ||
      errors.address_school
    ) {
      return;
    }

    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
    }
  };

  const handlePrev = () => {
    clearErrors();
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
    }
  };
  // avatar
  const urlFile = watch("avatar");
  const [urlAvatar, setUrlAvatar] = React.useState<
    string | undefined | FileList
  >(currentUser?.avatar);
  useEffect(() => {
    if (
      urlFile !== undefined &&
      urlFile.length > 0 &&
      urlFile instanceof FileList
    ) {
      setUrlAvatar(URL.createObjectURL(urlFile[0]));
    }
  }, [urlFile]);
  // handle submit api
  const onSubmit = async (data: IFormInput) => {
    setIsLoad(true);
    try {
      const res = await userRegisterInformationApi.addInformationUser({
        username: currentUser?.username,
        fullName: data.full_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        birthday: data.birthday,
        address: data.address,
        avatar: data.avatar,
        role: data.role,
        educational_level: data.educational_level,
        major: data.major,
        course: data.course,
        school: data.school,
        address_school: data.address_school,
      });
      if (res) {
        setIsLoad(false);
        const user_id =
          data.role === "0"
            ? "st_" + currentUser.username
            : "te_" + currentUser.username;
        dispatch(
          updateInformation({
            ...currentUser,
            full_name: data.full_name,
            email: data.email,
            role: data.role,
            avatar: data.avatar,
            phone: data.phone.toString(),
            user_id: user_id,
          })
        );
        navigate("/");
        toast.success("cập nhật thông tin thành công");
      }
    } catch (error) {
      setIsLoad(false);
      toast.error("lỗi trong việc cập nhật thông tin xin vui lòng thử lại");
      console.log(error);
    }
    if (currentUser === undefined) return;
  };

  return (
    <div className="w-full px-16 py-4">
      <ToastContainer />
      <StepperMain
        activeStep={activeStep}
        setIsLastStep={setIsLastStep}
        setIsFirstStep={setIsFirstStep}
        setActiveStep={setActiveStep}
      />
      <ContentStepper
        activeStep={activeStep}
        register={register}
        urlAvatar={urlAvatar}
        errors={errors}
        trigger={trigger}
      />
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
          <>
            {!isLoad ? (
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-full border px-4 py-2 rounded-lg  text-white text-center bg-gradient-to-r from-[#3B82F6] from-0% via-[#928290] via-57% to-[#FA8315] to-90% hover:from-0% hover:via-60% hover:to-100% transition-all ease-in-out  duration-500"
              >
                xác nhận thông tin
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="w-full border px-4 py-2 rounded-lg  text-white text-center bg-gradient-to-r from-[#3B82F6] from-0% via-[#928290] via-57% to-[#FA8315] to-90% hover:from-0% hover:via-60% hover:to-100% transition-all ease-in-out  duration-500"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                đang xử lý...
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StepperContainer;

type propsContentStepper = {
  activeStep: number;
  register: UseFormRegister<IFormInput>;
  urlAvatar: FileList | string | undefined;
  errors: FieldErrors<IFormInput>;
  trigger: UseFormTrigger<IFormInput>;
};

const ContentStepper = (props: propsContentStepper): React.ReactElement => {
  const imageURL =
    props.urlAvatar instanceof FileList
      ? URL.createObjectURL(props.urlAvatar[0])
      : props.urlAvatar;

  // ...

  const minDate = new Date("1000-01-01");
  const maxDate = new Date();

  // ...

  return (
    <div className="w-full">
      {props.activeStep === 0 && (
        <div className="content w-full flex flex-col items-center justify-center space-y-10">
          <div className="logo flex flex-col items-center justify-center space-y-1">
            <div className="w-[80px] h-[80px] overflow-hidden">
              <ImageWithError
                src={imageURL !== "" ? imageURL : assets.images.noAvatar}
                alt="avatar"
                fallbackSrc={assets.images.noAvatar}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex relative">
              <button className="bg-gray-200 px-3 py-2 rounded-md">
                Tải Hình ảnh
              </button>
              <input
                className="absolute top-0 left-0 opacity-0"
                accept="image/*"
                // style={{ display: "none" }}
                type="file"
                multiple={false}
                {...props.register("avatar")}
                name="avatar"
              />
            </div>
          </div>
          <div className="form w-full">
            <div className="grid grid-cols-2 gap-3 gap-y-5">
              <div className="flex flex-col items-start justify-start col-span-2">
                <Typography variant="h6" className="text-sm">
                  Họ và Tên
                </Typography>
                <input
                  {...props.register("full_name", { required: true })}
                  type="text"
                  // name="full_name"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Tên"
                  onBlur={() => props.trigger("full_name")}
                />
                {props.errors.full_name && (
                  <span className="text-red-500">
                    Họ và Tên không được để trống
                  </span>
                )}
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Email
                </Typography>
                <input
                  {...props.register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  type="text"
                  name="email"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="robert.langster@gmail.com"
                  onBlur={() => props.trigger("email")}
                />
                {props.errors.email &&
                  props.errors.email.type === "required" && (
                    <span className="text-red-500">
                      Email không được để trống
                    </span>
                  )}
                {props.errors.email &&
                  props.errors.email.type === "pattern" && (
                    <span className="text-red-500">Email không hợp lệ</span>
                  )}
              </div>
              <div className=" flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Số điện thoại
                </Typography>
                <input
                  {...props.register("phone", {
                    required: true,
                    pattern: /^[0-9]{10}$/, // Kiểm tra có đúng 10 chữ số hay không
                  })}
                  type="number"
                  name="phone"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  onBlur={() => props.trigger("phone")}
                />
                {props.errors.phone &&
                  props.errors.phone.type === "required" && (
                    <span className="text-red-500">
                      Số điện thoại không được để trống
                    </span>
                  )}
                {props.errors.phone &&
                  props.errors.phone.type === "pattern" && (
                    <span className="text-red-500">
                      Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.
                    </span>
                  )}
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
                </div>
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <div className="col-span-2 flex flex-col items-start justify-start">
                  <Typography variant="h6" className="text-sm">
                    Ngày Sinh
                  </Typography>
                  <input
                    {...props.register("birthday", {
                      required: true,
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        if (selectedDate < minDate || selectedDate > maxDate) {
                          return "Ngày sinh không hợp lệ";
                        }
                        if (selectedDate > currentDate) {
                          return "Ngày sinh không thể là ngày trong tương lai";
                        }
                        return true;
                      },
                    })}
                    type="date"
                    placeholder="dd-mm-yyyy"
                    min={minDate.toISOString().split("T")[0]}
                    onBlur={() => props.trigger("birthday")}
                  />
                  {props.errors.birthday && (
                    <span className="text-red-500">
                      {props.errors.birthday.message}
                    </span>
                  )}
                  {props.errors.birthday?.type === "required" && (
                    <span className="text-red-500">
                      Ngày sinh không được để trống
                    </span>
                  )}
                </div>
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Địa Chỉ
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  {...props.register("address", { required: true })}
                  type="text"
                  name="address"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="ĐỊa Chỉ"
                  onBlur={() => props.trigger("address")}
                />
                {props.errors.address && (
                  <span className="text-red-500">
                    Địa chỉ không được để trống
                  </span>
                )}
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
                    {...props.register("role", { required: true })}
                    value={"0"}
                    name="role"
                    label="Học sinh, Sinh Viên"
                    defaultChecked
                    crossOrigin={undefined}
                    color="blue"
                  />
                  <Radio
                    {...props.register("role", { required: true })}
                    value={"1"}
                    name="role"
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
                  {...props.register("educational_level", { required: true })}
                  type="text"
                  name="educational_level"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Tình độ học vấn"
                  onBlur={() => props.trigger("educational_level")}
                />
                {props.errors.educational_level && (
                  <span className="text-red-500">
                    Tình độ học vấn không được để trống
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Ngành học
                </Typography>
                <input
                  {...props.register("major", { required: true })}
                  type="text"
                  name="major"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Ngành học"
                  onBlur={() => props.trigger("major")}
                />
                {props.errors.major && (
                  <span className="text-red-500">
                    Ngành học không được để trống
                  </span>
                )}
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Trường Học
                </Typography>
                <input
                  {...props.register("school", { required: true })}
                  type="text"
                  name="school"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Trường"
                  onBlur={() => props.trigger("school")}
                />
                {props.errors.school && (
                  <span className="text-red-500">
                    Trường học không được để trống
                  </span>
                )}
              </div>

              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Khoá Học
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  {...props.register("course", { required: true })}
                  type="date"
                  name="course"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="robert.langster@gmail.com"
                  onBlur={() => props.trigger("course")}
                />
                {props.errors.course && (
                  <span className="text-red-500">
                    Khoá học không được để trống
                  </span>
                )}
              </div>
              <div className="col-span-2 flex flex-col items-start justify-start">
                <Typography variant="h6" className="text-sm">
                  Địa Chỉ Trường
                </Typography>
                <div className="flex items-center justify-start gap-3"></div>
                <input
                  {...props.register("address_school", { required: true })}
                  type="text"
                  name="address_school"
                  className="mt-1 px-3 py-3 bg-white border shadow-sm border-gray-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Địa Chỉ"
                  onBlur={() => props.trigger("address_school")}
                />
                {props.errors.address_school && (
                  <span className="text-red-500">
                    Địa chỉ không được để trống
                  </span>
                )}
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
