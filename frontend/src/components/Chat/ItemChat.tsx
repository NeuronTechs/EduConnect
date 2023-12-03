import assets from "@/assets";
import {
  CheckCircle,
  Circle,
  DotsThree,
  ShareFat,
} from "@phosphor-icons/react";
import React from "react";
// import FileMessage from "./MediaChat/FileMessage";
import { IMessage } from "@/types/type";
// import MediaMessage from "./MediaChat/MediaMessage";
// import AudioSoundMessage from "./MediaChat/AudioSoundMessage";
import ImageWithError from "../ImageWithError";
import { Tooltip } from "flowbite-react";
// import MediaMessage from "./MediaMessage";

interface IProps {
  data: IMessage;
}
const ItemChat = (props: IProps): React.ReactElement => {
  const [hover, setHover] = React.useState<boolean>(false);
  return (
    <div
      className="w-full hover:bg-blue-gray-50 relative "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="absolute flex -top-2 bg-gray-200 right-5 rounded-sm ">
          {/* reply */}
          <Tooltip
            content="Trả lời"
            placement="top"
            className="text-xs px-2  py-1"
          >
            <div
              data-tooltip-target={"tooltip-reply-" + props.data.id}
              data-tooltip-trigger="hover"
              className="p-2 hover:bg-blue-200 cursor-pointer text-gray-500"
            >
              <ShareFat size={10} />
            </div>
          </Tooltip>
          {/* more */}
          <Tooltip
            content="Những mục khác"
            placement="top"
            className="text-xs px-2  py-1 whitespace-nowrap"
          >
            <div className="p-2 hover:bg-blue-200 cursor-pointer">
              <DotsThree size={10} />
            </div>
          </Tooltip>
        </div>
      )}

      <div className="w-[80%] flex items-start justify-start gap-2.5 p-2.5">
        <div className="rounded-md w-[40px] h-[40px] overflow-hidden">
          <ImageWithError
            src={props.data.avatar}
            alt=""
            fallbackSrc={assets.images.avatarBlack}
            className="w-full h-full"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2.5 justify-start items-start">
          {/* header account */}
          <div className="flex gap-2 items-center justify-start">
            <h5 className="text-base font-semibold leading-3">
              {props.data.name}
            </h5>
            <p className="text=base font-normal text-gray-500">
              {props.data.time}
            </p>
            <div className="flex items-center justify-center">
              {props.data.isLoading ? (
                <Circle size={15} className="text-blue-500" />
              ) : (
                <CheckCircle size={15} className="text-blue-500" />
              )}
            </div>
            <div className="flex -space-x-2">
              <img
                className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
                src={assets.images.avatar1}
                alt=""
              />
              <img
                className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
                src={assets.images.avatar1}
                alt=""
              />
              <img
                className="w-6 h-6 border-2 border-white rounded-full dark:border-gray-800"
                src={assets.images.avatar1}
                alt=""
              />
              <div className="flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800 cursor-pointer">
                +3
              </div>
            </div>
          </div>
          {/* content */}
          <p className="flex text-base font-normal text-gray-500">
            {props.data.message}
          </p>
          {/* {(props.data.images?.length || 0) + (props.data.videos?.length || 0) >
            1 && (
            <MediaMessage
              data={[
                ...(props.data.images || []),
                ...(props.data.videos || []),
              ]}
            />
          )} */}

          {/* {props.data.audios?.map((audio, index) => (
            <AudioSoundMessage
              key={index}
              src={audio.src}
              // name={audio.name}
              // duration={audio.duration}
            />
          ))} */}
          {/* {props.data.files?.map((file, index) => (
            <FileMessage
              key={index}
              // src={file.src}
              // name={file.name}
              // size={file.size}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default ItemChat;
