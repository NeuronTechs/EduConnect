import {
  CornersOut,
  FastForward,
  GearSix,
  Pause,
  Play,
  SpeakerSimpleHigh,
} from "@phosphor-icons/react";
import React, { useRef, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Slider,
} from "@material-tailwind/react";
const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speedRate = [];
  for (let index = 0.5; index <= 2; index = index + 0.25) {
    speedRate.push(index);
  }
  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  const getCurrentTime = (): number => {
    if (videoRef.current) {
      return parseInt(videoRef.current.currentTime.toFixed(0));
    }
    return 0;
  };
  return (
    <div className=" h-[70vh] pt-0 relative shadow-xl ">
      <video
        src="https://res.cloudinary.com/dgfsdhshs/video/upload/v1687790889/Studio_Project_V1_w7836p.mp4"
        className=" w-full aspect-video rounded-lg "
        ref={videoRef}
        onClick={handlePlay}
        onTimeUpdate={() => {
          setCurrentTime(getCurrentTime());
        }}
      >
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800 p-5 text-white cursor-pointer opacity-70"
          onClick={handlePlay}
        >
          <Play size={32} />
        </div>
      )}
      <div className=" absolute opacity-0 flex justify-between items-center text-white hover:opacity-50 w-full h-[50px] bg-black  bottom-0">
        <div className=" ml-5 flex space-x-5 font-bold items-center justify-center">
          <div className="cursor-pointer" onClick={handlePlay}>
            {isPlaying ? <Pause size={25} /> : <Play size={25} />}
          </div>
          <Menu>
            <MenuHandler>
              <button>1.0x</button>
            </MenuHandler>
            <MenuList className="bg-black text-white w-20">
              {speedRate.map((rate) => (
                <MenuItem
                  key={rate}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.playbackRate = rate;
                    }
                  }}
                >
                  {rate + "x"}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <FastForward
            size={25}
            onClick={() => {
              if (videoRef.current) {
                setCurrentTime(currentTime + 5);
                videoRef.current.currentTime += 5;
              }
            }}
            className="cursor-pointer"
          />
          <h6>
            {currentTime} /{" "}
            {videoRef.current && videoRef.current.duration.toFixed(0)}
          </h6>
          <div className="flex w-[430px] flex-col ">
            <Slider
              color="blue"
              defaultValue={0}
              value={
                videoRef.current
                  ? (currentTime / videoRef.current.duration) * 100
                  : 0
              }
              onChange={(e) => {
                if (videoRef.current) {
                  const time = Number(e.target.value);
                  const s = (time / 100) * videoRef.current.duration;
                  setCurrentTime(Number(s.toFixed(0)));
                  videoRef.current.currentTime = Number(s.toFixed(0));
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-5 mr-5">
          <SpeakerSimpleHigh size={25} />
          <GearSix size={25} />
          <CornersOut size={25} />
        </div>
      </div>
    </div>
  );
};

export default Video;
