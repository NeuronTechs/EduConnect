import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import Overview from "../OverviewCourses/Tabs/Overview";
import Reviews from "../OverviewCourses/Tabs/Reviews";
import Modules from "./Modules";

const TabsInfo = () => {
  const [activeTab, setActiveTab] = React.useState("Overview");
  const tabHeaders = ["Overview", "Reviews"];
  return (
    <div className="mt-7 w-[90%] ">
      <h1 className="text-xl font-bold">Introduction Figma Basic to Advance</h1>
      <div className="flex space-x-4 text-xs text-gray-500">
        <p className="cursor-pointer">Vũ Thanh Sang </p>
        <span>|</span>
        <p className="cursor-pointer">Figma</p>
        <span>|</span>
        <p className="cursor-pointer">Follow</p>
      </div>
      <div className="mt-7">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 "
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {tabHeaders.map((value) => {
              return (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={
                    activeTab === value
                      ? "text-gray-900 font-bold"
                      : "font-bold"
                  }
                >
                  {value}
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody>
            <TabPanel key={"Overview"} value={"Overview"}>
              <Overview />
            </TabPanel>

            <TabPanel key={"Reviews"} value={"Reviews"}>
              <Reviews />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsInfo;
