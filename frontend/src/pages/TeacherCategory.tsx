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
      id: "1",
      name: "Jose Portilla",
      avatar: "https://img-c.udemycdn.com/user/200_H/6456344_6e1d_2.jpg",
      position: "Trưởng phòng Khoa học dữ liệu tại Pierian Training",
      school: "Đại học Santa Clara",
      totalStudent: 3548718,
      scoreReview: 4.5,
      totalReview: 3486845,
      introduce:
        "Jose Marcial Portilla có bằng Cử nhân và Thạc sĩ Kỹ thuật Cơ khí củaĐại học Santa Clara và có nhiều năm kinh nghiệm làm giảng viên và huấnluyện viên chuyên nghiệp về Khoa học Dữ liệu, Học máy và Lập trìnhPython. Ông có các ấn phẩm và bằng sáng chế trong nhiều lĩnh vực khácnhau như vi lỏng, khoa học vật liệu và khoa học dữ liệu. Trong suốt sựnghiệp của mình, anh ấy đã phát triển bộ kỹ năng phân tích dữ liệu vàanh ấy hy vọng sẽ sử dụng kinh nghiệm giảng dạy và khoa học dữ liệucủa mình để giúp những người khác tìm hiểu sức mạnh của lập trình, khảnăng phân tích dữ liệu và các kỹ năng cần thiết để trình bày dữ liệutrực quan rõ ràng và đẹp mắt. Hiện tại, anh ấy làm Trưởng phòng Khoahọc Dữ liệu cho Đào tạo Pierian và cung cấp các khóa đào tạo trực tiếpvề khoa học dữ liệu và lập trình python cho nhân viên làm việc tại cáccông ty hàng đầu, bao gồm General Electric, Cigna, SalesForce,Starbucks, McKinsey và nhiều công ty khác. Vui lòng kiểm tra liên kết trang web để tìm hiểu thêm thông tin về các dịch vụ đào tạo.",
      linkWeb: "https://www.pieriandata.com/",
      linkFacebook: "https://www.facebook.com/",
      linkYoutube: "https://www.youtube.com/",
      linkLinkedin: "https://www.linkedin.com/",
      subject: "Khoa học dữ liệu",
      totalCourse: 10,
      email: "abc@gmail.com",
      phone: "09689301343",
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

        <TabsTeacherCategory idTeacher={data?.id} />
        {/* tab course review student */}
      </div>
    </PageTransition>
  );
};

export default TeacherCategory;
