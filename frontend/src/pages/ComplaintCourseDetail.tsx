import { Breadcrumbs, Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dialog, DialogBody, Typography, Card } from "@material-tailwind/react";
import * as adminApi from "../api/adminApi/adminApi";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Username", "Họ và tên", "Gmail", "Ngày khiếu nại"];

interface complaintDetail {
  complaint_id: string;
  status: string | null;
  student_id: string;
  full_name: string;
  email: string;
  createdAt: string;
  course_title: string;
  content: string;
  image_complaint: string;
  session_id: string;
  session_name: string;
  lecture_name: string;
  lecture_id: string;
  type: string;
  source: string;
  course_id: string;
  teacher_id: string;
  image_course: string;
  complaint_title: string;
}

const ComplaintCourseDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [complaint, setComplaint] = useState<complaintDetail>();
  const [option, setOption] = useState<string>("0");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [resolve, setResolve] = useState<boolean>(false);
  const { id } = useParams();

  const getComplaint = async () => {
    setLoadingData(true);
    try {
      const data = await adminApi.getComplaintDetail(id as string);
      setLoadingData(false);
      setComplaint(data?.data);
      setResolve(data?.data?.status === "1" ? true : false);
    } catch (err: any) {
      setLoadingData(false);
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    getComplaint();
  }, []);

  const handleResolveComplaint = async () => {
    setLoading(true);
    try {
      const data = await adminApi.resolveComplaintCourse(
        complaint?.complaint_id as string,
        complaint?.course_id as string,
        option
      );
      if (data?.status) {
        setLoading(false);
        setResolve(true);
        toast.success("Giải quyết khiếu nại thành công");
      } else {
        setLoading(false);
        toast.error("Giải quyết khiếu nại thất bại");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error("Giải quyết khiếu nại thất bại: " + err?.message);
    }
  };

  const convertDate = (time: string) => {
    const utcDate = new Date(time);

    // Convert to local date and time
    const localDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    return localDate;
  };

  return (
    <>
      {loadingData ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full lg:space-x-2 lg:gap-2">
          <div className="p-2 w-full h-auto">
            <Breadcrumbs className="p-0">
              <a href="/admin/complaint" className="opacity-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </a>
              <a className="text-[14px]" href={`/admin/complaint/${id}`}>
                Khiếu nại
              </a>
            </Breadcrumbs>
          </div>
          <div className="flex h-full">
            <div className="bg-white w-[70%] h-auto rounded-xl ,x">
              <div className="flex justify-between items-center mx-3 my-5">
                <p>
                  Complaint-ID:{" "}
                  <span className="text-red-500">
                    {complaint?.complaint_id}
                  </span>
                </p>
                {resolve !== true ? (
                  <p className="bg-red-600 text-white px-2 py-1 text-[13px] rounded-lg italic">
                    Chưa xử lý
                  </p>
                ) : (
                  <p className="bg-green-600 text-white px-2 py-1 text-[13px] rounded-lg italic">
                    Đã xử lý
                  </p>
                )}
              </div>
              <div className="my-3 mx-3">
                <Card className="h-full w-full overflow-scroll">
                  <table className="w-full min-w-max table-auto text-left">
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
                      <tr>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {complaint?.student_id}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {complaint?.full_name}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {complaint?.email}
                          </Typography>
                        </td>
                        <td className="p-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {convertDate(complaint?.createdAt as string)}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </div>
              <div className="flex my-3 items-start justify-between mx-3">
                <div className="w-[40%]">
                  <p className="my-3">
                    <span className="font-semibold">Tiêu đề:</span>{" "}
                    {complaint?.complaint_title}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold">Nội dung:</span>{" "}
                    {complaint?.content}
                  </p>
                  <img
                    onClick={handleOpen}
                    loading="lazy"
                    className="w-[80%] h-[80%] object-contain cursor-pointer"
                    src={
                      complaint?.image_complaint === undefined
                        ? ""
                        : JSON.parse(complaint?.image_complaint as string)[0]
                    }
                    alt="bla bla"
                  />
                  <Dialog size="sm" open={open} handler={handleOpen}>
                    <DialogBody>
                      <img
                        alt="nature"
                        loading="lazy"
                        className="h-full w-full rounded-lg object-contain object-center"
                        src={
                          complaint?.image_complaint === undefined
                            ? ""
                            : JSON.parse(
                                complaint?.image_complaint as string
                              )[0]
                        }
                      />
                    </DialogBody>
                  </Dialog>
                </div>
                <div className="ml-3 w-[60%]">
                  <p className="my-3">
                    <span className="font-semibold">Session:</span>{" "}
                    {complaint?.session_name}
                  </p>
                  <p className="mb-3">
                    <span className="font-semibold">Lecture:</span>{" "}
                    {complaint?.lecture_name}
                  </p>
                  {complaint?.type === "video" && (
                    <iframe
                      className="rounded-md"
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${
                        complaint?.source.split("v=")[1]
                      }`}
                      // src="https://www.youtube.com/embed/IopDRcQwo4U"
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
            <div className="ml-3 bg-white w-[30%] h-auto rounded-xl">
              <div className="mx-1 my-3 relative">
                <img
                  className="w-full h-[75px] object-cover"
                  src={complaint?.image_course}
                  alt=""
                />
                <div className="text-center my-3">
                  <p className="font-semibold text-[20px]">
                    <a href={`/course/learn/${complaint?.course_id}`}>
                      {complaint?.course_title}
                    </a>
                  </p>
                  <p className="my-3">
                    <span className="font-semibold">Giáo viên ID: </span>
                    {complaint?.teacher_id}
                  </p>
                </div>
                <div className="mx-3">
                  <p className="font-semibold">Hướng giải quyết: </p>
                  <div className="w-full my-3">
                    <select
                      className="w-full rounded-md"
                      placeholder="Lựa chọn hướng giải quyết"
                      onChange={(e) => setOption(e.target.value)}
                    >
                      <option value="0">Ẩn khóa học</option>
                      <option value="1">Không có vấn đề</option>
                    </select>
                  </div>
                </div>
                <div className="absolute right-0 my-3 mx-3">
                  <button
                    onClick={handleResolveComplaint}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {loading ? <Spinner /> : "Lưu"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintCourseDetail;
