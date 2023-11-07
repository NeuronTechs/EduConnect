import {
  CommentOfLecture,
  LoadMoreComment,
} from "@/features/course/courseSlice";
import { AppDispatch } from "@/redux/store";
import { IComment, SliceState } from "@/types/type";
import { Avatar } from "@material-tailwind/react";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WYSIWYGEditor from "./WYSIWYGEditor";
import { calculateTimePassed } from "@/utils/utils";
interface commentProps {
  comment: IComment;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
}

const Comment = ({ comment, setCurrentTime, currentTime }: commentProps) => {
  const [isReply, setIsReply] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4 my-5">
      <div className="flex items-start ml-5  my-3 space-x-5">
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
        <div className=" text-sm flex flex-col gap-2 ">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold mr-3 text-sm">{comment.username}</h1>
            <p className="opacity-80">
              {comment.createdAt && calculateTimePassed(comment.createdAt)}
            </p>
          </div>
          <div className="flex space-x-5">
            <p
              onClick={() => {
                setCurrentTime(parseInt(comment.timestamp));
                console.log(Date.now());
              }}
              className=" cursor-pointer flex items-center justify-center p-2 w-14 h-6 font-bold  rounded-xl text-white bg-blue-500"
            >
              {"00:0" + comment.timestamp}
            </p>
            <p className="text-sm w-[80%] whitespace-pre-wrap">
              {comment.content}
            </p>
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
              <p
                className="underline cursor-pointer"
                onClick={() => setIsReply(!isReply)}
              >
                Trả lời
              </p>
            </div>
          </div>
          <div className="w-[100vh] mx-5 p-2">
            {isReply && (
              <WYSIWYGEditor currentTime={currentTime}></WYSIWYGEditor>
            )}
          </div>
        </div>
      </div>

      <div className="w-10/12  h-[1px] bg-gray-300"></div>
    </div>
  );
};
interface Props {
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
}
const Comments = ({ setCurrentTime, currentTime }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  const [paging, setPaging] = useState(1);
  useEffect(() => {
    if (currentCourse.currentLecture)
      dispatch(
        CommentOfLecture({
          id: currentCourse?.currentLecture?.lecture_id,
          paging: paging,
        })
      );
  }, [currentCourse.currentLecture?.lecture_id]);
  const loadMoreCommentHandler = () => {
    if (currentCourse.currentLecture != null)
      dispatch(
        LoadMoreComment({
          id: currentCourse?.currentLecture?.lecture_id,
          paging: paging + 1,
        })
      );
    setPaging(paging + 1);
  };
  console.log(currentCourse.comments);

  return (
    <div className="w-full h-auto">
      <div className="mt-3">
        <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
      </div>
      <div className="my-3 w-full">
        <WYSIWYGEditor currentTime={currentTime} />

        {currentCourse?.comments?.map((comment) => {
          return (
            <Comment
              comment={comment}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          );
        })}

        <div className="flex items-center justify-center">
          <button
            className="italic text-blue-500 w-[170px]"
            onClick={loadMoreCommentHandler}
          >
            Hiển thị thêm bình luận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
