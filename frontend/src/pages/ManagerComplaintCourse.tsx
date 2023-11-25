import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ArrowDown, Eye } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import * as adminApi from "../api/adminApi/adminApi";

interface IComplaint {
  complaint_id: string;
  title: string;
  content: string;
  createdAt: string;
  student_id: string;
  course_id: string;
  course_name: string;
  full_name: string;
  image: string;
  status: string;
}
const TABLE_HEAD = [
  "ID",
  "Vấn đề",
  "Nội dung",
  "Hình ảnh",
  "Khóa học",
  "Trạng thái",
];

const headers = [
  { label: "ID", key: "id" },
  { label: "Vấn đề", key: "title" },
  { label: "Nội dung", key: "problem" },
  { label: "Hình ảnh", key: "image" },
  { label: "Khóa học", key: "course" },
];

const ManagerComplaintCourse = () => {
  const navigate = useNavigate();
  const [pageActive, setPageActive] = useState<number>(1);
  const [complaints, setComplaints] = useState<IComplaint[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  useEffect(() => {
    const getComplaint = async () => {
      setLoadingData(true);
      try {
        const data = await adminApi.getComplaintCourse(pageActive as number);
        setLoadingData(false);
        setComplaints(data?.data);
        setTotalPage(data?.totalPage?.total);
      } catch (err: any) {
        setLoadingData(false);
        alert(err?.message);
      }
    };
    getComplaint();
  }, [pageActive]);

  const handlePageActive = (page: number) => {
    setPageActive(page);
  };

  const handleRedirect = (id: string) => {
    navigate(`/admin/complaint/${id}`);
  };

  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Tất cả tố cáo
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <CSVLink
                data={complaints}
                headers={headers}
                filename={"report_complaint.csv"}
                className="flex items-center gap-3 bg-gray-800 text-white px-3 py-2 rounded-md"
                target="_blank"
              >
                <ArrowDown strokeWidth={2} className="h-4 w-4" /> Tải xuống
              </CSVLink>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-3">
          {loadingData ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                {complaints.map((report, index) => {
                  const isLast = index === complaints.length - 1;
                  const classes = isLast ? "" : "border-b border-blue-gray-50";
                  return (
                    <tr key={report?.complaint_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {report?.complaint_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {report.title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {report?.content}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-[100px] h-[100px]">
                          <img
                            className="w-[100px] h-[100px] object-contain"
                            src={JSON.parse(report.image)[0]}
                            alt=""
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {report?.course_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex justify-start items-center">
                          <p className="mr-3">
                            {report?.status === null || report?.status === "0"
                              ? "Chưa xử lý"
                              : "Đã xử lý"}
                          </p>
                          <button
                            onClick={() => handleRedirect(report?.complaint_id)}
                          >
                            <Eye size={22} color="#3fc723" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            className={`mr-3 ${pageActive === 1 ? "hidden" : "block"} `}
            onClick={() => {
              setPageActive((prev) => prev - 1);
            }}
          >
            Trước
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPage }, (_, index) => (
              <IconButton
                key={index + 1}
                variant={pageActive === index + 1 ? "outlined" : "text"}
                size="sm"
                onClick={() => handlePageActive(index + 1)}
                className="hover:outline"
              >
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="outlined"
            size="sm"
            className={`ml-3 ${pageActive === totalPage ? "hidden" : "block"} `}
            onClick={() => {
              setPageActive((prev) => prev + 1);
            }}
          >
            Tiếp
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ManagerComplaintCourse;
