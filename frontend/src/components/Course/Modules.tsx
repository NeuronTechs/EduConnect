import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { PlayCircle } from "@phosphor-icons/react";
import React, { useState } from "react";

interface IconProps {
  open: boolean;
}
type moduleProps = {
  isOpen: boolean;
  title: string;
  time: number;
};
const Icon = ({ open }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transform ${
        open ? "rotate-180" : ""
      } transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
const Module = (props: moduleProps) => {
  const [open, setOpen] = useState<boolean>(props.isOpen);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="my-1  p-2 rounded-sm">
      <Accordion open={open === true} icon={<Icon open={open} />}>
        <AccordionHeader onClick={() => handleOpen()}>
          <div className="flex flex-col justify-between items-start opacity-100">
            <div className="text-[16px]">{props.title}</div>
            <div className="text-[13px] font-normal">
              {props.time} phút để hoàn thành
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ul>
            <li className="flex items-center justify-start text-[15px]">
              <PlayCircle size={16} className="mr-3" />
              1. Mô hình Client - Server là gì?
            </li>
            <li className="flex items-center justify-start">
              <PlayCircle size={16} className="mr-3" />
              2. Domain là gì? Tên miền là gì?
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

const Modules = () => {
  return (
    <div className="col-span-1 pl-2  ">
      <h1 className="text-xl font-bold">Course Content</h1>
      <p className="text-xs text-gray-500">Lecture (15) / Total (5,5 hrs)</p>
      <div className="mt-5">
        <Module isOpen={false} title="Bài 1" time={15} />
        <Module isOpen={false} title="Bài 2" time={15} />
        <Module isOpen={false} title="Bài 3" time={15} />
        <Module isOpen={false} title="Bài 4" time={15} />
        <Module isOpen={false} title="Bài 5" time={15} />
        <Module isOpen={false} title="Bài 6" time={15} />
        <Module isOpen={false} title="Bài 7" time={15} />
        <Module isOpen={false} title="Bài 8" time={15} />
        <Module isOpen={false} title="Bài 9" time={15} />
      </div>
    </div>
  );
};

export default Modules;
