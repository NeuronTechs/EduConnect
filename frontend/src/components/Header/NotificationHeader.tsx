import { Bell } from "@phosphor-icons/react";

const NotificationHeader = () => {
  return (
    <div>
      <div className="notification-header bg-blue-gray-100/50 rounded-full p-2 flex items-center justify-center shadow-md">
        <Bell size={23} className="text-gray-600" />
      </div>
    </div>
  );
};

export default NotificationHeader;
