import TabsTeacherCategory from "@/components/TeacherCategory/TabsTeacherCategory";
import TeacherInformation from "@/components/TeacherCategory/TeacherInformation";
import { ReactElement } from "react";

const TeacherCategory = (): ReactElement => {
  return (
    <div className="flex flex-col space-y-5">
      {/* profile */}
      <TeacherInformation data={{}} />
      <TabsTeacherCategory />
      {/* tab course review student */}
    </div>
  );
};

export default TeacherCategory;
