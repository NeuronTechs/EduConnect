import assets from "@/assets";
import { ITeacher } from "@/types/type";
import {
  Books,
  FacebookLogo,
  LinkSimple,
  LinkedinLogo,
  UsersThree,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
interface IProps {
  data: ITeacher;
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

        <h5 className="text-base font-normal">{props.data.name}</h5>
        {/* position */}
        <h5 className="text-sm font-bold">
          Từng học ở trường: {props.data.school}
        </h5>
        <h5 className="text-sm font-bold">{props.data.position}</h5>
        {/*  */}
        <div className="flex items-center space-x-14">
          <div className="space-x-4 flex">
            <Books size={20} weight="fill" />
            <p className="text-sm font-light">{`${props.data.totalCourse} khoá học`}</p>
          </div>
          {/* total student */}
          <div className="space-x-4 flex">
            <UsersThree size={20} weight="fill" />
            <p className="text-sm font-light">
              {props.data.totalStudent} học sinh
            </p>
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
            <p className="text-sm font-light">
              {" "}
              {props.data.scoreReview} ({props.data.totalReview}){" "}
            </p>
          </div>
        </div>
        <h5 className="text-base font-bold">Giới thiệu</h5>
        <p className="text-base font-medium text-gray-500 dark:text-gray-400 text-justify">
          {props.data.introduce}
        </p>
      </div>
      {/* social */}
      <div className="w-[25%] flex flex-col items-center justify-center space-y-4">
        <div className="h-[200px] w-[200px] bg-gray-400 rounded-full">
          <img src={assets.images.avatar1} alt="" className="w-full h-full" />
        </div>
        <Link to={props.data.linkWeb}>
          <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
            <LinkSimple size={20} weight="bold" />
            <p>trang web</p>
          </div>
        </Link>
        <Link to={props.data.linkFacebook}>
          <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
            <FacebookLogo size={20} weight="bold" />
            <p>faceboook</p>
          </div>
        </Link>
        <Link to={props.data.linkYoutube}>
          <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
            <YoutubeLogo size={20} weight="bold" />
            <p>youtube</p>
          </div>
        </Link>
        <Link to={props.data.linkLinkedin}>
          <div className="p-4 w-[200px] flex items-center justify-center space-x-2 text-base font-bold  border border-gray-400 rounded-md cursor-pointer hover:bg-blue-100/50">
            <LinkedinLogo size={20} weight="bold" />
            <p>Linkedin</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherInformation;
