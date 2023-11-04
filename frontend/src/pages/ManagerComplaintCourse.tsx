import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { ArrowDown, Pencil } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["ID", "Vấn đề", "Nội dung", "Hình ảnh", "Khóa học", ""];

const headers = [
  { label: "ID", key: "id" },
  { label: "Vấn đề", key: "title" },
  { label: "Nội dung", key: "problem" },
  { label: "Hình ảnh", key: "image" },
  { label: "Khóa học", key: "course" },
];

const TABLE_ROWS = [
  {
    id: "1",
    title: "Có những từ ngữ thô tục",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
  {
    id: "2",
    title: "Có những từ ngữ thô tục",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
  {
    id: "3",
    title: "Đánh cắp bài giảng",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
  {
    id: "4",
    title: "Đánh cắp bài giảng",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
  {
    id: "5",
    title: "Đánh cắp ý tưởng",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
  {
    id: "6",
    title: "Đánh cắp ý tưởng",
    problem: "Có những từ ngữ thô tục",
    image:
      "https://archiearchive.files.wordpress.com/2013/04/god-and-an-image-problem.jpg?w=500",
    course: "Lập trình js cơ bản",
  },
];
const ManagerComplaintCourse = () => {
  const navigate = useNavigate();
  const [pageActive, setPageActive] = useState<number>(1);

  const handlePageActive = (page: number) => {
    setPageActive(page);
  };

  const handleRedirect = () => {
    navigate("/admin/complaint/:id");
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
                data={TABLE_ROWS}
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
              {TABLE_ROWS.map((report, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "" : "border-b border-blue-gray-50";

                return (
                  <tr key={report.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {report.id}
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
                        {report.problem}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-[100px] h-[100px]">
                        <img
                          className="w-[100px] h-[100px] object-contain"
                          src={report.image}
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
                        {report.course}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <button onClick={handleRedirect}>
                        <Pencil size={32} weight="fill" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            size="sm"
            className="mr-3"
            onClick={() => {
              setPageActive((prev) => prev - 1);
            }}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton
              variant={pageActive === 1 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(1)}
              className="hover:outline"
            >
              1
            </IconButton>
            <IconButton
              variant={pageActive === 2 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(2)}
              className="hover:outline"
            >
              2
            </IconButton>
            <IconButton
              variant={pageActive === 3 ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageActive(3)}
              className="hover:outline"
            >
              3
            </IconButton>
          </div>
          <Button
            variant="outlined"
            size="sm"
            className="ml-3"
            onClick={() => {
              setPageActive((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ManagerComplaintCourse;
