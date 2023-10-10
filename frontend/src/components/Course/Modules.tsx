import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BookOpenText, Clock, PlayCircle } from "@phosphor-icons/react";
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
    <div className="mb-1  p-2 rounded-sm">
      <Accordion open={open === true} icon={<Icon open={open} />}>
        <AccordionHeader onClick={() => handleOpen()}>
          <div className="flex flex-col items-start opacity-100 gap-2">
            <div className="text-[14px] text-black font-bold">
              {props.title}
            </div>
            <div className="flex items-center text-[10px] space-x-3">
              <BookOpenText size={20} />
              <p>15 Bài</p>
              <Clock size={20} />
              <p>60 phút</p>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ul>
            <li className="flex items-center justify-start text-[15px] cursor-pointer">
              <PlayCircle size={16} className="mr-3" />
              1. Mô hình Client - Server là gì?
            </li>
            <li className="flex items-center justify-start cursor-pointer">
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
    <div className=" col-span-4 lg:col-span-1 pl-2 h-auto lg:h-screen lg:overflow-y-auto ">
      <h1 className="text-xl font-bold">Course Content</h1>
      <p className="text-xs text-gray-500">Lecture (15) / Total (5,5 hrs)</p>
      <div className="mt-5">
        <Module isOpen={false} title=" 1. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 2. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 3. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 4. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 5. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 6. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 7. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 8. Tiêu đề chương" time={15} />
        <Module isOpen={false} title=" 9. Tiêu đề chương" time={15} />
      </div>
    </div>
  );
};

export default Modules;
