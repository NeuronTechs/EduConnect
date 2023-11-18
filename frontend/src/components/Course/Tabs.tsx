import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React from "react";
import Overview from "../OverviewCourses/Tabs/Overview";
import { ILecture } from "@/types/type";
import Comments from "./Comments";
interface Props {
  currentLecture: ILecture | null;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
}
const TabsInfo = ({ currentLecture, setCurrentTime, currentTime }: Props) => {
  const [activeTab, setActiveTab] = React.useState("Thảo Luận");
  const tabHeaders = ["Tổng quan", "Thảo Luận"];
  return (
    <div className="w-[100wh] h-auto bg-white p-3  shadow-xl">
      <h1 className="text-xl font-bold">{currentLecture?.lecture_name}</h1>
      <div className="flex space-x-4 text-xs text-gray-500">
        <p className="cursor-pointer">Vũ Thanh Sang </p>
        <span>|</span>
        <p className="cursor-pointer">Figma</p>
        <span>|</span>
        <p className="cursor-pointer">Follow</p>
      </div>
      <div className="mt-7 ">
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
            <TabPanel key={"Tổng quan"} value={"Tổng quan"}>
              <Overview />
            </TabPanel>

            <TabPanel key={"Thảo Luận"} value={"Thảo Luận"}>
              <Comments
                setCurrentTime={setCurrentTime}
                currentTime={currentTime}
              />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsInfo;
