import { ChatCircleDots } from "@phosphor-icons/react";

const MessageHeader = () => {
  return (
    <div>
      <div className="notification-header bg-blue-gray-100/50 rounded-full p-2 flex items-center justify-center shadow-md">
        <ChatCircleDots size={23} className="text-gray-600" />
      </div>
    </div>
  );
};

export default MessageHeader;
