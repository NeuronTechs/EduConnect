import { CommentOfLecture } from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { IComment, SliceState } from "@/types/type";
import { Avatar } from "@material-tailwind/react";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WYSIWYGEditor from "./WYSIWYGEditor";
interface commentProps {
  comment: IComment;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}

const Comment = ({ comment, setCurrentTime }: commentProps) => {
  return (
    <div className="flex flex-col items-start gap-4 my-5">
      <div className="flex items-start px-10 w-full my-3 space-x-5">
        <div className=" flex justify-center items-center">
          <Avatar
            loading="lazy"
            className="w-[40px] h-[40px]"
            src={
              comment.avatar !== null
                ? comment.avatar
                : "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className=" text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold mr-3 text-sm">{comment.username}</h1>
            <p className="opacity-80">3 ngày trước</p>
          </div>
          <div className="flex space-x-5">
            <p
              onClick={() => {
                setCurrentTime(parseInt(comment.timestamp));
              }}
              className=" cursor-pointer flex items-center justify-center p-2 w-14 h-6 font-bold  rounded-xl text-white bg-blue-500"
            >
              {"00:0" + comment.timestamp}
            </p>
            <p className="text-sm">{comment.content}</p>
          </div>
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
interface Props {
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
}
const Comments = ({ setCurrentTime }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  useEffect(() => {
    if (currentCourse.currentLecture)
      dispatch(
        CommentOfLecture({
          id: currentCourse?.currentLecture?.lecture_id,
          paging: 1,
        })
      );
  }, [currentCourse.currentLecture?.lecture_id]);
  console.log(currentCourse.comments);

  return (
    <div className="w-[95%] h-full">
      <div className="my-3">
        <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
      </div>
      <div className="my-10 w-full">
        <WYSIWYGEditor />
        {/* <h1 className="font-semibold text-xl mb-10">Đánh giá</h1> */}
        {currentCourse?.comments?.map((comment) => {
          return <Comment comment={comment} setCurrentTime={setCurrentTime} />;
        })}

        <div className="flex items-center justify-center border border-gray-700 font-bold p-2">
          <button className="italic text-black w-[170px] border  border-b-gray-800">
            Xem tất cả nhận xét
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
