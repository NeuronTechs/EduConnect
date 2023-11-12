import { IReview, SliceState, addReview } from "@/types/type";
import { Avatar, Progress, Rating, Typography } from "@material-tailwind/react";
// import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as courseApi from "../../../api/courseApi/courseApi";
import { formatTimeStamp } from "@/utils/const";
import { useSelector } from "react-redux";

type reviewProps = {
  content: string;
  title: string;
  createdAt: string;
  rating: number;
  full_name: string;
  username: string;
  avatar: string;
};

const Review = (props: reviewProps) => {
  const location = useLocation();
  const hiddenRating = location.pathname.match("learn") !== null ? true : false;
  return (
    <div className="w-full flex flex-col items-start gap-4 my-3">
      <div className="flex items-start px-3 w-full my-3 space-x-10">
        <div className=" flex justify-center items-center">
          <Avatar
            loading="lazy"
            className="w-[35px] h-[35px]"
            src={props.avatar}
            alt="avatar"
          />
        </div>
        <div className=" text-xs flex flex-col gap-2">
          <div className="flex items-center">
            <h3 className="font-semibold mr-3">{props.full_name}</h3>
            <p className="opacity-80">{formatTimeStamp(props.createdAt)}</p>
          </div>
          <div className="flex items-center space-x-4">
            {!hiddenRating && (
              <Rating
                value={props.rating}
                unratedColor="amber"
                ratedColor="amber"
                readonly
                className=""
              />
            )}
          </div>
          <p className="font-semibold text-[16px]">{props.title}</p>
          <p className="text-sm">{props.content}</p>
          {/* <div className="font-semibold opacity-80 mt-2">
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
          </div> */}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
};

const Reviews = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rated, setRated] = useState<number>(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [statistic, setTatistic] = useState<any>({});

  const currentCourse = useSelector(
    (state: SliceState) => state.courseOverviewSlice.courseCurrent
  );

  useEffect(() => {
    const getReview = async () => {
      const data = await courseApi.getReviewCourse("27381");
      setReviews([...data?.data]);
    };

    const getStatisticStar = async () => {
      const data = await courseApi.getStatisticStar("27381");
      setTatistic(data?.data);
      // setReviews(data?.data);
      // console.log(data);
    };

    getReview();
    getStatisticStar();
  }, []);

  const handleGetAllReviews = async () => {
    const data = await courseApi.getAllReviewCourse("27381");
    setReviews(data?.data);
  };

  const handleAddReview = async () => {
    let params: addReview = {
      course_id: "27381",
      content: content,
      author_id: "test2",
      rating: rated,
      title: title,
    };
    await courseApi.addToReview(params);
    setContent("");
    setTitle("");
    setRated(0);
  };

  return (
    <div className="w-full h-full">
      {/* rating */}
      <div className="my-3">
        <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
        <div className="my-3 flex space-x-8">
          <div className="my-3 flex flex-col items-center justify-center w-[20%]">
            <p className="font-semibold text-6xl ">{statistic?.totalStar}</p>
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
                value={statistic?.total5Start}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={5}
                  readonly
                />
                <p>{statistic?.total5Start}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={statistic?.total4Start}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={4}
                  readonly
                />
                <p>{statistic?.total4Start}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={statistic?.total3Start}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={3}
                  readonly
                />
                <p>{statistic?.total3Start}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={statistic?.total2Start}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={2}
                  readonly
                />
                <p>{statistic?.total2Start}%</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full space-x-3">
              <Progress
                color="blue"
                value={statistic?.total1Start}
                className="border-2 border-gray-900/10 bg-blue-100 w-[70%]"
              />
              <div className="flex w-[30%] space-x-2">
                <Rating
                  unratedColor="amber"
                  ratedColor="amber"
                  value={1}
                  readonly
                />
                <p>{statistic?.total1Start}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* list review */}
      <div className="my-3 w-full">
        <h1 className="font-semibold text-xl mb-3">Đánh giá</h1>
        {/* <Review content="Review 1" title="Review 1" />
        <Review content="Review 2" title="Review 2" />
        <Review content="Review 3" title="Review 3" /> */}
        {reviews?.map((review) => (
          <Review
            content={review.content}
            title={review.title}
            createdAt={review.createdAt}
            rating={review.rating}
            full_name={review.full_name}
            username={review.username}
            avatar={review.avatar}
          />
        ))}
        <div className="flex items-center justify-center">
          <button
            className="italic text-blue-500 w-[170px]"
            onClick={handleGetAllReviews}
          >
            Xem tất cả nhận xét
          </button>
        </div>
      </div>
      {/* review */}
      {currentCourse?.student_id.includes("00657") && (
        <div className="my-3">
          <h1 className="font-semibold text-xl">Viết đánh giá</h1>
          <div className="px-3 my-3 flex flex-col gap-5">
            <div className="my-1">
              <p className="font-semibold text-[14px]">
                Bạn thấy khóa học này như thế nào?
              </p>
              <div className="flex items-center gap-2">
                <Rating
                  value={rated}
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
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="mb-1">
              <p className="font-semibold text-[14px]">Nội dung</p>
              <textarea
                placeholder="Nhập nội dung đánh giá"
                className="w-full min-h-[50px] max-h-[150px] p-3 outline-none rounded-lg border border-blue-200 hover:border-blue-400"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
            <div>
              <button
                className="border text-white px-3 py-2 rounded-lg bg-blue-400"
                onClick={handleAddReview}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
