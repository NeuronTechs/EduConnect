import { Avatar, Progress, Rating, Typography } from "@material-tailwind/react";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type commentProps = {
  content: string;
  title: String;
};
const Comment = (props: commentProps) => {
  const location = useLocation();
  const hiddenRating = location.pathname.match("learn") !== null ? true : false;
  return (
    <div className="w-full flex flex-col items-start gap-4 my-3">
      <div className="flex items-start px-3 w-full my-3 space-x-10">
        <div className=" flex justify-center items-center">
          <Avatar
            loading="lazy"
            className="w-[35px] h-[35px]"
            src="https://cache.lovethispic.com/uploaded_images/327102-Rose-In-Grayscale.jpeg"
            alt="avatar"
          />
        </div>
        <div className=" text-xs flex flex-col gap-2">
          <div className="flex items-center">
            <h3 className="font-semibold mr-3">Josn siion</h3>
            <p className="opacity-80">3 ngày trước</p>
          </div>
          <div className="flex items-center space-x-4">
            {!hiddenRating && (
              <Rating
                value={3}
                unratedColor="amber"
                ratedColor="amber"
                readonly
                className=""
              />
            )}
          </div>
          <p className="font-semibold text-[16px]">{props.title}</p>
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
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
};

const Reviews = () => {
  const [rated, setRated] = useState<number>(0);
  return (
    <div className="w-full h-full">
      {/* rating */}
      <div className="my-3">
        <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
        <div className="my-3 flex space-x-8">
          <div className="my-3 flex flex-col items-center justify-center w-[20%]">
            <p className="font-semibold text-6xl ">5</p>
            <Rating
              unratedColor="amber"
              ratedColor="amber"
              value={5}
              readonly
            />
            <p className="text-sm ">Điểm khóa học</p>
          </div>
          <div className="w-[80%] flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={100}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={5}
                  readonly
                />
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
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={4}
                  readonly
                />
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
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={3}
                  readonly
                />
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
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={2}
                  readonly
                />
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
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={1}
                  readonly
                />
                <p>5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* list comment */}
      <div className="my-3 w-full">
        <h1 className="font-semibold text-xl mb-3">Đánh giá</h1>
        <Comment content="Comment 1" title="Comment 1" />
        <Comment content="Comment 2" title="Comment 2" />
        <Comment content="Comment 3" title="Comment 3" />
        <div className="flex items-center justify-center">
          <button className="italic text-blue-500 w-[170px]">
            Xem tất cả nhận xét
          </button>
        </div>
      </div>
      {/* comment */}
      <div className="my-3">
        <h1 className="font-semibold text-xl">Viết đánh giá</h1>
        <div className="px-3 my-3 flex flex-col gap-5">
          <div className="my-1">
            <p className="font-semibold text-[14px]">
              Bạn thấy khóa học này như thế nào?
            </p>
            <div className="flex items-center gap-2">
              <Rating
                value={0}
                onChange={(value) => setRated(value)}
                unratedColor="amber"
                ratedColor="amber"
              />
              <Typography color="blue-gray" className="font-medium">
                {rated}.0 Rated
              </Typography>
            </div>
          </div>
          <div className="mb-1">
            <p className="font-semibold text-[14px]">Tiêu đề</p>
            <input
              type="text"
              placeholder="Nhập tiêu đề"
              className="w-full p-3 outline-none rounded-lg border border-blue-200 hover:border-blue-400"
            />
          </div>
          <div className="mb-1">
            <p className="font-semibold text-[14px]">Nội dung</p>
            <textarea
              placeholder="Nhập nội dung đánh giá"
              className="w-full min-h-[50px] max-h-[150px] p-3 outline-none rounded-lg border border-blue-200 hover:border-blue-400"
            />
          </div>
          <div>
            <button className="border text-white px-3 py-2 rounded-lg bg-blue-400">
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
