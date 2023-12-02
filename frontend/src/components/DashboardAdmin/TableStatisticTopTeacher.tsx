import { getTeacherSellReport } from "@/api/adminApi/adminApi";
import { formatCurrency } from "@/utils/const";
import { useEffect, useState } from "react";

const topTeacher = [
  {
    image:
      "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
    name: "Trần Thị Mỹ Linh",
    field: "IT",
    totalCourse: 30,
    totalStudent: 1500,
    profit: 50000000,
  },
  {
    image:
      "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
    name: "Trần Thị Mỹ Linh",
    field: "IT",
    totalCourse: 30,
    totalStudent: 1500,
    profit: 50000000,
  },
  {
    image:
      "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
    name: "Trần Thị Mỹ Linh",
    field: "IT",
    totalCourse: 30,
    totalStudent: 1500,
    profit: 50000000,
  },
  {
    image:
      "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
    name: "Trần Thị Mỹ Linh",
    field: "IT",
    totalCourse: 30,
    totalStudent: 1500,
    profit: 50000000,
  },
  {
    image:
      "https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg",
    name: "Trần Thị Mỹ Linh",
    field: "IT",
    totalCourse: 30,
    totalStudent: 1500,
    profit: 50000000,
  },
];
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getData = async (page: number) => {
    try {
      const res = await getTeacherSellReport(page);
      if (res.status === 200) {
        setTotalPages(res.data.total_page);
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
      <div className="flex justify-center mt-6">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-stroke bg-white text-sm font-medium text-black hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.707 3.293a1 1 0 010 1.414L6.414 9H17a1 1 0 110 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 border-t border-b border-stroke bg-white text-sm font-medium text-black hover:bg-gray-50"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.293 16.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TableStatisticTopTeacher;
