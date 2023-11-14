import React from "react";
import "./LoadingPage.css";
const LoadingPage = (): React.ReactElement => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="tetrominos">
        <div className="tetromino box1"></div>
        <div className="tetromino box2"></div>
        <div className="tetromino box3"></div>
        <div className="tetromino box4"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
