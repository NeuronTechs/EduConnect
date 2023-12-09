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
import {
  getTeacherReport,
  getTransactionEachCourseByTeacher,
} from "@/api/teacherApi/teacherApi";
import { useSelector } from "react-redux";
import { SliceState } from "@/types/type";
import { useEffect, useState } from "react";

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
const DashboardTeacher = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: SliceState) => state.authSlice);
  const nav = useNavigate();
  const [dataProfit, setDataProfit] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [dataCourse, setDataCourse] = useState<
    {
      course_id: string;
      title: string;
      image: string;
      courses_sold: number;
      total_revenue: number;
    }[]
  >([]);
  const handleRedirectCourse = () => {
    nav("/course/123");
  };
  const getData = async () => {
    try {
      setLoading(true);
      if (currentUser) {
        const res = await getTeacherReport(currentUser?.user_id);
        const res1 = await getTransactionEachCourseByTeacher(
          currentUser?.user_id
        );
        if (res.status === 200) {
          setDataProfit(
            res.data
              .map((item: { month: string; profit: string }) => {
                return {
                  name: item.month,
                  uv: item.profit,
                };
              })
              .reverse()
          );
          setDataStudent(
            res.data
              .map((item: { month: string; total_student: string }) => {
                return {
                  name: item.month,
                  uv: item.total_student,
                };
              })
              .reverse()
          );
          setLoading(false);
        }
        if (res1.status === 200) {
          setDataCourse(res1.data);
          console.log(dataCourse);

          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full">
      {loading ? (
        <div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-secondary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-success opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-danger opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-warning opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-info opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-neutral-100 opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div>
          <div className="sm:flex sm:items-center sm:justify-between md:mx-5 text-center">
            <div className="p-5 w-[30%] bg-white">
              <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                Doanh thu
              </h1>
              <p className="text-[#159F46] font-semibold text-[32px] mb-4">
                {dataProfit
                  .map((item: { name: string; uv: number }) => item.uv)
                  .reduce((a, b) => a + b) + " VNĐ"}
              </p>
              <p className="text-[14px] text-[#303030] tracking-wider">
                Thu nhập trong tháng này
              </p>
            </div>
            <div className="p-5 w-[30%] bg-white">
              <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                Học viên
              </h1>
              <p className="text-[#1D9CFD] font-semibold text-[32px] mb-4">
                {dataStudent
                  .map((item: { name: string; uv: number }) => item.uv)
                  .reduce((a, b) => a + b)}
              </p>
              <p className="text-[14px] text-[#303030] tracking-wider">
                Mới trong tháng này
              </p>
            </div>
            <div className="p-5 w-[30%] bg-white">
              <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                Đánh giá khóa học
              </h1>
              <p className="text-[#FFB54A] font-semibold text-[32px] mb-4">
                4.8
              </p>
              <p className="text-[14px] text-[#303030] tracking-wider">
                Xếp hạng tháng này
              </p>
            </div>
          </div>
          {/* line chart */}
          <div className="my-3 md:mx-5 md:p-5 bg-white">
            <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
              Thu nhập
            </p>
            <div className="w-full h-[350px] mt-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={dataProfit}
                  margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                >
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" interval={0} />
                  <YAxis
                    fontSize={12}
                    tickFormatter={(value) => `${value} VNĐ`}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* column chart */}
          <div className="my-3 md:mx-5 md:p-5 bg-white">
            <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
              Đặt hàng
            </p>
            <div className="w-full h-[350px] mt-5">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={dataStudent}>
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
                    {dataCourse.map((item, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4 bg-white"
                        : "p-4 border-b border-blue-gray-50 bg-white";
                      return (
                        <tr key={item.course_id} className="bg-white">
                          <td className={classes}>
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt="image"
                                className="w-[120px] h-[80px] md:w-[200px] md:h-[150px] object-cover"
                              />
                              <Typography
                                variant="h6"
                                color="blue-gray"
                                className="ml-3 font-semibold cursor-pointer"
                                onClick={handleRedirectCourse}
                              >
                                {item.title}
                              </Typography>
                            </div>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-[16px]"
                            >
                              {item.courses_sold}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-[16px]"
                            >
                              {formatCurrency(item.total_revenue) + " VNĐ"}
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
      )}
    </div>
  );
};
export default DashboardTeacher;
