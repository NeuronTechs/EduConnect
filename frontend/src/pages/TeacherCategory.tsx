import InfoTeacherCategoryLoading from "@/components/Loading/InfoTeacherCategoryLoading";
import PageTransition from "@/components/PageTransition";
import TabsTeacherCategory from "@/components/TeacherCategory/TabsTeacherCategory";
import TeacherInformation from "@/components/TeacherCategory/TeacherInformation";
import { ITeacher } from "@/types/type";
import React from "react";
import * as teacherApi from "@/api/teacherApi/teacherApi";
import { useParams } from "react-router-dom";

const TeacherCategory = (): React.ReactElement => {
  const [data, setData] = React.useState<ITeacher>();
  const [isLoading, setIsLoading] = React.useState(true);
  const params = useParams<{ id: string }>();
  React.useEffect(() => {
    const requestApi = async () => {
      setIsLoading(true);
      try {
        const res = await teacherApi.getTeacherDetail({
          id: params.id ? params.id : "",
        });
        setData(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    requestApi();
  }, [params.id]);

  return (
    <PageTransition>
      <div className="flex flex-col space-y-5">
        {/* profile */}
        {isLoading ? (
          <InfoTeacherCategoryLoading />
        ) : (
          <TeacherInformation data={data ? data : ({} as ITeacher)} />
        )}
        <TabsTeacherCategory />
        {/* tab course review student */}
      </div>
    </PageTransition>
  );
};

export default TeacherCategory;
