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
        src="https://rr2---sn-npoldn7e.c.drive.google.com/videoplayback?expire=1698241103&ei=H_A4ZYTdFZHEp84PvPCb-Aw&ip=1.53.54.7&id=a34d9ec668cbdcc8&itag=59&source=webdrive&requiressl=yes&xpc=EghotM6WJ3oBAQ==&mh=b4&mm=32&mn=sn-npoldn7e&ms=su&mv=m&mvi=2&pl=24&ttl=transient&susc=dr&driveid=1JeUL9_WoyqSf47Q8oRIdSiEZ0UP-zm8D&app=explorer&eaua=MLbuuyQ8g5M&mime=video/mp4&vprv=1&prv=1&dur=96.130&lmt=1565861727151593&mt=1698229975&subapp=DRIVE_WEB_FILE_VIEWER&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,dur,lmt&sig=AGM4YrMwRAIgATP7EHL494YI6Z2I4i4hmhySS2upSwJJN-RvW3_7zgkCIFU_ldByGlS8kkANBgnbUgAAh4eyEuNNyxJp6vLHwOa3&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=AK1ks_kwRgIhANIvSX9twVBXbXFuM67H934ZVGkuYspgQxEAqzcKWThuAiEAlfBREvoPqY2d0Y79QKW94f0FhPruL2ZHCDJYi80a1EY=&cpn=3vCBkhZEpThfUDoJ&c=WEB_EMBEDDED_PLAYER&cver=1.20231022.00.01"
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
