import { Avatar } from "@material-tailwind/react";
import { PlayCircle, Star, User } from "@phosphor-icons/react";

const Instructor = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-start">
        <Avatar
          loading="lazy"
          className="w-[80px] h-[80px]"
          src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
          alt="avatar"
        />
        <div className="mx-3">
          <p className="font-semibold">Teacher Name</p>
          <p>Front end developer</p>
          <div className="flex items-center">
            <p className="flex items-center justify-start mr-5">
              <Star size={20} color="#e58b24" weight="fill" />
              4.5
            </p>
            <p className="hidden lg:display lg:flex items-center justify-start mr-5">
              <User size={20} />
              362 học sinh
            </p>
            <p className="flex items-center justify-start mr-5">
              <PlayCircle size={20} />
              20 khóa học
            </p>
          </div>
        </div>
      </div>
      <div className="my-3">
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
