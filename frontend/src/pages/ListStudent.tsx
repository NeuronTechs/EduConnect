import { Card, Option, Select, Typography } from "@material-tailwind/react";
import {
  CaretLeft,
  CaretRight,
  List,
  MapPin,
  SquaresFour,
} from "@phosphor-icons/react";
import { useState } from "react";

const listMyCourse = [
  {
    id_course: "123",
    name: "Khoa hoc thu",
    image:
      "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
  },
  {
    id_course: "123",
    name: "reactjs cow barn danh cho nguoi moi bat dau",
    image:
      "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
  },
  {
    id_course: "123",
    name: "Khoa reactjs nang cao",
    image:
      "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
  },
];

const ListStudents = [
  {
    image: "https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg",
    name: "Wade Warren",
    address: "Thủ đức, Việt Nam",
    enrolled: "Tham gia ngày 12/12/2023",
    course: {
      id_course: "123",
      name: "Khoa hoc thu",
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    },
  },
  {
    image: "https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg",
    name: "Wade Warren",
    address: "Thủ đức, Việt Nam",
    enrolled: "Tham gia ngày 12/12/2023",
    course: {
      id_course: "123",
      name: "Khoa hoc thu",
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    },
  },
  {
    image: "https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg",
    name: "Wade Warren",
    address: "Thủ đức, Việt Nam",
    enrolled: "Tham gia ngày 12/12/2023",
    course: {
      id_course: "123",
      name: "reactjs cow barn danh cho nguoi moi bat dau",
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    },
  },
  {
    image: "https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg",
    name: "Wade Warren",
    address: "Thủ đức, Việt Nam",
    enrolled: "Tham gia ngày 12/12/2023",
    course: {
      id_course: "123",
      name: "reactjs cow barn danh cho nguoi moi bat dau",
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    },
  },
  {
    image: "https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg",
    name: "Wade Warren",
    address: "Thủ đức, Việt Nam",
    enrolled: "Tham gia ngày 12/12/2023",
    course: {
      id_course: "123",
      name: "reactjs cow barn danh cho nguoi moi bat dau",
      image:
        "https://th.bing.com/th/id/R.e316c0a46aa94116a17139f8db3fd410?rik=OtEUmMjrNaGQSg&pid=ImgRaw&r=0",
    },
  },
];

const TABLE_HEAD = ["Hình ảnh", "Họ tên", "Địa chỉ", "Tham gia", "Khóa học"];

const ListStudent = () => {
  const [pageActive, setPageActive] = useState<number>(1);
  const [courseSelect, setCourseSelect] = useState<string>("");
  const [displayCourse, setDisplayCourse] = useState<number>(0);
  const handlePageActive = (page: number) => {
    setPageActive(page);
  };
  return (
    <div className="w-full space-y-4">
      {/* filter */}
      <div className="py-2 w-full flex flex-col justify-end md:flex-row space-x-2">
        <div className="px-3 py-2 bg-white text-black shadow-sm flex items-center justify-end gap-2 rounded-md">
          <p className="text-md text-gray-500 font-light">Lọc theo: </p>
          <div className="text-sm font-medium">
            <div className="rounded-full px-2 py-1"></div>
          </div>
          <div className="w-72">
            <Select label="Khoá học">
              {listMyCourse.map((course) => (
                <Option
                  onClick={() => setCourseSelect(course.name)}
                  key={course.name}
                >
                  {course.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {/* option */}
        <div className="flex items-center justify-end overflow-hidden rounded-md cursor-pointer">
          <div
            className={
              displayCourse !== 0
                ? "p-2 bg-white text-black shadow-sm"
                : "p-2 bg-blue-600 text-black shadow-sm rounded-md"
            }
            onClick={() => setDisplayCourse(0)}
          >
            <SquaresFour size={25} />
          </div>
          <div
            className={
              displayCourse !== 1
                ? "p-2 bg-white text-black shadow-sm"
                : "p-2 bg-blue-600 text-black shadow-sm rounded-md"
            }
            onClick={() => setDisplayCourse(1)}
          >
            <List size={25} />
          </div>
        </div>
      </div>
      {/* list student when display = block */}
      {displayCourse === 0 && (
        <div className="flex flex-wrap">
          {courseSelect !== ""
            ? ListStudents.filter(
                (student) => student.course.name === courseSelect
              ).map((student, index) => (
                <div
                  key={index}
                  className="w-full md:w-[33%] flex flex-col items-center justify-center"
                >
                  <img
                    className="w-[120px] h-[120px] object-cover"
                    src={student.image}
                    alt="student1"
                  />
                  <Typography variant="h4" className="my-2">
                    {student.name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="mb-2 flex items-center"
                  >
                    <MapPin size={20} />
                    {student.address}
                  </Typography>
                  <Typography variant="paragraph" className="mb-2">
                    {student.enrolled}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="mb-2 font-semibold"
                  >
                    {student.course.name}
                  </Typography>
                </div>
              ))
            : ListStudents.map((student, index) => (
                <div
                  key={index}
                  className="w-full md:w-[33%] flex flex-col items-center justify-center"
                >
                  <img
                    className="w-[120px] h-[120px] object-cover"
                    src={student.image}
                    alt="student1"
                  />
                  <Typography variant="h4" className="my-2">
                    {student.name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="mb-2 flex items-center"
                  >
                    <MapPin size={20} />
                    {student.address}
                  </Typography>
                  <Typography variant="paragraph" className="mb-2">
                    {student.enrolled}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="mb-2 font-semibold"
                  >
                    {student.course.name}
                  </Typography>
                </div>
              ))}
        </div>
      )}
      {/* list student when display = list */}
      {displayCourse === 1 && (
        <div className="flex flex-wrap">
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
                {courseSelect !== ""
                  ? ListStudents.filter(
                      (student) => student.course.name === courseSelect
                    ).map((student, index) => {
                      const isLast = index === ListStudents.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center">
                              <img
                                src={student.image}
                                alt="image"
                                className="w-[120px] h-[120px] object-cover"
                              />
                            </div>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="h5" className="my-2">
                              {student.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="paragraph"
                              className="mb-2 flex items-center"
                            >
                              <MapPin size={20} />
                              {student.address}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="paragraph" className="mb-2">
                              {student.enrolled}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="paragraph"
                              className="mb-2 font-semibold"
                            >
                              {student.course.name}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })
                  : ListStudents.map((student, index) => {
                      const isLast = index === ListStudents.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center">
                              <img
                                src={student.image}
                                alt="image"
                                className="w-[120px] h-[120px] object-cover"
                              />
                            </div>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography variant="h5" className="my-2">
                              {student.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="paragraph"
                              className="mb-2 flex items-center"
                            >
                              <MapPin size={20} />
                              {student.address}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="paragraph" className="mb-2">
                              {student.enrolled}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="paragraph"
                              className="mb-2 font-semibold"
                            >
                              {student.course.name}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </Card>
        </div>
      )}
      {/* paging */}
      <nav className={ListStudents.length < 10 ? "hidden" : "display"}>
        <ul className="flex items-center justify-center">
          <li>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              onClick={() => setPageActive((prev) => prev - 1)}
              aria-label="Previous"
            >
              <span className="text-sm">
                <CaretLeft />
              </span>
            </button>
          </li>
          <li>
            <button
              className={
                pageActive === 1
                  ? "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
                  : "mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              }
              onClick={() => handlePageActive(1)}
            >
              1
            </button>
          </li>
          <li>
            <button
              className={
                pageActive === 2
                  ? "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
                  : "mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              }
              onClick={() => handlePageActive(2)}
            >
              2
            </button>
          </li>
          <li>
            <button
              className={
                pageActive === 3
                  ? "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 p-0 text-sm text-white shadow-md transition duration-150 ease-in-out"
                  : "mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              }
              onClick={() => handlePageActive(3)}
            >
              3
            </button>
          </li>
          <li>
            <button
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
              onClick={() => setPageActive((prev) => prev + 1)}
              aria-label="Next"
            >
              <span className="text-sm">
                <CaretRight />{" "}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default ListStudent;
