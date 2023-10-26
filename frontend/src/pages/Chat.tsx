import ChatContent from "@/components/Chat/ChatContent";
import ListChat from "@/components/Chat/ListChat";
import React from "react";

const dataChatConvention = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/300?img=1",
    name: "Nguyễn Văn A",
    lastMessage: "Hello",
    lastTime: "12:00",
    isOnline: true,
    chatNew: 1,
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/300?img=2",
    name: "Nguyễn Văn B",
    lastMessage: "Hello friend tip anh chị em",
    lastTime: "12:00",
    isOnline: false,
    chatNew: 0,
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/300?img=3",
    name: "Nguyễn Văn C",
    lastMessage: "em hay giai thich ki how van de ddc khong",
    lastTime: "12:00",
    isOnline: true,
    chatNew: 1,
  },
];
const Chat = () => {
  const [dataChat, setDataChat] = React.useState(dataChatConvention);
  const [currentConventionId, setCurrentConventionId] =
    React.useState<string>("1");
  return (
    <div className="flex h-full overflow-auto gap-3">
      <div className=" w-[250px]">
        <ListChat
          currentConventionId={currentConventionId}
          setCurrentConventionId={setCurrentConventionId}
          setDataChat={setDataChat}
          data={dataChat}
        />
      </div>
      <div className="flex-1">
        <ChatContent
          currentConventionId={currentConventionId}
          setCurrentConventionId={setCurrentConventionId}
          data={dataChat.filter((item) => item.id === currentConventionId)[0]}
        />
      </div>
    </div>
  );
};

export default Chat;
