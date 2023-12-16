import CardFour from "@/components/DashboardAdmin/CardFour";
import CardTwo from "@/components/DashboardAdmin/CardTwo";
import TableStatisticTopTeacher from "@/components/DashboardAdmin/TableStatisticTopTeacher";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { configRouter } from "@/configs/router";
import { getTransactionReport } from "@/features/admin/adminSlice";
import { AppDispatch } from "@/redux/store";
import { ITransactionReport } from "@/types/type";
import { formatCurrency } from "@/utils/const";
import { Files } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const DashboardAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [dataRevenue, setDataRevenue] = useState([]);
  const [dataStudent, setDataStudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleRedirectReportSales = () => {
    nav(configRouter.reportSale);
  };

  const handleRedirectReportMember = () => {
    nav(configRouter.reportMember);
  };

  const getData = async () => {
    setLoading(true);
    const res = await dispatch(getTransactionReport());
    const array = res.payload.data.map((item: ITransactionReport) => {
      return {
        name: item.month,
        uv: formatCurrency(item.revenue),
      };
    });
    const array2 = res.payload.data.map((item: ITransactionReport) => {
      return {
        name: item.month,
        uv: item.total_student,
      };
    });
    setDataStudent(array2.reverse());
    setDataRevenue(array.reverse());
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full h-full">
          {/* statistic */}
          <div className="my-3 lg:mt-0 group relative flex items-center gap-2.5 rounded-md font-medium text-bodydark2 duration-300 ease-in-out px-5">
            <div className="w-full h-auto grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardTwo
                dataRevenue={formatCurrency(
                  dataRevenue.length > 0
                    ? dataRevenue
                        .map((item: { name: string; uv: string }) => item.uv)
                        .reduce((a, b) => a + parseInt(b), 0)
                    : 0
                )}
              />
              <CardFour />
            </div>
          </div>
          {/* chart */}
          <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center">
            {/* line chart */}
            <div className="my-3 mx-1 md:mx-5 md:p-5 bg-white w-full lg:w-[48%] rounded-lg">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                  Thu nhập
                </p>
                <button
                  onClick={handleRedirectReportSales}
                  className="flex items-center cursor-pointer group bg-white rounded-lg shadow-md px-2 py-1"
                >
                  <Files size={20} />
                  <p className="text-[13px] hidden group-hover:block">
                    Xem báo cáo
                  </p>
                </button>
              </div>
              <div className="w-full h-[350px] mt-5">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={dataRevenue}
                    margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                  >
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" interval={0} />
                    <YAxis
                      fontSize={12}
                      tickFormatter={(value) => `${value} VNĐ`}
                    />
                    <Tooltip formatter={(value) => `${value} VNĐ`} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* column chart */}
            <div className="my-3 mx-1 md:mx-5 md:p-5 bg-white w-full lg:w-[48%] rounded-lg">
              <div className="flex justify-between items-start">
                <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                  Thành viên
                </p>
                <button
                  onClick={handleRedirectReportMember}
                  className="flex items-center cursor-pointer group bg-white rounded-lg shadow-md px-2 py-1 hover:transition-all"
                >
                  <Files size={20} />
                  <p className="text-[13px] hidden group-hover:block transition-all ">
                    Xem báo cáo
                  </p>
                </button>
              </div>
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
          </div>
          {/* Top teacher */}
          <div className="w-full h-auto px-1 lg:px-5 pb-10 ">
            <TableStatisticTopTeacher />
          </div>
        </div>
      )}
    </>
  );
};
export default DashboardAdmin;
