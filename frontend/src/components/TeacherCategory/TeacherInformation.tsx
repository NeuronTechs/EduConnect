import assets from "@/assets";
import {
  FacebookLogo,
  LinkSimple,
  LinkedinLogo,
  UsersThree,
  YoutubeLogo,
} from "@phosphor-icons/react";
interface IProps {
  data: object;
}
const TeacherInformation = (props: IProps) => {
  return (
    <div className="h-[600px] bg-white rounded flex  items-start px-6 py-4">
      <div className="w-[75%] flex flex-col space-y-4 justify-start items-start">
        {/* name */}
        <div className="w-full flex justify-between items-center">
          <h4 className="text-3xl font-semibold">Giáo Viên</h4>
          <button
            type="button"
            className="text-white bg-blue-300 hover:bg-blue-400 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-600"
          >
            Theo dõi
          </button>
        </div>

        <h5 className="text-base font-normal">Jose Portilla</h5>
        {/* position */}
        <h5 className="text-sm font-bold">
          Trưởng phòng Khoa học dữ liệu tại Pierian Training
        </h5>
        {/*  */}
        <div className="flex items-center space-x-14">
          {/* total student */}
          <div className="space-x-4 flex">
            <UsersThree size={20} weight="fill" />
            <p className="text-sm font-light"> 3,548,718</p>
          </div>
          {/* ranking */}
          <div className="space-x-4 flex">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <p className="text-sm font-light"> 4,5 (1,093,551) </p>
          </div>
        </div>
        <h5 className="text-base font-bold">Giới thiệu</h5>
        <p className="text-base font-medium text-gray-500 dark:text-gray-400 text-justify">
          Jose Marcial Portilla có bằng Cử nhân và Thạc sĩ Kỹ thuật Cơ khí của
          Đại học Santa Clara và có nhiều năm kinh nghiệm làm giảng viên và huấn
          luyện viên chuyên nghiệp về Khoa học Dữ liệu, Học máy và Lập trình
          Python. Ông có các ấn phẩm và bằng sáng chế trong nhiều lĩnh vực khác
          nhau như vi lỏng, khoa học vật liệu và khoa học dữ liệu. Trong suốt sự
          nghiệp của mình, anh ấy đã phát triển bộ kỹ năng phân tích dữ liệu và
          anh ấy hy vọng sẽ sử dụng kinh nghiệm giảng dạy và khoa học dữ liệu
          của mình để giúp những người khác tìm hiểu sức mạnh của lập trình, khả
          năng phân tích dữ liệu và các kỹ năng cần thiết để trình bày dữ liệu
          trực quan rõ ràng và đẹp mắt. Hiện tại, anh ấy làm Trưởng phòng Khoa
          học Dữ liệu cho Đào tạo Pierian và cung cấp các khóa đào tạo trực tiếp
          về khoa học dữ liệu và lập trình python cho nhân viên làm việc tại các
          công ty hàng đầu, bao gồm General Electric, Cigna, SalesForce,
          Starbucks, McKinsey và nhiều công ty khác. Vui lòng kiểm tra liên kết
          trang web để tìm hiểu thêm thông tin về các dịch vụ đào tạo.
        </p>
      </div>
      {/* social */}
      <div className="w-[25%] flex flex-col items-center justify-center space-y-4">
        <div className="h-[200px] w-[200px] bg-gray-400 rounded-full">
          <img src={assets.images.avatar1} alt="" className="w-full h-full" />
        </div>
        <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
          <LinkSimple size={20} weight="bold" />
          <p>trang web</p>
        </div>
        <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
          <FacebookLogo size={20} weight="bold" />
          <p>faceboook</p>
        </div>
        <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
          <YoutubeLogo size={20} weight="bold" />
          <p>youtube</p>
        </div>
        <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
          <LinkedinLogo size={20} weight="bold" />
          <p>Linkedin</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherInformation;
