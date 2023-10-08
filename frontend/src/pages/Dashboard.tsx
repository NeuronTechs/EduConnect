import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/const";
const data = [
  { name: "Apr", uv: 50 },
  { name: "Feb", uv: 100 },
  { name: "Mar", uv: 150 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 500 },
  { name: "Jun", uv: 300 },
  { name: "Jul", uv: 350 },
  { name: "Aug", uv: 400 },
  { name: "Sep", uv: 350 },
];

const TABLE_HEAD = ["Khóa học", "Học viên", "Giá"];

const TABLE_ROWS = [
  {
    course: {
      image:
        "https://dreamslms.dreamguystech.com/html/assets/img/course/course-10.jpg",
      name: "Information About UI/UX Design Degree",
    },
    size: "50",
    price: 200000,
  },
  {
    course: {
      image:
        "https://dreamslms.dreamguystech.com/html/assets/img/course/course-10.jpg",
      name: "Wordpress for Beginners - Master Wordpress Quickly",
    },
    size: "100",
    price: 300000,
  },
  {
    course: {
      image:
        "https://dreamslms.dreamguystech.com/html/assets/img/course/course-10.jpg",
      name: "Sketch from A to Z (2022): Become an app designer",
    },
    size: "25",
    price: 400000,
  },
];
const Dashboard = () => {
  const nav = useNavigate();
  const handleRedirectCourse = () => {
    nav("/course/123");
  };
  return (
    <div className="w-full h-full">
      {/* statistic */}
      <div className="sm:flex sm:items-center sm:justify-between md:mx-5 text-center">
        <div className="p-5">
          <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
            Doanh thu
          </h1>
          <p className="text-[#159F46] font-semibold text-[32px] mb-4">
            $467.34
          </p>
          <p className="text-[14px] text-[#303030] tracking-wider">
            Thu nhập trong tháng này
          </p>
        </div>
        <div className="p-5">
          <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
            Học viên
          </h1>
          <p className="text-[#1D9CFD] font-semibold text-[32px] mb-4">
            12,000
          </p>
          <p className="text-[14px] text-[#303030] tracking-wider">
            Mới trong tháng này
          </p>
        </div>
        <div className="p-5">
          <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
            Đánh giá khóa học
          </h1>
          <p className="text-[#FFB54A] font-semibold text-[32px] mb-4">4.8</p>
          <p className="text-[14px] text-[#303030] tracking-wider">
            Xếp hạng tháng này
          </p>
        </div>
      </div>
      {/* line chart */}
      <div className="my-3 md:mx-5 md:p-5">
        <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
          Thu nhập
        </p>
        <div className="w-full h-[350px] mt-5">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" interval={0} />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* column chart */}
      <div className="my-3 md:mx-5 md:p-5">
        <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
          Đặt hàng
        </p>
        <div className="w-full h-[350px] mt-5">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" interval={0} />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="uv" fill="#8884d8" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* top sales */}
      <div className="my-3 md:mx-5 md:p-5">
        <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
          Khóa học bán chạy nhất
        </p>
        <div className="w-full h-auto mt-5">
          <Card className="h-full w-full overflow-auto lg:overflow-hidden">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className=" bg-blue-gray-50 p-4">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-semibold uppercase leading-none opacity-90"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ course, size, price }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={course.name}>
                      <td className={classes}>
                        <div className="flex items-center">
                          <img
                            src={course.image}
                            alt="image"
                            className="w-[120px] h-[80px] md:w-[200px] md:h-[150px] object-cover"
                          />
                          <Typography
                            variant="h6"
                            color="blue-gray"
                            className="ml-3 font-semibold cursor-pointer"
                            onClick={handleRedirectCourse}
                          >
                            {course.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[16px]"
                        >
                          {size}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-[16px]"
                        >
                          {formatCurrency(price)}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
