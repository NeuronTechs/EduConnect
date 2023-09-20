import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, test } from "../features/auth/authSlice";
import { Auth } from "../type";
import { AppDispatch } from "../redux/store";
const Home = () => {
  return <div className="flex flex-col w-36">Home</div>;
};

export default Home;
