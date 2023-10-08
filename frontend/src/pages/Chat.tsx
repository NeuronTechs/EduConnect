import ChatContent from "@/components/Chat/ChatContent";
import ListChat from "@/components/Chat/ListChat";
import React from "react";

const Chat = () => {
  return (
    <div className="flex h-full overflow-auto gap-3">
      <div className=" w-[250px]">
        <ListChat />
      </div>
      <div className="flex-1">
        <ChatContent />
      </div>
    </div>
  );
};

export default Chat;
