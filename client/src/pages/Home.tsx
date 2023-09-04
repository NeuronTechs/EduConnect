import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, test } from "../features/auth/authSlice";
import { Auth } from "../type";
import { AppDispatch } from "../redux/store";
const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const loginHandler = () => {
    console.log("login");

    const auth: Auth = { username: username, password: password };
    dispatch(login(auth));
  };
  const testHandler = () => {
    dispatch(test());
  };
  return (
    <div className="flex flex-col w-36">
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        className="border-solid border-2 border-sky-500"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="text"
        className="border-solid border-2 border-sky-500"
      />
      <button onClick={loginHandler}>Login</button>
      <button onClick={testHandler}>test</button>
    </div>
  );
};

export default Home;
