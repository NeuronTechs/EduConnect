import {
  DotsThreeOutlineVertical,
  PaperPlaneTilt,
  Smiley,
} from "@phosphor-icons/react";
import React from "react";
import ItemChat from "./ItemChat";
import ChatHeader from "./ChatHeader";
import { IConventionChat, IMessage } from "@/types/type";
import { useForm } from "react-hook-form";
interface IProps {
  currentConventionId: string | number;
  setCurrentConventionId: React.Dispatch<React.SetStateAction<string>>;
  data: IConventionChat;
}

interface IDataInput {
  dataInput: string;
}

interface IGroupedMessages {
  [key: string]: IMessage[];
}
const ChatContent = (props: IProps): React.ReactElement => {
  const { register, handleSubmit } = useForm<IDataInput>({
    defaultValues: { dataInput: "" },
  });
  const [dataMessageConvention, setDataMessageConvention] = React.useState<
    IMessage[]
  >([]);
  // get data message convention
  React.useEffect(() => {
    setDataMessageConvention([
      {
        id: 1,
        avatar:
          "https://gravatar.com/avatar/f0e6c352a2b1e384e60ea3a444a82718?s=400&d=robohash&r=x",
        message:
          "Wo aro currency developing our sates Iir and wob Otos and tvo Interested in translating these into five languages from Erel.srw",
        name: "nguyen Van A",
        time: new Date().getTime(),
        seeMessage: [],
      },
      {
        id: 2,
        avatar:
          "https://robohash.org/f0e6c352a2b1e384e60ea3a444a82718?set=set4&bgset=&size=400x400", // replace with your avatar link
        message:
          "Wo aro currency developing our sates Iir and wob Otos and tvo Interested in translating these into five languages from Erel.srw",
        name: "nguyen Van A",
        time: new Date().getTime(),
        seeMessage: [],
      },
      {
        id: 3,
        avatar:
          "https://gravatar.com/avatar/55cbaadf1847eca80b323cd50c106832?s=400&d=robohash&r=x", // replace with your avatar link
        message:
          "Wo aro currency developing our sates Iir and wob Otos and tvo Interested in translating these into five languages from Erel.srw",
        name: "nguyen Van A",
        time: new Date().getTime(),
        seeMessage: [],
      },
      {
        id: 4,
        avatar:
          "https://gravatar.com/avatar/55cbaadf1847eca80b323cd50c106832?s=400&d=robohash&r=x", // replace with your avatar link
        message:
          "Wo aro currency developing our sates Iir and wob Otos and tvo Interested in translating these into five languages from Erel.srw",
        name: "nguyen Van A",
        time: new Date().getTime(),
        seeMessage: [],
      },
    ]);
  }, []);
  // add new message
  const handlerAddNewMessage = (data: IDataInput) => {
    if (data.dataInput.trim() === "") return;
    // add message
    const newMessage: IMessage = {
      id: dataMessageConvention.length + 1,
      message: data.dataInput,
      avatar: "https://example.com/avatar.png", // replace with your avatar link
      name: "nguyen Van A",
      time: new Date().getTime(),
      seeMessage: [],
      isLoading: true, // set loading to true initially
    };
    setDataMessageConvention((prev) => [...prev, { ...newMessage }]);
    // add message

    // BEGIN: timeout-example
    setTimeout(() => {
      // set loading for new message to false after 5000ms
      newMessage.isLoading = false;
      setDataMessageConvention((prev) => [...prev.slice(0, -1), newMessage]);
    }, 5000);
    // END: timeout-example
  };

  // ground message date time
  const groupedMessages: IGroupedMessages = dataMessageConvention.reduce(
    (acc, message) => {
      const date = new Date(message.time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    },
    {} as IGroupedMessages
  );
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* header */}
      <ChatHeader data={props.data} />
      {/* content */}
      <div className="bg-white rounded-md flex-1 overflow-auto p-2.5">
        <ChatContentMain groupedMessages={groupedMessages} />
      </div>
      {/* input */}
      <form onSubmit={handleSubmit(handlerAddNewMessage)}>
        <div className="bg-white rounded-md h-[60px] flex items-center p-3 space-x-2 ">
          <div className="p-1 rounded-md bg-gray-100 flex items-center justify-center">
            <DotsThreeOutlineVertical size={25} />
          </div>
          <div className="w-full px-4 py-2 bg-blue-50 flex items-center justify-start rounded-md space-x-2">
            <div className="">
              <Smiley size={25} className="text-gray-500" />
            </div>
            <input
              {...register("dataInput")}
              type="text"
              placeholder="Nhập Tin Nhắn..."
              className="text-sm font-normal placeholder:text-gray-500 w-full bg-transparent focus:ring-transparent focus:border-transparent outline-none border-none"
            />
          </div>
          <button
            className="p-2 flex items-center justify-center text-blue-500"
            type="submit"
          >
            <PaperPlaneTilt size={25} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatContent;

const ChatContentMain = (props: { groupedMessages: IGroupedMessages }) => {
  const [isTyping, setIsTyping] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-2.5">
      {Object.entries(props.groupedMessages).map(([date, messages]) => (
        <div key={date}>
          <DividerTime title={date} />
          {/* render message */}
          {messages.map((message: IMessage) => (
            <ItemChat key={message.id} data={message} />
          ))}
        </div>
      ))}
      <>{isTyping && <TypingMessage />}</>
    </div>
  );
};
const TypingMessage = () => {
  return (
    <div className="p-2 animate-pulse flex items-center gap-3 ">
      <div className="flex space-x-2">
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      </div>
      <p className="text-xs text-gray-400">ai đó đang nhập</p>
    </div>
  );
};
const DividerTime = (props: { title: string }) => {
  return (
    <div className="inline-flex items-center justify-center w-full relative px-3">
      <hr className="w-full h-px my-5 bg-gray-300 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
        {props.title}
      </span>
    </div>
  );
};
