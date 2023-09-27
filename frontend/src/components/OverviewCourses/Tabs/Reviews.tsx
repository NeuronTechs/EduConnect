import { Avatar, Progress, Rating, Typography } from "@material-tailwind/react";
import { useState } from "react";

const Reviews = () => {
  const [rated, setRated] = useState<number>(0);
  return (
    <div className="w-full h-full">
      <div className="my-3">
        <h1 className="font-semibold">Phản hồi của học sinh</h1>
        <div className="my-3 flex">
          <div className="my-3 flex flex-col items-center justify-center w-[20%]">
            <p className="font-semibold text-[40px]">5</p>
            <Rating value={5} readonly />
          </div>
          <div className="w-[80%] flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full">
              <Progress
                color="blue"
                value={100}
                className="border-2 border-gray-900/10 bg-blue-100 w-[500px]"
              />
              <Rating value={4} readonly />
              <p>75%</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <Progress
                color="blue"
                value={75}
                className="border-2 border-gray-900/10 bg-blue-100 w-[500px]"
              />
              <Rating value={3} readonly />
              <p>25%</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <Progress
                color="blue"
                value={50}
                className="border-2 border-gray-900/10 bg-blue-100 w-[500px]"
              />
              <Rating value={2} readonly />
              <p>0%</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <Progress
                color="blue"
                value={25}
                className="border-2 border-gray-900/10 bg-blue-100 w-[500px]"
              />
              <Rating value={1} readonly />
              <p>0%</p>
            </div>
            <div className="flex items-center justify-between w-full">
              <Progress
                color="blue"
                value={0}
                className="border-2 border-gray-900/10 bg-blue-100 w-[500px]"
              />
              <Rating value={0} readonly />
              <p>0%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 w-full">
        <h1 className="font-semibold">Đánh giá</h1>
        <div className="flex items-start w-full my-3">
          <div className="w-[20%] flex justify-center items-start">
            <Avatar
              className="w-[50px] h-[50px]"
              src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
              alt="avatar"
            />
          </div>
          <div className="w-[80%]">
            <div className="flex items-center">
              <h1 className="font-semibold mr-3">Josn siion</h1>
              <p>3 3 ngày trước</p>
            </div>
            <Rating value={3} readonly />
            <h1 className="font-semibold mr-3">Khóa học rất tốt</h1>
            <p>
              Khóa học này rất hữu ích rất thích hợp cho những người mới học như
              em
            </p>
          </div>
        </div>
        <div className="flex items-start w-full my-3">
          <div className="w-[20%] flex justify-center items-start">
            <Avatar
              className="w-[50px] h-[50px]"
              src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
              alt="avatar"
            />
          </div>
          <div className="w-[80%]">
            <div className="flex items-center">
              <h1 className="font-semibold mr-3">Josn siion</h1>
              <p>3 ngày trước</p>
            </div>
            <Rating value={3} readonly />
            <h1 className="font-semibold mr-3">Khóa học rất tốt</h1>
            <p>
              Khóa học này rất hữu ích rất thích hợp cho những người mới học như
              em, mọi người hãy cùng nhau đăng ký nhé
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center border">
          <button className="italic text-blue-300 w-[170px] border border-b-blue-300">
            Xem tất cả nhận xét
          </button>
        </div>
      </div>
      <div className="mt-3 mb-6">
        <h1 className="font-semibold">Viết đánh giá</h1>
        <div className="px-3">
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
            <button className="border text-white w-[300px] py-2 rounded-lg bg-blue-300 my-3">
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
