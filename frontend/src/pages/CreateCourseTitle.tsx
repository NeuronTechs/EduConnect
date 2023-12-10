import assets from "@/assets";
import CreateCourseTitle from "@/components/CreateCourse/CreateCourseTitle";
import { configRouter } from "@/configs/router";

import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
interface IFormInput {
  typeCourse: string;
  title: string;
  topic: string;
  level: string;
}
const CreateCourse = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm<IFormInput>();
  const [stepperIndex, setStepperIndex] = React.useState<number>(0);

  const handlerStepperNext = async () => {
    await trigger();
    await clearErrors();
    if (stepperIndex === 0) {
      await trigger(["typeCourse"]);
    }
    if (stepperIndex === 1) {
      await trigger(["title", "level"]);
    }
    if (stepperIndex === 2) {
      await trigger(["topic"]);
    }
    if (errors.title || errors.topic || errors.level) {
      return;
    }
    if (stepperIndex < 2) {
      setStepperIndex((prev) => prev + 1);
    }
  };
  const handlerStepperPrev = () => {
    if (stepperIndex > 0) {
      clearErrors();
      setStepperIndex((prev) => prev - 1);
    }
  };
  return (
    <LayoutCreateCourse stepperIndex={stepperIndex}>
      <CreateCourseTitle
        register={register}
        setValue={setValue}
        trigger={trigger}
        error={errors}
        stepperIndex={stepperIndex}
        handlerStepperNext={handlerStepperNext}
        handlerStepperPrev={handlerStepperPrev}
        handleSubmit={handleSubmit}
      ></CreateCourseTitle>
    </LayoutCreateCourse>
  );
};

export default CreateCourse;

const LayoutCreateCourse = (props: {
  children: React.ReactElement;
  stepperIndex: number;
}): React.ReactElement => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="header flex items-center justify-between h-[60px] shadow-2">
        <div className="h-full flex">
          <div className="flex items-center justify-center px-4 py-2 gap-2">
            <img
              src={assets.images.logoMain}
              alt="logo"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center  border-l border-gray-300 px-5">
            <div className="ml-2 text-base font-thin">{`Bước ${
              props.stepperIndex + 1
            }/3`}</div>
          </div>
        </div>
        <div className=" flex px-3">
          <Link to={configRouter.courseMyTeacher}>
            <button className="text-base font-bold p-2 bg-blue-500 text-white rounded-md">
              Thoát
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex">{props.children}</div>
    </div>
  );
};
