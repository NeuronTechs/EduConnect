import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import PublicProfile from "./PublicProfile";
import Notification from "./Notification";
import Privacy from "./Privacy";
const ProfileSetting = () => {
  return (
    <div className="w-[75%] h-[90vh] bg-white shadow-2xl p-10 m-5 mt-5 rounded-xl">
      <Tabs value="PublicProfile">
        <TabsHeader>
          <Tab key={"PublicProfile"} value={"PublicProfile"}>
            Public Profile
          </Tab>
          <Tab key={"Notification"} value={"Notification"}>
            Notification
          </Tab>
          <Tab key={"Privacy"} value={"Privacy"}>
            Privacy
          </Tab>
          <Tab key={"Payment"} value={"Payment"}>
            Payment
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel key={"PublicProfile"} value={"PublicProfile"}>
            <PublicProfile />
          </TabPanel>
          <TabPanel key={"Notification"} value={"Notification"}>
            <Notification />
          </TabPanel>
          <TabPanel key={"Privacy"} value={"Privacy"}>
            <Privacy />
          </TabPanel>
          <TabPanel key={"Payment"} value={"Payment"}>
            Payment
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProfileSetting;
