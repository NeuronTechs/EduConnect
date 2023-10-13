import { Avatar } from "@material-tailwind/react";
import {
  ChatCenteredDots,
  PlayCircle,
  Star,
  User,
} from "@phosphor-icons/react";

const Instructor = () => {
  return (
    <div className="w-full h-full lg:p-[10px] p-[5px]">
      <div className="flex items-center justify-start py-[6px]">
        <Avatar
          loading="lazy"
          className="w-[80px] h-[80px]"
          src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
          alt="avatar"
        />
        <div className="lg:p-[10px] p-[5px]">
          <p className="font-semibold">Teacher Name</p>
          <p className="font-semibold">Front end developer</p>
          <div className="flex items-center">
            <p className="flex items-center justify-center mr-5">
              <Star size={20} color="yellow" weight="fill" className="mr-1" />
              4.5 sao
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <ChatCenteredDots size={20} className="mr-1" />
              100 bình luận
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <User size={20} className="mr-1" />
              362 học sinh
            </p>
            <p className="flex items-center justify-start mr-5">
              <PlayCircle size={20} className="mr-1" />
              20 khóa học
            </p>
          </div>
        </div>
      </div>
      <div className="p-[10px] lg:p-0 lg:my-3">
        This course is available as part of When you enroll in this course,
        you'll also be asked to select a specific program. Learn new concepts
        from industry experts Gain a foundational understanding of a subject or
        tool Develop job-relevant skills with hands-on projects Earn a shareable
        career certificate
      </div>
    </div>
  );
};

export default Instructor;
