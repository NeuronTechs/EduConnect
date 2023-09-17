import { Step, Stepper, Typography } from "@material-tailwind/react";
import React from "react";

type propsStepperMain = {
  setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
};
const StepperMain = (props: propsStepperMain): React.ReactElement => {
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

export default StepperMain;
