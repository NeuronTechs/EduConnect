import InfoTeacherCategoryLoading from "@/components/Loading/InfoTeacherCategoryLoading";
import PageTransition from "@/components/PageTransition";
import TabsTeacherCategory from "@/components/TeacherCategory/TabsTeacherCategory";
import TeacherInformation from "@/components/TeacherCategory/TeacherInformation";
import { ITeacher } from "@/types/type";
import React, { ReactElement } from "react";

const TeacherCategory = (): ReactElement => {
  const [data, setData] = React.useState<ITeacher>();
  React.useEffect(() => {
    setData({
      teacher_id: "t123",
      username: "Jionson whet",
      introduce:
        "I am a professional UI/UX designer with 10 years of experience.",
      subject: "Ui/UX thiết kế",
      educational_level: "12",
      email: "tu21591@gmail.com",
      phone: "123-456-7890",
      avatar: "fallback",
      course: "UI/UX Design",
      major: "IT",
      school: "HCMUTE",
      address_school: "HCM",
      amount: 100,
      totalStudent: 100,
      scoreReview: 4.5,
      totalReview: 100,
      totalCourse: 100,
      linkWeb: "https://jionsonwhet.com",
      linkFacebook: "",
      linkYoutube: "",
      linkLinkedin: "",
      user: {
        username: "tu21591",
        full_name: "Nguyễn Văn Tú",
        email: "",
        avatar: "",
        phone: "",
        role: "student",
        birthday: "",
        address: "",
        created_at: "",
        updated_at: "",
      },
    }); // get data from api
  }, []);

  return (
    <PageTransition>
      <div className="flex flex-col space-y-5">
        {/* profile */}
        {!data ? (
          <InfoTeacherCategoryLoading />
        ) : (
          <TeacherInformation data={data} />
        )}

        <TabsTeacherCategory idTeacher={data?.teacher_id} />
        {/* tab course review student */}
      </div>
    </PageTransition>
  );
};

export default TeacherCategory;
