import React from "react";
interface propsSidebar {
  isOpen: boolean;
}
const Sidebar = (props: propsSidebar): React.ReactElement => {
  return (
    <div
      className={`w-[250px] h-screen shadow-md z-50 bg-gray-100 fixed top-0 left-0 xl:translate-x-0 ${
        props.isOpen ? "-translate-x-[250px]" : "-translate-x-0"
      } transition-all delay-200`}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
