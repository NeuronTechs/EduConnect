import { selectLecture } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { ICourse, ILecture } from "@/types/type";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ArchiveBox,
  ArrowDown,
  BookOpenText,
  Clock,
  Folder,
  MonitorPlay,
} from "@phosphor-icons/react";
import { Select } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface IconProps {
  open: boolean;
}
type LectureProps = {
  isOpen: boolean;
  title: string;
  time: number;
  lectures: ILecture[] | null;
};
interface Props {
  currentCourse: ICourse | null;
}
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
const LectureCard = (props: ILecture) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSelect = () => {
    dispatch(selectLecture(props));
  };
  return (
    <>
      <div
        className="flex flex-col items-start justify-start text-[12px] cursor-pointer p-2 pl-0  font-bold text-sm hover:bg-gray-100 rounded-md"
        onClick={handleSelect}
      >
        <div className="flex">
          {props.lecture_id + ". " + props.lecture_name}
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex items-center space-x-2">
            <MonitorPlay size={16} />
            <p> {15 + " phút"}</p>
          </div>

          <Menu>
            <MenuHandler>
              <div className="w-27 h-6 border-[0.5px] border-black hidden justify-between items-center ml-15 text-black p-1">
                <Folder size={16} /> <p className="text-sm">Resource</p>{" "}
                <ArrowDown size={16} />
              </div>
            </MenuHandler>
            <MenuList className="text-black">
              <MenuItem className="flex gap-2">
                <ArchiveBox size={16} /> Menu Item 1
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="w-10/12 mt-4 h-[1px] bg-gray-300"></div>
      </div>
    </>
  );
};

const Session = (props: LectureProps) => {
  const [open, setOpen] = useState<boolean>(props.isOpen);

  const handleOpen = () => setOpen(!open);
  return (
    <div className="  rounded-sm ">
      <Accordion open={open === true} icon={<Icon open={open} />}>
        <AccordionHeader onClick={() => handleOpen()}>
          <div className="flex flex-col items-start opacity-100 gap-2 w-full">
            <div className="text-[14px] text-black font-bold">
              {props.title}
            </div>
            <div className="flex items-center text-[10px] space-x-3">
              <BookOpenText size={20} />
              <p>{props.lectures?.length + "bài"}</p>
              <Clock size={20} />
              <p>60 phút</p>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <ul>
            {props.lectures?.map((Lecture) => {
              return (
                <li>
                  <LectureCard {...Lecture} />
                </li>
              );
            })}
          </ul>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

const Modules = ({ currentCourse }: Props) => {
  return (
    <div className=" col-span-4 lg:col-span-1 h-auto p-4  mt-2 sticky shadow-xl  border-l-2 border-gray-350 lg:h-[100vh] bg-white  lg:overflow-y-auto ">
      <h1 className="text-xl font-bold">Nội dung khóa học</h1>
      <p className="text-xs text-gray-500">Lecture (15) / Total (5,5 hrs)</p>
      <div className="mt-5">
        {currentCourse?.sessions?.map((session) => {
          return (
            <Session
              isOpen={session.session_id === "1"}
              title={session.name}
              time={session.name.length}
              lectures={session.lectures}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Modules;
