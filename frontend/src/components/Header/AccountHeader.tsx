import assets from "../../assets";

const AccountHeader = () => {
  return (
    <div>
      <div className="flex items-center justify-center px-3 py-2 gap-3">
        <div className="account-info flex flex-col justify-center items-end">
          <h5 className="text-sm font-medium">Nguyen Van Tu</h5>
          <p className="text-xs font-normal text-gray-600">HCMUTE</p>
        </div>
        <div className="avatar-account ">
          <img
            src={assets.images.avatar1}
            alt="avatar"
            className="rounded-full h-[40px] w-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
