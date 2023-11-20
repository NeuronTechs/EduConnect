import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import * as authApi from "../api/authApi/authApi";

function ForgetPassword() {
  const [gmail, setEmail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();

  useEffect(() => {
    setError("");
  }, [gmail]);

  const handleForgetPass = async () => {
    setLoading(true);
    if (gmail === "") {
      setError("Hãy nhập email!!!");
      if (inputRef.current) inputRef.current.focus();
    } else {
      try {
        const data = await authApi.forgetPassword(gmail);
        if (data?.status === 200) {
          setLoading(false);
          alert("Vui lòng kiểm tra email của bạn để thay đổi mật khẩu");
          nav(configRouter.login);
        }
      } catch (error: any) {
        setLoading(false);
        alert(
          "Tìm kiếm không trả về kết quả nào. Vui lòng thử lại với email khác."
        );
        if (inputRef.current) inputRef.current.focus();
      }
    }
  };
  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-1/2 h-[300px] flex flex-col justify-center text-black absolute top-1/4 left-1/4 shadow-md bg-white rounded-lg p-3">
        <div className="m-[10px_15px]">
          <Typography className="font-semibold text-[25px]">
            Tìm tài khoản của bạn
          </Typography>
        </div>
        <div className="m-[10px_12px]">
          <Typography className="text-[15px]">
            Vui lòng nhập email để tìm kiếm tài khoản của bạn.
          </Typography>
        </div>
        <div className="m-[10px_12px]">
          <input
            type="search"
            ref={inputRef}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Nhập email..."
            style={{
              width: "100%",
              margin: "5px 0",
              color: "black",
              padding: "15px",
              fontSize: "15px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          {error && <p className="italic text-[14px] text-red-600">{error}</p>}
        </div>
        <div className="m-[10px_15px] flex flex-row justify-end">
          <Link
            to={configRouter.login}
            className="italic text-[14px] text-blue-400"
          >
            Bạn đã có tài khoản?
          </Link>
        </div>
        <div className="m-[10px_15px] flex flex-row justify-end">
          <Button onClick={handleForgetPass}>
            {loading ? <Spinner /> : "Tìm kiếm"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
