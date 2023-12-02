import React, { useEffect, useRef, useState } from "react";

import { ICourse, ILecture, SliceState } from "@/types/type";
import { useLocation } from "react-router-dom";
import {
  createStudentProgress,
  handleStudentProgress,
  updateStudentProgress,
} from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import YouTube, { YouTubeProps } from "react-youtube";
interface Props {
  currentLecture: ILecture | null;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentCourse: ICourse;
}
const Video = ({
  currentLecture,
  currentTime,
  setCurrentTime,
  currentCourse,
}: Props) => {
  const { currentUser } = useSelector((state: SliceState) => state.authSlice);

  const [currentId, setCurrentId] = useState(currentLecture);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch<AppDispatch>();
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
  useEffect(() => {
    dispatch(
      handleStudentProgress({
        lecture_id: currentId?.lecture_id,
        has_watched: currentTime,
      })
    );
    if (
      (currentId?.has_watched === "No" ||
        currentId?.has_watched === undefined) &&
      currentId !== null &&
      currentUser &&
      currentTime > 0
    ) {
      dispatch(
        createStudentProgress({
          course_id: currentCourse.course_id,
          lecture_id: currentId.lecture_id?.toString(), // Convert lecture_id to string
          session_id: currentId.session_id?.toString(),
          progress: currentTime,
          student_id: currentUser?.user_id,
        })
      );
      setCurrentId(currentLecture);
    } else if (
      currentId?.has_watched !== "No" &&
      currentId !== null &&
      currentUser &&
      currentTime > 0
    ) {
      if (typeof currentTime === "string") {
        return;
      }
      dispatch(
        updateStudentProgress({
          course_id: currentId.course_id,
          lecture_id: currentId.lecture_id?.toString(), // Convert lecture_id to string
          session_id: currentId.session_id?.toString(),
          progress: currentTime,
          student_id: currentUser?.user_id,
        })
      );
      setCurrentId(currentLecture);
    }

    if (videoRef.current && currentLecture?.has_watched !== "No") {
      videoRef.current.currentTime = parseFloat(
        currentLecture?.has_watched || "0"
      );
    }
  }, [currentLecture]);
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1].split("&")[0];
    return videoId;
    // return `https://www.youtube.com/embed/${videoId}`;
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.seekTo(currentLecture?.has_watched || 0);
    event.target.pauseVideo();
  };
  const onPause: YouTubeProps["onPause"] = (event) => {
    setCurrentTime(event.target.getCurrentTime());
  };
  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // 3 is the state code for BUFFERING
    setCurrentTime(event.target.getCurrentTime());
  };
  return (
    <div className=" h-auto flex justify-center bg-black relative shadow-xl ">
      {currentLecture?.source.includes("youtube") ? (
        <YouTube
          videoId={getEmbedUrl(currentLecture?.source)}
          opts={{ height: "100%", width: "100%" }}
          className="w-[90%] aspect-video"
          onReady={onReady}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      ) : (
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
      )}
    </div>
  );
};

export default Video;
