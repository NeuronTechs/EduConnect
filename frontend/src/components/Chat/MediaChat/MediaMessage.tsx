import { PauseCircle, PlayCircle } from "@phosphor-icons/react";
import React from "react";

const MediaMessage = (props: { data: { src: string; alt?: string }[] }) => {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      <CardVideo />
      <CardImage />
    </div>
  );
};

export default MediaMessage;

const CardVideo = (): React.ReactElement => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  return (
    <div className="w-full aspect-video rounded-md relative overflow-hidden bg-gray-100">
      <div className="absolute w-full h-full top-0 left-0 p-2 flex flex-col justify-between">
        <div className="w-full text-white text-sm font-normal ">
          Guy’s Truck
        </div>
        <div className="flex items-center justify-center w-full">
          {isPlaying ? (
            <PlayCircle size={25} className="text-white" weight="bold" />
          ) : (
            <PauseCircle size={25} weight="bold" className="text-white" />
          )}
        </div>
        <div className="flex justify-between text-white text-sm font-light  ">
          <div className="">wase.mp4</div>
          <div className="">378MB</div>
        </div>
      </div>
      <video
        className="w-full h-full object-cover"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls={false}
      ></video>
    </div>
  );
};

const CardImage = (): React.ReactElement => {
  return (
    <div className="w-full aspect-video rounded-md overflow-hidden relative bg-gray-100">
      <div className="absolute w-full h-full top-0 left-0 p-2 flex flex-col justify-between">
        <div className="w-full text-white text-sm font-light ">Guy’s Truck</div>
        <div className="flex justify-between text-white text-sm font-light">
          <div className="">images.png</div>
          <div className="">2.6mb</div>
        </div>
      </div>
      <img
        src={
          "https://cdn.pixabay.com/photo/2023/09/29/10/21/nuts-8283540_1280.jpg"
        }
        alt=""
        className="w-full h-full"
      />
    </div>
  );
};
