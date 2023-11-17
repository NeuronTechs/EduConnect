import { CheckCircle, MinusCircle, PlayCircle, X } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import { convertTimeToTemplate } from "@/utils/const";

interface IconProps {
  id: number;
  open: number;
}

interface ISourceVideo {
  lecture_name: string;
  source: string;
}

const Icon = ({ id, open }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transform ${
        id === open ? "rotate-180" : ""
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

const Overview = () => {
  const [open, setOpen] = useState<number>(1);
  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const [video, setVideo] = useState<boolean>(false);
  const handleVideo = () => setVideo((cur) => !cur);
  const [contentVideo, setContentVideo] = useState<ISourceVideo>({
    lecture_name: "",
    source: "",
  });

  const handlePlay = (index: number, lecture_name: string, source: string) => {
    if (index === 1) {
      setVideo((cur) => !cur);
      setContentVideo({ lecture_name: lecture_name, source: source });
    }
  };
  return (
    <div className="my-3 w-full">
      <div className="p-[10px]">
        <h3 className="font-semibold">Nội dung khóa học</h3>
        <p className="p-[5px_10px]">{currentCourse?.description}</p>
        <p className="p-[5px_10px]">
          <span className="font-semibold">
            {currentCourse?.sessions.length}
          </span>{" "}
          chương •{" "}
          <span className="font-semibold">{currentCourse?.totalLecture}</span>{" "}
          bài học • Thời lượng{" "}
          <span className="font-semibold">
            {convertTimeToTemplate(currentCourse?.totalTime as number)}
          </span>
        </p>
        <div className="w-full px-3 p-[5px_10px]">
          {currentCourse?.sessions.map((session, index) => (
            <Accordion
              key={index}
              open={open === index + 1}
              icon={<Icon id={index + 1} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(index + 1)}>
                <div className="flex flex-row justify-between items-center opacity-100">
                  <div className="text-[18px]">
                    <p>{`${index + 1}. ${session.name}`}</p>
                  </div>
                  {index + 1 === 1 && (
                    <div
                      className={` ml-3 text-[14px] border p-2 bg-gray-300 rounded-lg`}
                    >
                      Học thử
                    </div>
                  )}
                </div>
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  {session.lectures.map((lecture, indexLec) => (
                    <li
                      key={lecture.lecture_id}
                      className={`${
                        index + 1 === 1 ? "cursor-pointer" : "cursor-default"
                      } flex items-center justify-between text-[15px]`}
                      onClick={() =>
                        handlePlay(
                          index + 1,
                          lecture.lecture_name,
                          lecture.source
                        )
                      }
                    >
                      <div className="flex items-center justify-start text-[15px]">
                        <PlayCircle
                          color="#ffcc80"
                          size={18}
                          className="mr-3"
                          weight="fill"
                        />
                        <p className="text-[15px]">{`${index + 1}.${
                          indexLec + 1
                        }. ${lecture.lecture_name}`}</p>
                      </div>
                      <p className="text-[15px]">{`${convertTimeToTemplate(
                        lecture.time
                      )}`}</p>
                    </li>
                  ))}
                </ul>
              </AccordionBody>
            </Accordion>
          ))}
          <Dialog
            open={video}
            handler={handleVideo}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-full">
              <CardBody className="flex flex-col gap-4">
                <div className="flex item-center justify-between font-semibold">
                  <p className="text-[20px]">{contentVideo?.lecture_name}</p>
                  <X cursor={"pointer"} size={24} onClick={handleVideo} />
                </div>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    contentVideo.source.split("v=")[1]
                  }`}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </CardBody>
            </Card>
          </Dialog>
        </div>
      </div>
      {/* Bạn sẽ học được gì? */}
      <div className="p-[10px]">
        <h3 className="font-semibold">Bạn sẽ học được gì?</h3>
        <ul className="flex flex-col lg:flex-row flex-wrap p-[5px_10px]">
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study1}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study2}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study3}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study4}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study5}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <CheckCircle size={16} className="mr-3" />
            {currentCourse?.study?.study6}
          </li>
        </ul>
      </div>
      {/* Yêu cầu */}
      <div className="p-[10px] gap-2">
        <h3 className="font-semibold">Yêu cầu</h3>
        <ul className="p-[5px_10px] flex flex-col lg:flex-row flex-wrap">
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require1}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require2}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require3}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require4}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require5}
          </li>
          <li className="flex items-baseline justify-start basis-1/2">
            <MinusCircle weight="fill" size={16} className="mr-3" />
            {currentCourse?.requirement?.require6}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
