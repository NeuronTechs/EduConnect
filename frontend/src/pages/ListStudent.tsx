import { SliceState, TransformedData } from "@/types/type";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { List, MapPin, SquaresFour } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import * as teacherApi from "../api/teacherApi/teacherApi";
import { useSelector } from "react-redux";
import assets from "@/assets";

const TABLE_HEAD = ["Hình ảnh", "Họ tên", "Địa chỉ", "Tham gia", "Khóa học"];

const ListStudent = () => {
  // const [pageActive, setPageActive] = useState<number>(1);
  const [courseSelect, setCourseSelect] = useState<string>("");
  const [displayCourse, setDisplayCourse] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentInCourse, setStudentInCouse] = useState<TransformedData>();
  const currentUser = useSelector(
    (state: SliceState) => state.authSlice.currentUser
  );

  useEffect(() => {
    const getStudentOfCourse = async () => {
      try {
        setLoading(true);
        const data = await teacherApi.getStudentByTeacher(
          currentUser?.user_id as string
        );
        if (data?.status === 200) {
          setLoading(false);
          setStudentInCouse(data?.data?.teacher_id);
          // setCourseSelect(
          //   data?.data?.teacher_id?.course[0]?.course_id !== "" &&
          //     data?.data?.teacher_id?.course[0]?.course_id
          // );
        } else {
          setLoading(false);
          alert("error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    getStudentOfCourse();
  }, []);

  // const handlePageActive = (page: number) => {
  //   setPageActive(page);
  // };

  return (
    <div className="w-full space-y-4">
      {loading ? (
        <div className="flex justify-center">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        <>
          {/* filter */}
          <div className="py-2 w-full flex flex-col justify-end md:flex-row space-x-2">
            <div className="px-3 py-1 bg-white text-black shadow-sm flex items-center justify-end gap-2 rounded-md">
              <p className="text-md text-gray-500 font-light">Lọc theo: </p>
              <div className="text-sm font-medium">
                <div className="rounded-full px-2 py-1"></div>
              </div>
              <div className="w-72">
                <select
                  className="rounded-md w-full"
                  onChange={(e) => setCourseSelect(e.target.value)}
                >
                  <option className="p-3" value="">
                    Tất cả học viên
                  </option>
                  {studentInCourse?.course?.map((s) => (
                    <option
                      className="p-3"
                      key={s?.course_id}
                      value={s?.course_id}
                    >
                      {s?.course_name}
                    </option>
                  ))}
                </select>
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
                ? (
                    studentInCourse?.course?.filter(
                      (s) => s.course_id === courseSelect
                    )[0]?.student ?? []
                  ).map((student, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[31%] mx-3 my-3 rounded-md p-[10px] flex flex-col items-center justify-center bg-white"
                    >
                      <img
                        className="w-[120px] h-[120px] object-cover"
                        src={
                          student?.avatar === "null"
                            ? assets?.images?.noAvatar
                            : student?.avatar
                        }
                        alt="student1"
                      />
                      <Typography variant="h4" className="my-2">
                        {student?.student_name}
                      </Typography>
                      <Typography
                        variant="paragraph"
                        className="mb-2 flex items-center"
                      >
                        <MapPin size={20} />
                        {student?.address}
                      </Typography>
                      <Typography variant="paragraph" className="mb-2">
                        {student?.timeStart}
                      </Typography>
                      <Typography
                        variant="paragraph"
                        className="mb-2 font-semibold"
                      >
                        {
                          studentInCourse?.course?.filter(
                            (course) => course.course_id === courseSelect
                          )[0].course_name
                        }
                      </Typography>
                    </div>
                  ))
                : studentInCourse?.course
                    ?.filter((s) => s.course_id !== courseSelect)
                    .map((course) =>
                      course?.student?.map((student, index) => (
                        <div
                          key={index}
                          className="w-full md:w-[31%] mx-3 my-3 rounded-md p-[10px] flex flex-col items-center justify-center bg-white"
                        >
                          <img
                            className="w-[120px] h-[120px] object-cover"
                            src={
                              student?.avatar === "null"
                                ? assets?.images?.noAvatar
                                : student?.avatar
                            }
                            alt="student1"
                          />
                          <Typography variant="h4" className="my-2">
                            {student?.student_name}
                          </Typography>
                          <Typography
                            variant="paragraph"
                            className="mb-2 flex items-center"
                          >
                            <MapPin size={20} />
                            {student?.address}
                          </Typography>
                          <Typography variant="paragraph" className="mb-2">
                            {student?.timeStart}
                          </Typography>
                          <Typography
                            variant="paragraph"
                            className="mb-2 font-semibold"
                          >
                            {course?.course_name}
                          </Typography>
                        </div>
                      ))
                    )}
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
                      ? (
                          studentInCourse?.course?.filter(
                            (s) => s.course_id === courseSelect
                          )[0]?.student ?? []
                        ).map((student, index) => {
                          const isLast =
                            index ===
                            (
                              studentInCourse?.course?.filter(
                                (s) => s.course_id === courseSelect
                              )[0]?.student ?? []
                            ).length -
                              1;
                          const classes = isLast
                            ? "p-4 bg-white"
                            : "p-4 border-b border-blue-gray-50 bg-white";
                          return (
                            <tr key={index}>
                              <td className={classes}>
                                <div className="flex items-center">
                                  <img
                                    src={
                                      student?.avatar === "null"
                                        ? assets?.images?.noAvatar
                                        : student?.avatar
                                    }
                                    alt="image"
                                    className="w-[120px] h-[120px] object-cover"
                                  />
                                </div>
                              </td>
                              <td className={`${classes} bg-blue-gray-50/50`}>
                                <Typography variant="h5" className="my-2">
                                  {student?.student_name}
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
                                <Typography
                                  variant="paragraph"
                                  className="mb-2"
                                >
                                  {student?.timeStart}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="paragraph"
                                  className="mb-2 font-semibold"
                                >
                                  {
                                    studentInCourse?.course?.filter(
                                      (course) =>
                                        course.course_id === courseSelect
                                    )[0].course_name
                                  }
                                </Typography>
                              </td>
                            </tr>
                          );
                        })
                      : studentInCourse?.course
                          ?.filter((s) => s.course_id !== courseSelect)
                          .map((course) =>
                            course?.student?.map((student, index) => {
                              const isLast =
                                index ===
                                (
                                  studentInCourse?.course?.filter(
                                    (s) => s.course_id === courseSelect
                                  )[0]?.student ?? []
                                ).length -
                                  1;
                              const classes = isLast
                                ? "p-4 bg-white"
                                : "p-4 border-b border-blue-gray-50 bg-white";
                              return (
                                <tr key={index}>
                                  <td className={classes}>
                                    <div className="flex items-center">
                                      <img
                                        src={
                                          student?.avatar === "null"
                                            ? assets?.images?.noAvatar
                                            : student?.avatar
                                        }
                                        alt="image"
                                        className="w-[120px] h-[120px] object-cover"
                                      />
                                    </div>
                                  </td>
                                  <td
                                    className={`${classes} bg-blue-gray-50/50`}
                                  >
                                    <Typography variant="h5" className="my-2">
                                      {student?.student_name}
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
                                    <Typography
                                      variant="paragraph"
                                      className="mb-2"
                                    >
                                      {student?.timeStart}
                                    </Typography>
                                  </td>
                                  <td className={classes}>
                                    <Typography
                                      variant="paragraph"
                                      className="mb-2 font-semibold"
                                    >
                                      {course?.course_name}
                                    </Typography>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
          {/* paging */}
          {/* <nav className={ListStudents.length < 10 ? "hidden" : "display"}>
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
          </nav> */}
        </>
      )}
    </div>
  );
};
export default ListStudent;
