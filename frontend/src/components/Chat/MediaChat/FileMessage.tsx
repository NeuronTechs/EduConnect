import { DownloadSimple, File } from "@phosphor-icons/react";
import React from "react";

const FileMessage = (): React.ReactElement => {
  return (
    <div className="bg-blue-100 p-2.5 rounded-md flex items-center justify-center min-w-[300px] gap-3">
      <div className="">
        <File size={40} weight="fill" className={"text-blue-600"} />
      </div>
      <div className="w-full flex flex-col items-center justify-start gap-2">
        <h5 className="text-base font-normal text-blue-600">
          Take my True Love by Te...
        </h5>
        <div className="flex items-center justify-between text-gray-500 w-full">
          <p className="text-base font-light">The Limeleter</p>
          <p className="text-base font-light ">8.4MB</p>
        </div>
      </div>
      <div className="text-blue-500">
        <DownloadSimple size={32} weight="fill" className="text-blue-600" />
      </div>
    </div>
  );
};

export default FileMessage;
