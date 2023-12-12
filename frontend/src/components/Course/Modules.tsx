import { selectLecture } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { ICourse, ILecture, SliceState } from "@/types/type";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  BookOpenText,
  Check,
  Clock,
  Keyboard,
  MonitorPlay,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
const convertTime = (time: string) => {
  if (time !== undefined && time !== null) {
    const seconds = time;
    const date = new Date(0);
    date.setSeconds(parseInt(seconds));
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
  }
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
const LectureCard = (props: { Lecture: ILecture; index: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSelect = () => {
    dispatch(selectLecture(props.Lecture));
  };

  return (
    <>
      <div
        className="flex flex-col items-start justify-start text-[12px] cursor-pointer p-4   font-bold text-sm hover:bg-gray-100 rounded-md"
        onClick={handleSelect}
      >
        <div className="flex text-semibold text-gray-800 text-sm">
          {props.index + 1 + ". " + props.Lecture.lecture_name}
        </div>
        <div className="flex justify-between w-full mt-2 items-center">
          <div className="flex items-center text-xs space-x-2">
            {props.Lecture.type === "video" && <MonitorPlay size={16} />}
            {props.Lecture.type === "quiz" && <Keyboard size={16} />}
            <p> {convertTime(props.Lecture.duration)}</p>
          </div>
          {props.Lecture.has_watched !== "No" &&
            props.Lecture.has_watched !== undefined &&
            props.Lecture.has_watched !== null &&
            parseInt(props.Lecture.has_watched) !== 0 && (
              <div className="rounded-full border-[0.5px] w-5 h-5 flex justify-center items-center border-green-500 bg-green-500">
                <Check size={14} color="white" />
              </div>
            )}
          {/* <div className="rounded-full border-[0.5px] w-5 h-5 flex justify-center items-center border-black ">
            <Check size={14} color="white" />
          </div> */}
        </div>
      </div>
      <div className="w-10/12 mt-4 h-[1px] bg-gray-300"></div>
    </>
  );
};

const Session = (props: LectureProps) => {
  const [open, setOpen] = useState<boolean>(props.isOpen);

  const handleOpen = () => setOpen(!open);
  const getTotalTime = () => {
    let total = 0;
    props.lectures?.forEach((lecture) => {
      if (lecture.duration !== undefined && lecture.duration !== null)
        total += parseInt(lecture.duration);
    });
    const totalMinutes = total / 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return hours > 0 ? `${hours} giờ ${minutes} phút` : `${minutes} phút`;
  };
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
              <p>{props.lectures?.length + " bài"}</p>
              <Clock size={20} />
              <p>{getTotalTime()}</p>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          {props.lectures?.map((Lecture, index) => {
            return (
              <LectureCard
                key={Lecture.lecture_id}
                Lecture={Lecture}
                index={index}
              />
            );
          })}
        </AccordionBody>
      </Accordion>
    </div>
  );
};

const Modules = ({ currentCourse }: Props) => {
  const currentCourseOverview = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );
  return (
    <div className=" col-span-4 lg:col-span-1 h-auto p-4 py-2  sticky shadow-xl  border-l-2 border-gray-350 lg:h-[100vh] bg-white  lg:overflow-y-auto ">
      <h1 className="text-xl font-bold">Nội dung khóa học</h1>
      <p className="text-xs text-gray-500">
        {" Số lượng bài học ( " + currentCourseOverview?.totalLecture + " )"} /
        Tổng thời gian (
        {currentCourseOverview?.totalTime &&
          (currentCourseOverview?.totalTime / 60).toFixed(2) + " phút"}
        )
      </p>
      <div className="mt-5">
        {currentCourse?.sessions?.map((session) => {
          return (
            <Session
              key={session.session_id}
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
