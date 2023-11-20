import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { PencilSimple } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi/adminApi";

const TABLE_HEAD = [
  "Username",
  "Họ và tên",
  "Ảnh đại diện",
  "Email",
  "Địa chỉ",
  "Lĩnh vực",
  "Ngày tham gia",
  "Role",
  "Trạng thái",
];

interface IInforUser {
  username: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar: string;
  address: string;
  educational_level: string;
  major: string;
  school: string;
  timeStart: string;
  role: string;
  status: string | null;
}

const StudentList = () => {
  const [user, setUser] = useState<IInforUser[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const getAllUser = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllUser(currentPage, txtSearch);
      if (data.status === 200) {
        setLoading(false);
        setUser(data?.data);
        setTotalPage(data?.totalPage);
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [currentPage, txtSearch]);

  const handleOpen = () => setOpen(!open);

  const handleBlock = (username: string) => {
    setUsername(username);
    setStatus("0");
    setOpen(!open);
  };

  const handleUnlock = (username: string) => {
    setUsername(username);
    setStatus("1");
    setOpen(!open);
  };

  const handleConfirm = async () => {
    try {
      const data = await adminApi.setStatusUser(status, username);
      if (data.status === 200) {
        getAllUser();
        // alert("Thành công");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(!open);
  };

  const convertDate = (time: string) => {
    const utcDate = new Date(time);

    // Convert to local date and time
    const localDate = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    return localDate;
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTxtSearch(e.target.value);
  };

  return (
    <div className="bg-white h-screen rounded-lg w-full flex flex-col items-center">
      <h1 className="text-center text-[24px] pt-3 mb-3">
        Danh Sách người dùng trong hệ thống
      </h1>
      <div className="w-full relative flex justify-end pr-10 py-3 bg-white ">
        <form>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-[300px]"
          >
            Tìm kiếm
          </label>
          <div className="relative w-[300px] ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => handleChangeSearch(e)}
              type="search"
              id="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên user..."
            />
          </div>
        </form>
      </div>
      <Card className="mt-5 text-center h-auto w-[95%] overflow-auto">
        {loading ? (
          <Spinner className="mx-auto" />
        ) : (
          <>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                {user.map((u, index) => {
                  const isLast = index === user?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={u?.username}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.username}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.full_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <img
                          className="w-[80px] h-[80px] object-cover"
                          src={u?.avatar}
                          alt="student1"
                        />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {u?.address}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col justify-start">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {u?.school}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {u?.major}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {convertDate(u?.timeStart)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {u?.role === "0" ? (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Học viên
                          </Typography>
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Giảng viên
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {u?.status === "0" ? (
                          <Typography
                            onClick={() => handleUnlock(u.username)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer font-normal bg-red-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Đã bị chặn
                            <PencilSimple size={18} />
                          </Typography>
                        ) : (
                          <Typography
                            onClick={() => handleBlock(u.username)}
                            variant="small"
                            color="blue-gray"
                            className="cursor-pointer font-normal bg-green-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                          >
                            Hoạt động <PencilSimple size={18} />
                          </Typography>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
              <Button
                variant="outlined"
                size="sm"
                className={`mr-3 ${currentPage === 1 ? "hidden" : "block"} `}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                }}
              >
                Trước
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPage }, (_, index) => (
                  <IconButton
                    key={index + 1}
                    variant={currentPage === index + 1 ? "outlined" : "text"}
                    size="sm"
                    onClick={() => {
                      setCurrentPage(index + 1);
                    }}
                    className="hover:outline"
                  >
                    {index + 1}
                  </IconButton>
                ))}
              </div>
              <Button
                variant="outlined"
                size="sm"
                className={`ml-3 ${
                  currentPage === totalPage ? "hidden" : "block"
                } `}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                }}
              >
                Tiếp
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          {status === "1"
            ? "Xác nhận hủy chặn người dùng"
            : "Xác nhận chặn người dùng"}
        </DialogHeader>
        <DialogBody>
          Khi bạn{" "}
          {status === "1"
            ? "'Xác nhận' hủy chặn người dùng"
            : "'Xác nhận' chặn người dùng"}{" "}
          thì người dùng sẽ{" "}
          {status !== "1"
            ? "không thể truy cập vào trang web được nữa."
            : "được tiếp tục truy cập trang web."}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Xác nhận</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default StudentList;
