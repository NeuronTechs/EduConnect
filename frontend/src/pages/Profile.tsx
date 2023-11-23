import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileSetting from "../components/Profile/ProfileSetting";

const Profile = () => {
  return (
    <div className="block xl:flex w-full space-x-5">
      <ProfileInfo />
      <ProfileSetting />
    </div>
  );
};

export default Profile;
