import { Avatar, Progress, Rating, Typography } from "@material-tailwind/react";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useState } from "react";

type commentProps = {
  content: string;
};
const Comment = (props: commentProps) => {
  return (
    <div className="flex flex-col items-start gap-4 my-5">
      <div className="flex items-start px-10 w-full my-3 space-x-10">
        <div className=" flex justify-center items-center">
          <Avatar
            loading="lazy"
            className="w-[35px] h-[35px]"
            src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
            alt="avatar"
          />
        </div>
        <div className=" text-xs flex flex-col gap-2">
          <div className="">
            <h1 className="font-semibold mr-3">Josn siion</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Rating value={3} readonly />
            <p className="opacity-80">3 3 ngày trước</p>
          </div>
          <p className="text-sm">{props.content}</p>
          <div className="font-semibold opacity-80 mt-2">
            <p>Nhận xét này có hữu ích không</p>
            <div className="flex space-x-5 mt-2 items-center">
              <ThumbsUp
                className="rounded-full cursor-pointer border-[2px] border-black text-black p-1"
                size={32}
              />
              <ThumbsDown
                className="rounded-full cursor-pointer border-[2px] border-black text-black p-1"
                size={32}
              />
              <p className="underline cursor-pointer">Báo cáo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-10/12  h-[1px] bg-gray-300"></div>
    </div>
  );
};

const Reviews = () => {
  const [rated, setRated] = useState<number>(0);
  return (
    <div className="w-[95%] h-full">
      <div className="my-3">
        <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
        <div className="my-3 flex space-x-8">
          <div className="my-3 flex flex-col items-center justify-center w-[20%]">
            <p className="font-semibold text-6xl text-yellow-600">5</p>
            <Rating value={5} readonly />
            <p className="text-sm text-yellow-600">Điểm khóa học</p>
          </div>
          <div className="w-[80%] flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={100}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating value={5} readonly />
                <p>75%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={75}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating value={4} readonly />
                <p>75%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={50}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating value={3} readonly />
                <p>75%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={25}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating value={2} readonly />
                <p>75%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={0}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating value={1} readonly />
                <p>5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 w-full">
        <h1 className="font-semibold text-xl mb-10">Đánh giá</h1>
        <Comment content="Khóa Học hay vl" />
        <Comment content="Khóa Học hay vl 2" />
        <Comment content="Khóa Học hay vl 3" />
        <div className="flex items-center justify-center border">
          <button className="italic text-blue-500 w-[170px] border border-b-blue-300">
            Xem tất cả nhận xét
          </button>
        </div>
      </div>

      <div className="my-10">
        <h1 className="font-semibold">Viết đánh giá</h1>
        <div className="px-3 flex flex-col gap-5">
          <div className="my-3">
            <p className="font-semibold text-[14px]">
              Bạn thấy khóa học này như thế nào?
            </p>
            <div className="flex items-center gap-2">
              <Rating value={4} onChange={(value) => setRated(value)} />
              <Typography color="blue-gray" className="font-medium">
                {rated}.0 Rated
              </Typography>
            </div>
          </div>
          <div className="my-3">
            <p className="font-semibold text-[14px]">Tiêu đề</p>
            <input
              type="text"
              placeholder="Nhập tiêu đề"
              className="w-full p-3 outline-none rounded-lg border border-blue-200 hover:border-blue-400"
            />
          </div>
          <div className="my-3">
            <p className="font-semibold text-[14px]">Nội dung</p>
            <input
              type="text"
              placeholder="Nhập nội dung đánh giá"
              className="w-full p-3 outline-none rounded-lg border border-blue-200 hover:border-blue-400"
            />
          </div>
          <div>
            <button className="border text-white w-[70%] py-2 rounded-lg bg-blue-300 my-3">
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
