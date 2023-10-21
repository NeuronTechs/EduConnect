import assets from "@/assets";
import { IConventionChat } from "@/types/type";
import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";
import ImageWithError from "../ImageWithError";
interface IProps {
  data: IConventionChat[];
  setDataChat: React.Dispatch<React.SetStateAction<IConventionChat[]>>;
  currentConventionId: string | number;
  setCurrentConventionId: React.Dispatch<React.SetStateAction<string>>;
}
const ListChat = (props: IProps) => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState<number>(0);
  React.useEffect(() => {
    try {
      // props.setCurrentConventionId(props.data[0].id);
      console.log("new convention");
    } catch (error) {
      // props.setCurrentConventionId("");
    }
    // props.setDataChat({ ...props.data });
  }, [currentTabIndex]);
  return (
    <div className="flex flex-col items-center justify-start bg-white rounded-md h-full overflow-hidden pb-2">
      <div className="h-auto">
        <div className="flex w-full items-center justify-center py-1 px-4">
          <h5 className="text-xl font-bold text-black">Tin Nhắn</h5>
        </div>
        {/* search contact */}
        <div className="w-full px-2 py-3">
          <div className="h-[50px] flex items-center bg-blue-100 rounded-md px-4 py-2 justify-between gap-2 ">
            <input
              type="text"
              className="text-xs font-medium placeholder:text-gray-400 w-full h-full px-2 bg-transparent focus:ring-gray-200 focus:border-gray-200 border-none "
              placeholder="Tìm kiếm tin nhắn"
            />
            <MagnifyingGlass size={25} className="text-blue-400" />
          </div>
        </div>
        {/* tab list contact */}
        <TabListContact
          currentTabIndex={currentTabIndex}
          setCurrentTabIndex={setCurrentTabIndex}
        />
      </div>
      <>
        {
          // list chat
          currentTabIndex === 0 && (
            <div className="h-full w-full flex flex-col px-2 overflow-auto gap-2  ">
              {props.data.map((item, index) => {
                return (
                  <ItemConventionChat
                    currentConventionId={props.currentConventionId}
                    setCurrentConventionId={props.setCurrentConventionId}
                    data={item}
                    key={index}
                  />
                );
              })}
            </div>
          )
        }
      </>
      <>
        {currentTabIndex === 1 && (
          <div className="h-full w-full flex flex-col px-2 overflow-auto gap-2  ">
            {props.data.map((item, index) => {
              return (
                <ItemConventionChat
                  currentConventionId={props.currentConventionId}
                  setCurrentConventionId={props.setCurrentConventionId}
                  data={item}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </>
      <>
        {currentTabIndex === 2 && (
          <div className="h-full w-full flex flex-col px-2 overflow-auto gap-2  ">
            {props.data.map((item, index) => {
              return (
                <ItemConventionChat
                  currentConventionId={props.currentConventionId}
                  setCurrentConventionId={props.setCurrentConventionId}
                  data={item}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default ListChat;

const TabListContact = (props: {
  setCurrentTabIndex: (data: number) => void;
  currentTabIndex: number;
}): React.ReactElement => {
  return (
    <div className="w-full flex items-center p-2 gap-2">
      <div
        className={`p-2 rounded-md ${
          props.currentTabIndex === 0
            ? "text-white bg-blue-400 hover:bg-blue-500 border border-transparent"
            : "text-blue-400 border border-blue-400 hover:bg-gray-200"
        } text-xs font-bold whitespace-nowrap cursor-pointer`}
        onClick={() => props.setCurrentTabIndex(0)}
      >
        Giáo Viên
      </div>
      <div
        className={`p-2 rounded-md ${
          props.currentTabIndex === 1
            ? "text-white bg-blue-400 hover:bg-blue-500 border border-transparent"
            : "text-blue-400 border border-blue-400 hover:bg-gray-200"
        } text-xs font-bold whitespace-nowrap cursor-pointer`}
        onClick={() => props.setCurrentTabIndex(1)}
      >
        Lớp Học
      </div>
      <div
        className={`p-2 rounded-md ${
          props.currentTabIndex === 2
            ? "text-white bg-blue-400 hover:bg-blue-500 border border-transparent"
            : "text-blue-400 border border-blue-400 hover:bg-gray-200"
        } text-xs font-bold whitespace-nowrap cursor-pointer`}
        onClick={() => props.setCurrentTabIndex(2)}
      >
        Nhóm Học
      </div>
    </div>
  );
};

const ItemConventionChat = (props: {
  data: IConventionChat;
  currentConventionId: string | number;
  setCurrentConventionId: (data: string) => void;
}): React.ReactElement => {
  return (
    <div
      className={`${
        props.currentConventionId === props.data.id
          ? "bg-blue-100 hover:bg-blue-200"
          : "bg-gray-100 hover:bg-gray-200"
      } flex items-center justify-between p-2.5 gap-2 rounded-md cursor-pointer`}
      onClick={() => props.setCurrentConventionId(props.data.id)}
    >
      <div className="flex items-center gap-2 w-full">
        {/* avatar */}
        <div className="h-[40px] w-[40px] rounded-full relative">
          <ImageWithError
            src={props.data.avatar}
            alt=""
            className="w-full h-full object-cover rounded-full"
            fallbackSrc={assets.images.avatarBlack}
          />
          <span className="bottom-0 left-7 absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
        {/* content message */}
        <div className="flex-1 flex flex-col justify-start gap-2 overflow-hidden ">
          <h5
            className={`text-xs font-bold text-black whitespace-nowrap w-full overflow-hidden text-ellipsis`}
          >
            {props.data.name}
          </h5>
          <p
            className={`text-xs font-medium ${
              props.data.chatNew === 0 ? "text-gray-400" : "text-gray-800"
            }  whitespace-nowrap w-full overflow-hidden text-ellipsis`}
          >
            {props.data.lastMessage}
          </p>
        </div>
        {/* time check new message */}
        <div className="flex flex-col gap-2 items-end justify-end">
          <p className={`text-xs font-normal text-gray-500}`}>
            {props.data.lastTime}
          </p>

          {props.data.chatNew > 0 ? (
            <div className="rounded-full p-1 bg-blue-500 text-white flex items-center justify-center h-4  w-auto text-xs font-normal">
              {props.data.chatNew}
            </div>
          ) : (
            <div className="rounded-full p-1 bg-transparent text-transparent flex items-center justify-center h-4  w-auto text-xs font-normal">
              {" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
