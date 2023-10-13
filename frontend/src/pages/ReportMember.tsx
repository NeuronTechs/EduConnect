import { formatCurrency } from "@/utils/const";
import { ArrowDown } from "@phosphor-icons/react";
import { CSVLink } from "react-csv";
import { Card, Typography } from "@material-tailwind/react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
const data = [
  { name: "Apr", uv: parseInt(formatCurrency(50)) },
  { name: "Feb", uv: parseInt(formatCurrency(100)) },
  { name: "Mar", uv: parseInt(formatCurrency(150)) },
  { name: "Apr", uv: parseInt(formatCurrency(200)) },
  { name: "May", uv: parseInt(formatCurrency(550)) },
  { name: "Jun", uv: parseInt(formatCurrency(300)) },
  { name: "Jul", uv: parseInt(formatCurrency(350)) },
  { name: "Aug", uv: parseInt(formatCurrency(400)) },
  { name: "Sep", uv: parseInt(formatCurrency(350)) },
];
const headers = [
  { label: "name", key: "name" },
  { label: "giá trị", key: "uv" },
];
const ReportMember = () => {
  return (
    <div className="w-full h-full">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center px-5">
        <div>
          <Typography variant="h5" color="blue-gray">
            Thống kê thành viên
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <CSVLink
            data={data}
            headers={headers}
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
            Thành viên
          </p>
        </div>
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
      <div className="mx-5 pb-10">
        <Card>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {headers.map((head) => (
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
              {data.map((item, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={item.name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.uv}
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
export default ReportMember;
