import React from "react";
import assets from "../../assets";

const Task = () => {
  return (
    <div className="m-2">
      <div className="flex justify-between text-sm">
        <h1>
          <strong> Upcoming Task</strong>
        </h1>
        <button className="text-blue-gray-400 underline">See all</button>
      </div>
      <div className="mt-6 flex text-sm space-x-4 mb-6">
        <div className="avatar-account ">
          <img
            src={assets.images.task}
            alt="avatar"
            className="rounded-full h-[40px] w-[40px]"
          />
        </div>
        <div>
          <h1>Discussion Algorithm</h1>
          <div className="text-gray-600">8:00 AM - 15:00 PM</div>
        </div>
      </div>
    </div>
  );
};

export default Task;