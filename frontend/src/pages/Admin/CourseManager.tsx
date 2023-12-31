import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { PencilSimple } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi/adminApi";
import { Select } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce ";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/const";
const TABLE_HEAD = [
  "Tên khóa học",
  "Tên giảng viên",
  "Hình ảnh",
  "Mô tả",
  "chủ đề",
  "Cấp bậc",
  "Ngôn ngữ",
  "Giá tiền",
  "Ngày tạo",
  "Trạng thái",
];
interface ICourseInfo {
  course_id: string;
  teacher_id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  discount: number;
  level: string;
  status: string;
  username: string;
  total_page: number;
  language: string;
  create_at: string;
}
interface Inputs {
  dataInput: string;
}
const CourseManager = () => {
  const [course, setCourse] = useState<ICourseInfo[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [selectStatus, setSelectStatus] = useState<string>("4");
  const getAllUser = async () => {
    try {
      setLoading(true);
      const data1 = await adminApi.getAllCourseWithTeacherData(
        currentPage,
        txtSearch,
        selectStatus
      );
      if (data1.status === 200) {
        setLoading(false);
        setCourse(data1?.data);
        setTotalPage(data1?.data[0].total_page);
        console.log(data1?.data[0]);
      } else {
        setLoading(false);
        setTotalPage(1);
        alert(data1?.message);
      }
      console.log(data1);
    } catch (error) {
      setLoading(false);
      setTotalPage(1);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, txtSearch, selectStatus]);

  const handleOpen = () => setOpen(!open);
  // const navigate = useNavigate();
  const handleBlock = (courseID: string, status: string) => {
    setCourseId(courseID);
    setStatus(status);
    setOpen(!open);
  };

  const handleUnlock = (courseID: string, status: string) => {
    setCourseId(courseID);
    setStatus(status);
    setOpen(!open);
  };

  const handleConfirm = async (statusValue: string) => {
    try {
      const data = await adminApi.setStatusCourse(statusValue, courseId);
      if (data.status === 200) {
        getAllUser();
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(!open);
  };

  const convertDate = (time: string) => {
    const utcDate = new Date(time);

    // Convert to local date and time
    const localDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    return localDate;
  };

  const {
    register,
    watch,
    // formState: { errors },
  } = useForm<Inputs>();
  const debouncedValue = useDebounce<string>(watch("dataInput"), 500);
  // const inputRef = React.useRef();
  React.useEffect(() => {
    console.log(debouncedValue);
    setTxtSearch(debouncedValue);
  }, [debouncedValue]);
  return (
    <div className="bg-white h-screen rounded-lg w-full flex flex-col items-center">
      <h1 className="text-center text-[24px] pt-3 mb-3">
        Danh Sách khóa học trong hệ thống
      </h1>
      <div className="w-full relative flex justify-end pr-10 py-3 gap-2 bg-white ">
        <div className="max-w-md">
          <Select
            onChange={(e) => setSelectStatus(e.target.value)}
            id="countries"
            required
          >
            <option value={4}>Tất cả</option>
            <option value={1}>Chưa duyệt</option>
            <option value={2}>Đã duyệt</option>
            <option value={3}>Bị khóa</option>
          </Select>
        </div>
        <form>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-[300px]"
          >
            Tìm kiếm
          </label>
          <div className="relative w-[300px] ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              {...register("dataInput")}
              type="search"
              id="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên khóa học..."
            />
          </div>
        </form>
      </div>
      <Card className="mt-5 text-center h-auto w-[95%] overflow-auto">
        {loading ? (
          <Spinner className="mx-auto" />
        ) : (
          <>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {course.map((u, index) => {
                  const isLast = index === course?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={u?.course_id}>
                      <td className={classes}>
                        <Link to={"/course/learn/" + u.course_id}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal cursor-pointer"
                          >
                            {u?.title}
                          </Typography>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.username}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link to={"/course/learn/" + u.course_id}>
                          <img
                            className="w-[80px] h-[80px] object-cover cursor-pointer"
                            src={u?.image}
                            alt="student1"
                          />
                        </Link>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis"
                        >
                          {u?.description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col justify-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {u?.level}
                          </Typography>
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {u?.language}
                          </Typography> */}
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.language}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {formatCurrency(u?.discount ? u?.discount : 0)}
                      </td>
                      <td className={classes}>{convertDate(u?.create_at)}</td>
                      <td className={classes}>
                        {u?.status === "1" || u?.status === "" ? (
                          <Typography
                            onClick={() => handleUnlock(u.course_id, u?.status)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer font-normal bg-red-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Chưa được duyệt
                            <PencilSimple size={18} />
                          </Typography>
                        ) : u?.status === "2" ? (
                          <Typography
                            onClick={() => handleBlock(u.course_id, u?.status)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer p-2 font-normal bg-green-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Đã duyệt <PencilSimple size={18} />
                          </Typography>
                        ) : u?.status === "3" ? (
                          <Typography
                            onClick={() => handleUnlock(u.course_id, u?.status)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer p-2 font-normal bg-red-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Bị khóa <PencilSimple size={18} />
                          </Typography>
                        ) : (
                          <Typography
                            onClick={() => handleUnlock(u.course_id, u?.status)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer p-2 font-normal bg-gray-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Bản nháp <PencilSimple size={18} />
                          </Typography>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {totalPage > 1 && (
              <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
                <Button
                  variant="outlined"
                  size="sm"
                  className={`mr-3 ${currentPage === 1 ? "hidden" : "block"} `}
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                  }}
                >
                  Trước
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPage }, (_, index) => (
                    <IconButton
                      key={index + 1}
                      variant={currentPage === index + 1 ? "outlined" : "text"}
                      size="sm"
                      onClick={() => {
                        setCurrentPage(index + 1);
                      }}
                      className="hover:outline"
                    >
                      {index + 1}
                    </IconButton>
                  ))}
                </div>
                {currentPage < totalPage && (
                  <Button
                    variant="outlined"
                    size="sm"
                    className={`ml-3 ${
                      currentPage === totalPage ? "hidden" : "block"
                    } `}
                    onClick={() => {
                      setCurrentPage((prev) => prev + 1);
                    }}
                  >
                    Tiếp
                  </Button>
                )}
              </CardFooter>
            )}
          </>
        )}
      </Card>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {status === "1" || status === "0" || status === "3"
            ? "Xác nhận Duyệt khóa học"
            : "Xác nhận chặn khóa"}
        </DialogHeader>
        <DialogBody>
          Khi bạn{" "}
          {status === "1" || status === "0" || status === "3"
            ? "'Xác nhận' duyệt khóa học"
            : "'Xác nhận' chặn khóa học"}{" "}
          {status !== "1"
            ? "Khóa học sẽ hiển thị trên hệ thống"
            : "Khóa học sẽ bị chặn trên hệ thống"}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 m-2"
          >
            <span>Hủy</span>
          </Button>
          {(status === "2" || status === "1") && (
            <Button
              className="m-2"
              variant="gradient"
              color="red"
              onClick={() => handleConfirm("3")}
            >
              <span>Chặn khóa học</span>
            </Button>
          )}
          {(status === "0" || status === "1" || status === "3") && (
            <Button
              className="m-2"
              variant="gradient"
              color="green"
              onClick={() => handleConfirm("2")}
            >
              <span>Duyệt khóa học</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CourseManager;
