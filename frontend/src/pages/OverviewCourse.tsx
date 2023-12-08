import { Breadcrumbs, Spinner, Tooltip } from "@material-tailwind/react";
import DetailCourse from "../components/OverviewCourses/DetailCourse";
import BuyCourse from "../components/OverviewCourses/BuyCourse";
import { Video, WarningOctagon } from "@phosphor-icons/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  getCourseOverview,
  resetStoreCourseOverview,
} from "@/features/overviewCourse/courseOverviewSlice";
import { useNavigate, useParams } from "react-router-dom";
import { SliceState } from "@/types/type";
import { configRouter } from "@/configs/router";
import * as courseApi from "../api/courseApi/courseApi";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const OverviewCourse = () => {
  const titleDataReport = [
    "Giáo viên không trung thực",
    "Có những từ ngữ thô tục",
    "Đánh cắp bài giảng",
    "Đánh cắp ý tưởng",
    "Khác",
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("Giáo viên không trung thực");
  const [problem, setProblem] = useState<string>("");
  const [image, setImage] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourseOverview(id as string));

    return () => {
      dispatch(resetStoreCourseOverview());
    };
  }, [dispatch]);

  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  const [sessionProblem, setSessionProblem] = useState<string>(
    currentCourse?.sessions[0]?.session_id as string
  );
  const [lectureProblem, setLectureProblem] = useState<string>(
    currentCourse?.sessions[0]?.lectures[0]?.lecture_id as string
  );

  const loadingGetOverviewCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.loading
  );

  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );

  const handleGetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage([...files]);
    }
  };

  const handleOpen = () => {
    setProblem("");
    // setTitle("");
    setImage([]);
    setOpen(!open);
  };

  const handleClose = () => {
    setProblem("");
    // setTitle("");
    setImage([]);
    setOpen(!open);
  };

  const handleReport = async () => {
    setLoading(true);
    if (
      title !== "" &&
      currentUser?.user_id !== "" &&
      currentCourse?.course_id !== "" &&
      lectureProblem !== "" &&
      sessionProblem !== "" &&
      problem !== "" &&
      image.length > 0
    ) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("student_id", currentUser?.user_id as string);
      formData.append("course_id", currentCourse?.course_id as string);
      formData.append("lecture_id", lectureProblem as string);
      formData.append("session_id", sessionProblem as string);
      formData.append("content", problem);
      image.forEach((img) => {
        formData.append("files", img);
      });
      try {
        const data = await courseApi.addComplaint(formData);
        if (data?.status === 200) {
          toast.success("Khiếu nại thành công");
          setLoading(false);
        }
      } catch (error: any) {
        toast.error("Khiếu nại thất bại. Mã lỗi: " + error?.message);
        setLoading(false);
      }
      setProblem("");
      setTitle("");
      setLectureProblem("");
      setSessionProblem("");
      setImage([]);
      setOpen(!open);
    } else {
      console.log(
        title !== "",
        currentUser?.user_id !== "",
        currentCourse?.course_id !== "",
        lectureProblem !== "",
        sessionProblem !== "",
        problem !== "",
        image.length > 0
      );
      setLoading(false);
      alert("Vui lòng nhập đầy đủ các trường");
    }
  };

  const handleGetTitle = (event: ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
  };

  const handleRedirectHomePage = () => {
    navigate(configRouter.home);
  };

  const handleGetSession = (e: ChangeEvent<HTMLSelectElement>) => {
    setSessionProblem(e.target.value);
    const data: string | undefined = currentCourse?.sessions?.filter(
      (session) => session?.session_id === e.target.value
    )[0]?.lectures[0]?.lecture_id;
    setLectureProblem(data ? data : "");
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
          <a className="text-[14px]" href={`/course/${id}`}>
            Course
          </a>
        </Breadcrumbs>
      </div>
      {loadingGetOverviewCourse ? (
        <div className="flex justify-center">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <>
          {currentCourse ? (
            <>
              <div className="lg:w-full h-auto flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-x-2">
                <DetailCourse />
                <BuyCourse />
              </div>
              {currentCourse?.student_id !== null &&
                currentCourse?.student_id?.includes(
                  currentUser?.user_id as string
                ) && (
                  <div className="absolute bottom-10 right-10">
                    <Tooltip content="Báo cáo" placement="top">
                      <button
                        onClick={handleOpen}
                        className="rounded-[50%] bg-blue-500 p-2 text-white text-center"
                      >
                        <WarningOctagon
                          size={32}
                          color="#ffffff"
                          weight="fill"
                        />
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
                        <select
                          className="w-full rounded-md mb-3"
                          placeholder="Lựa chọn session"
                          onChange={(e) => handleGetSession(e)}
                        >
                          {currentCourse?.sessions.map((session) => (
                            <option
                              key={session?.session_id}
                              value={session?.session_id}
                            >
                              {session?.name}
                            </option>
                          ))}
                        </select>
                        {sessionProblem && (
                          <select
                            className="w-full rounded-md mb-3"
                            placeholder="Lựa chọn lecture"
                            onChange={(e) => setLectureProblem(e.target.value)}
                          >
                            {currentCourse?.sessions
                              ?.filter(
                                (session) =>
                                  session?.session_id === sessionProblem
                              )[0]
                              ?.lectures?.map((lecture) => (
                                <option
                                  key={lecture?.lecture_id}
                                  value={lecture?.lecture_id}
                                >
                                  {lecture?.lecture_name}
                                </option>
                              ))}
                          </select>
                        )}
                        <div className="w-full max-h-[200px]">
                          <textarea
                            className="w-full max-h-[200px] rounded-md"
                            placeholder="vấn đề"
                            onChange={(e) => setProblem(e.target.value)}
                          />
                        </div>
                        {image.length === 0 ? (
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
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleGetImage(e)}
                            />
                            <label htmlFor="file">
                              <img
                                className="w-full h-full object-contain"
                                src={URL.createObjectURL(image[0])}
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
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleReport}
                        >
                          <span>{loading ? <Spinner /> : "Báo cáo"}</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </div>
                )}
            </>
          ) : (
            <div className="w-full h-[400px] flex flex-col justify-center items-center">
              <Video size={100} />
              <p>Khóa học không tồn tại</p>
              <button
                onClick={handleRedirectHomePage}
                className="py-2 px-3 bg-blue-500 text-white rounded-md my-3"
              >
                Xem thêm khóa học
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OverviewCourse;
