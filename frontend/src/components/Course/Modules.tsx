import { ILesson } from "@/types/type";
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
const lessons: ILesson[] = [
  {
    id: "1",
    title: "Introduction to React",
    thumbnail: "https://example.com/react-thumbnail.jpg",
    description: "Learn the basics of React",
    video_url: "https://example.com/react-intro.mp4",
    courseId: "1",
    categoryId: "1",
    moduleId: "1",
    totalTime: 60,
    totalReview: 10,
    createdAt: new Date("2021-01-01"),
    updateAt: new Date("2021-01-02"),
  },
  {
    id: "2",
    title: "React Components",
    thumbnail: "https://example.com/react-components-thumbnail.jpg",
    description: "Learn about React components",
    video_url: "https://example.com/react-components.mp4",
    courseId: "1",
    categoryId: "1",
    moduleId: "1",
    totalTime: 90,
    totalReview: 5,
    createdAt: new Date("2021-01-03"),
    updateAt: new Date("2021-01-04"),
  },
  // Add more lessons here
];
const LessonCard = (props: ILesson) => {
  return (
    <>
      <div className="flex flex-col items-start justify-center text-[15px] cursor-pointer py-2  ">
        <div className="flex">{props.id + ". " + props.title}</div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex items-center space-x-2">
            <MonitorPlay size={16} />
            <p> {props.totalTime + " phút"}</p>
          </div>

          <Menu>
            <MenuHandler>
              <div className="w-27 h-6 border-[0.5px] border-black flex justify-between items-center ml-15 text-black p-1">
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
      </div>
    </>
  );
};

const Lesson = (props: moduleProps) => {
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
            {lessons.map((lesson) => {
              return (
                <li>
                  <LessonCard {...lesson} />
                </li>
              );
            })}
          </ul>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

const Modules = () => {
  return (
    <div className=" col-span-4 lg:col-span-1 pl-2 h-auto lg:h-screen lg:overflow-y-auto ">
      <h1 className="text-xl font-bold">Nội dung khóa học</h1>
      <p className="text-xs text-gray-500">Lecture (15) / Total (5,5 hrs)</p>
      <div className="mt-5">
        <Lesson isOpen={false} title=" 1. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 2. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 3. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 4. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 5. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 6. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 7. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 8. Tiêu đề chương" time={15} />
        <Lesson isOpen={false} title=" 9. Tiêu đề chương" time={15} />
      </div>
    </div>
  );
};

export default Modules;
