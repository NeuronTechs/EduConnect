import { Breadcrumbs } from "@material-tailwind/react";
import DetailCourse from "../components/OverviewCourses/DetailCourse";
import BuyCourse from "../components/OverviewCourses/BuyCourse";

const OverviewCourse = () => {
  return (
    <div className="flex flex-col w-full h-full lg:space-x-2 lg:gap-2">
      <div className="p-2 w-full h-auto">
        <Breadcrumbs className="p-0">
          <a href="/" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a className="text-[14px]" href="/course">
            Course
          </a>
        </Breadcrumbs>
      </div>
      <div className="lg:w-full h-auto flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-x-2">
        <DetailCourse />
        <BuyCourse />
      </div>
    </div>
  );
};

export default OverviewCourse;
