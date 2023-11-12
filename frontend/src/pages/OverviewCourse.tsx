import { Breadcrumbs, Tooltip } from "@material-tailwind/react";
import DetailCourse from "../components/OverviewCourses/DetailCourse";
import BuyCourse from "../components/OverviewCourses/BuyCourse";
import { WarningOctagon } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getCourseOverview } from "@/features/overviewCourse/courseOverviewSlice";

const OverviewCourse = () => {
  const titleDataReport = [
    "Giáo viên không trung thực",
    "Có những từ ngữ thô tục",
    "Đánh cắp bài giảng",
    "Đánh cắp ý tưởng",
    "Khác",
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [problem, setProblem] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(getCourseOverview('15938'))
  },[])

  const handleGetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleOpen = () => {
    setProblem("");
    setTitle("");
    setImage("");
    setOpen(!open);
  };

  const handleClose = () => {
    setProblem("");
    setTitle("");
    setImage("");
    setOpen(!open);
  };

  const handleReport = () => {
    alert(title + " " + problem + " " + image);
    setProblem("");
    setTitle("");
    setImage("");
    setOpen(!open);
  };

  const handleGetTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
  };

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
      <div className="absolute bottom-10 right-10">
        <Tooltip content="Báo cáo" placement="top">
          <button
            onClick={handleOpen}
            className="rounded-[50%] bg-blue-500 p-2 text-white text-center"
          >
            <WarningOctagon size={32} color="#ffffff" weight="fill" />
          </button>
        </Tooltip>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Báo cáo</DialogHeader>
          <DialogBody>
            <div className="w-full my-3">
              <select
                className="w-full rounded-md"
                placeholder="Lựa chọn vấn đề"
                onChange={(e) => handleGetTitle(e)}
              >
                {titleDataReport.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full max-h-[200px]">
              <textarea
                className="w-full max-h-[200px] rounded-md"
                placeholder="vấn đề"
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>
            {image === "" ? (
              <div className="w-full h-[50px] my-3">
                <input
                  type="file"
                  placeholder="Image"
                  onChange={(e) => handleGetImage(e)}
                />
              </div>
            ) : (
              <div className="w-full h-[200px] my-3">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => handleGetImage(e)}
                />
                <label htmlFor="file">
                  <img
                    className="w-full h-full object-contain"
                    src={image}
                    alt="image"
                  />
                </label>
              </div>
            )}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Hủy</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleReport}>
              <span>Báo cáo</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default OverviewCourse;
