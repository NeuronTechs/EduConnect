import { useRef, useState } from "react";
import * as authApi from "../../api/authApi/authApi";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  const handleResetPass = async () => {
    if (password === "" || confirmPassword === "") {
      inputRef.current?.focus();
    } else {
      if (password !== confirmPassword) {
        toast.error("Mật khẩu không trùng!!!");
        inputRef.current?.focus();
      } else {
        try {
          setLoading(true);
          const data = await authApi.changePassword(
            currentUser?.username as string,
            password
          );
          if (data?.status === 200) {
            setLoading(false);
            toast.success("Thay đổi mật khẩu thành công");
            setPassword("");
            setConfirmPassword("");
          } else {
            setLoading(false);
            toast.error(data?.message);
          }
        } catch (error: any) {
          setLoading(false);
          console.log(error);
          toast.error(error?.message);
        }
      }
    }
  };

  const handleResetPassOnKey = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleResetPass();
    }
  };

  return (
    <div className=" ">
      <div className="text-center border-b-2 border-gray-500">
        <h1 className="font-bold text-black mb-2"> Thay đổi mật khẩu </h1>
      </div>
      <div className="h-full w-full mt-3">
        <div className="h-auto flex flex-col justify-center color-black shadow-md bg-white rounded-lg">
          <div className="my-3 mx-3">
            <p className="text-md italic">Mật khẩu mới</p>
          </div>
          <div className="mb-3 mx-3">
            <input
              type="password"
              ref={inputRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Nhập mật khẩu mới..."
              className="p-3 w-full text-black border border-solid border-gray-300 outline-none rounded-md"
            />
          </div>
          <div className="mb-3 mx-3">
            <p className="text-md italic">Xác nhận mật khẩu mới</p>
          </div>
          <div className="mb-3 mx-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              onKeyDown={(e) => handleResetPassOnKey(e)}
              placeholder="Nhập xác nhận mật khẩu mới..."
              className="p-3 text-black border border-solid border-gray-300 outline-none w-full rounded-md"
            />
          </div>
          <div className="flex flex-row justify-end mx-3 mb-3">
            <button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={handleResetPass}
            >
              {loading ? <Spinner /> : "Xác nhận"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
