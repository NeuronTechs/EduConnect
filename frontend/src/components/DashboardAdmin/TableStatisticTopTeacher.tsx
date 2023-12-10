import { getTeacherSellReport } from "@/api/adminApi/adminApi";
import { formatCurrency } from "@/utils/const";
import { useEffect, useState } from "react";

interface ITopTeacher {
  avatar: string;
  username: string;
  major: string;
  courses_sold: number;
  total_page: number;
  profit: number;
}
const TableStatisticTopTeacher = () => {
  const [data, setData] = useState<ITopTeacher[]>([]);
  const getData = async (page: number) => {
    try {
      const res = await getTeacherSellReport(page);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData(1);
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top giáo viên
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Giáo viên</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Lĩnh vực</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Số khóa học</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Học viên</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Lợi nhuận</p>
        </div>
      </div>
      {data.map((teacher) => (
        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={teacher.avatar} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {teacher.username}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {teacher.major}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {teacher.courses_sold}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {teacher.courses_sold}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">
              {formatCurrency(teacher.profit) + " VNĐ"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableStatisticTopTeacher;
