import React, { useEffect, useRef, useState } from "react";

import { ILecture } from "@/types/type";
interface Props {
  currentLecture: ILecture | null;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}
const Video = ({ currentLecture, currentTime, setCurrentTime }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const getCurrentTime = () => {
    if (videoRef.current) {
      return videoRef.current.currentTime;
    }
    return 0;
  };
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);
  return (
    <div className=" h-auto  relative shadow-xl ">
      <video
        src={currentLecture?.source}
        className=" w-full aspect-video  bg-black"
        ref={videoRef}
        onPause={() => {
          setCurrentTime(getCurrentTime());
        }}
        onSeeked={() => {
          setCurrentTime(getCurrentTime());
        }}
        autoPlay
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
