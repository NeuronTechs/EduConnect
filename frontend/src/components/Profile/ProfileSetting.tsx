import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import PublicProfile from "./PublicProfile";
import ChangePassword from "./ChangePassword";
import CheckoutHistory from "./CheckoutHistory";
const ProfileSetting = () => {
  return (
    <div className="w-full xl:w-[75%] h-[90vh] bg-white shadow-2xl p-10 m-5 mt-5 rounded-xl">
      <Tabs value="PublicProfile">
        <TabsHeader>
          <Tab key={"PublicProfile"} value={"PublicProfile"}>
            Thông tin cá nhân
          </Tab>
          <Tab key={"ChangePassword"} value={"ChangePassword"}>
            Mật khẩu
          </Tab>
          <Tab key={"Payment"} value={"Payment"}>
            Thanh toán
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"PublicProfile"} value={"PublicProfile"}>
            <PublicProfile />
          </TabPanel>
          <TabPanel key={"ChangePassword"} value={"ChangePassword"}>
            <ChangePassword />
          </TabPanel>
          <TabPanel key={"Payment"} value={"Payment"}>
            <CheckoutHistory />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProfileSetting;
