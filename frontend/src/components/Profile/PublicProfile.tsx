import { useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import { SliceState } from "@/types/type";
const PublicProfile = () => {
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice?.currentUser
  );

  return (
    <div className="flex flex-col items-center">
      <div className="text-center w-full border-b-2 border-gray-500">
        <h1 className="font-bold text-black mb-3"> Thông tin cá nhân </h1>
      </div>
      <div className="relative w-full flex items-center justify-center mb-4 mt-8">
        <img src={currentUser?.avatar as string} alt="" className="h-[80px]" />
      </div>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex w-full space-x-7">
          <Input
            label="Full Name"
            crossOrigin="anonymous"
            value={currentUser?.full_name}
          ></Input>
          <Input
            label="Email Address"
            crossOrigin="anonymous"
            value={currentUser?.email}
          ></Input>
        </div>
        <Input
          label="Address"
          crossOrigin="anonymous"
          value={currentUser?.address}
        ></Input>
        <div className="flex w-full space-x-7">
          <Input
            label="Số điện thoại"
            crossOrigin="anonymous"
            value={currentUser?.phone}
          ></Input>
          {/* <Input label="State/Province" crossOrigin="anonymous"></Input> */}
        </div>
        {/* <div className="flex w-full space-x-7">
          <Input label="Zip Code" crossOrigin="anonymous"></Input>
          <Input label="Country" crossOrigin="anonymous"></Input>
        </div> */}
      </div>
      {/* <div className="flex space-x-7 m-10 font-bold">
        <button className="w-44 h-10 bg-gray-900 text-white rounded-lg ">
          Hủy
        </button>
        <button className="w-44 h-10 border-2 border-gray-900 text-gray-900 rounded-lg ">
          Lưu
        </button>
      </div> */}
    </div>
  );
};

export default PublicProfile;
