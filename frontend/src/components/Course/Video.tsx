import React, { useEffect, useRef, useState } from "react";

import { ILecture, SliceState } from "@/types/type";
import { useLocation } from "react-router-dom";
import {
  createStudentProgress,
  updateStudentProgress,
} from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  currentLecture: ILecture | null;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}
const Video = ({ currentLecture, currentTime, setCurrentTime }: Props) => {
  const { currentUser } = useSelector((state: SliceState) => state.authSlice);
  const [currentId, setCurrentId] = useState({
    lecture_id: currentLecture?.lecture_id || 0,
    session_id: currentLecture?.session_id || 0,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytbRef = useRef<HTMLIFrameElement>(null);
  const location = useLocation();
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
    if (
      currentLecture?.has_watched === "No" &&
      currentLecture.type !== "Quiz" &&
      currentUser
    ) {
      dispatch(
        createStudentProgress({
          course_id: currentLecture.course_id,
          lecture_id: currentId.lecture_id.toString(), // Convert lecture_id to string
          session_id: currentId.session_id.toString(),
          progress: currentTime,
          student_id: currentUser?.user_id,
        })
      );
      setCurrentId({
        lecture_id: currentLecture.lecture_id,
        session_id: currentLecture.session_id,
      });
    } else if (
      currentLecture?.has_watched !== "No" &&
      currentLecture !== null &&
      currentUser
    ) {
      dispatch(
        updateStudentProgress({
          course_id: currentLecture.course_id,
          lecture_id: currentId.lecture_id.toString(), // Convert lecture_id to string
          session_id: currentId.session_id.toString(),
          progress: currentTime,
          student_id: currentUser?.user_id,
        })
      );
      setCurrentId({
        lecture_id: currentLecture.lecture_id,
        session_id: currentLecture.session_id,
      });
    }
    if (videoRef.current && currentLecture?.has_watched !== "No") {
      videoRef.current.currentTime = parseFloat(
        currentLecture?.has_watched || "0"
      );
    }
  }, [currentLecture, location]);
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className=" h-auto flex justify-center bg-black relative shadow-xl ">
      {currentLecture?.source.includes("youtube") ? (
        <iframe
          ref={ytbRef}
          className="w-[90%] aspect-video"
          src={getEmbedUrl(currentLecture?.source)}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onClick={() => {
            setCurrentTime(getCurrentTime());
            console.log(getCurrentTime());
          }}
          onSeeked={() => {
            setCurrentTime(getCurrentTime());
          }}
        ></iframe>
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
