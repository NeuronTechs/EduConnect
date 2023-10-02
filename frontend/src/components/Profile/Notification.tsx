import React from "react";

const Notification = () => {
  return (
    <div className=" ">
      <div className="text-center border-b-2 border-gray-500">
        <h1 className="font-bold text-black"> Notifications </h1>
        Turn promotional email notifications from EduConnect on or off
      </div>
      <div className="font-bold text-black text-sm flex flex-col gap-5 mt-10">
        <h1> I want to receive:</h1>
        <div className="w-full border-[0.5px] border-black flex space-x-5 items-center p-[7px]">
          <input type="checkbox" />
          <h1>
            Promotions, course recommendations, and helpful resource form
            EduConnect
          </h1>
        </div>
        <div className="w-full border-[0.5px] border-black flex space-x-5 items-center p-[7px]">
          <input type="checkbox" />
          <div>
            <h1>
              Announcements form instructors whose course(s) I'm enrolled in
            </h1>
            <h2 className="font-light">
              To adjust this preference by course, leave this box checked and go
              to the course dashboard and click on "Options" to opt in or out of
              specific announcements
            </h2>
          </div>
        </div>

        <div className="w-full border-[0.5px] border-black flex space-x-5 items-center p-[7px] mt-10">
          <input type="checkbox" />
          <div>
            <h1>Don't send me any promotional emails</h1>
            <h2 className="font-light">
              if this box is checked, please note that you will continue to
              receive important transactional emails like purchase receipts
            </h2>
          </div>
        </div>
        <button className="w-44 h-10 bg-gray-900 text-white rounded-lg ">
          Save
        </button>
      </div>
    </div>
  );
};

export default Notification;
