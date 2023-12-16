import { formatCurrency } from "@/utils/const";
import { ArrowDown } from "@phosphor-icons/react";
import { CSVLink } from "react-csv";
import { Card, Typography } from "@material-tailwind/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { ITransactionReport, SliceState } from "@/types/type";
import { useSelector } from "react-redux";
import { getTeachersSellDetail } from "@/api/adminApi/adminApi";

const headerDownload = [
  { label: "teacher_id", key: "teacher_id" },
  { label: "username", key: "username" },
  { label: "Họ và tên", key: "full_name" },

  { label: "Số lượng khóa bán được", key: "courses_sold" },
  { label: "Tổng doanh thu", key: "profit" },
];
const ReportSale = () => {
  const report = useSelector((state: SliceState) => state.adminSlice.report);
  const [data, setData] = useState<{ name: string; uv: number }[]>([]);
  const [dataDownload, setDataDownload] = useState<
    {
      teacher_id: string;
      username: string;
      full_name: string;
      courses_sold: string;
      profit: string;
    }[]
  >([]);
  const getData = async () => {
    const res = await getTeachersSellDetail();
    if (res.status === 200) {
      setDataDownload(res.data);
    }
  };
  useEffect(() => {
    if (Array.isArray(report)) {
      const array = report?.map((item: ITransactionReport) => {
        return {
          name: item.month.toString() + "/" + item.year.toString(),
          uv: parseInt(formatCurrency(item.revenue)),
        };
      });
      getData();
      setData(array.reverse());
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center px-5">
        <div>
          <Typography variant="h5" color="blue-gray">
            Thống kê doanh thu
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <CSVLink
            data={dataDownload}
            headers={headerDownload}
            filename={"report_sales.csv"}
            className="flex items-center gap-3 bg-gray-800 text-white px-3 py-2 rounded-md"
            target="_blank"
          >
            <ArrowDown strokeWidth={2} className="h-4 w-4" /> Tải xuống
          </CSVLink>
        </div>
      </div>
      <div className="my-3 md:mx-5 md:p-5 bg-white rounded-lg">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
            Thu nhập
          </p>
        </div>
        <div className="w-full h-[350px] mt-5">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" interval={0} />
              <YAxis fontSize={12} tickFormatter={(value) => `${value} VNĐ`} />
              <Tooltip formatter={(value) => `${value} VNĐ`} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mx-5 pb-10">
        <Card>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {headerDownload.map((head) => (
                  <th
                    key={head.label}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataDownload.map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={item.teacher_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.teacher_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.username}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.full_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.courses_sold}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatCurrency(parseInt(item.profit))}
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
  );
};
export default ReportSale;
