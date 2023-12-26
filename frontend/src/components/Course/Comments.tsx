import { IComment, SliceState } from "@/types/type";
import { Avatar, Spinner } from "@material-tailwind/react";
import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WYSIWYGEditor from "./WYSIWYGEditor";
import { calculateTimePassed } from "@/utils/utils";
import {
  CommentOfLecture,
  getReplyByCommentId,
} from "@/api/courseApi/courseApi";
interface commentProps {
  comment: IComment;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
}

const Comment = ({ comment, setCurrentTime, currentTime }: commentProps) => {
  const currentUser = useSelector((state: SliceState) => state.authSlice);
  const [isReply, setIsReply] = useState(false);
  const [Positive, setPositive] = useState<boolean | null>(null);
  const [page, setPage] = useState(1);
  const [reply, setReply] = useState<IComment[]>([]);
  const [showReply, setShowReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const loadReplyCommentHandler = async () => {
    setLoading(true);
    if (showReply === false) setShowReply(true);
    if (comment.comment_id) {
      const res: IComment[] = await getReplyByCommentId({
        id: comment.comment_id,
        paging: page,
      });
      console.log(res);

      if (res.length) {
        const newReply = res.filter((replyComment) => {
          return !reply.find(
            (existingReply) =>
              existingReply.comment_id === replyComment.comment_id
          );
        });
        setReply([...reply, ...newReply]);
      }

      setPage(page + 1);
    }
    setLoading(false);
  };
  const convertTime = (comment: IComment) => {
    if (comment?.timestamp === undefined) return "00:00";
    const timestampInSeconds = parseFloat(comment.timestamp);
    const hours = Math.floor(timestampInSeconds / 3600);
    const minutes = Math.floor((timestampInSeconds % 3600) / 60);
    const seconds = Math.floor(timestampInSeconds % 60);

    let formattedTimestamp = "";
    if (hours > 0) {
      formattedTimestamp = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      formattedTimestamp = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return formattedTimestamp;
  };
  useEffect(() => {
    if (reply.length > 0) setShowReply(true);
  }, [reply.length]);

  return (
    <div className="flex flex-col w-full justify-center items-start">
      <div className="flex items-start w-full ml-5  my-2 space-x-5">
        <div className=" flex justify-center items-center ">
          <Avatar
            loading="lazy"
            className="w-[40px] h-[40px] "
            src={
              typeof comment?.avatar === "string"
                ? comment?.avatar
                : typeof currentUser.currentUser?.avatar === "string"
                ? currentUser.currentUser?.avatar
                : undefined
            }
            alt="avatar"
          />
        </div>
        <div className=" text-sm flex  flex-col gap-2  py-3 px-5  rounded-lg">
          <div className="flex items-center  gap-2">
            <h1 className="font-semibold mr-3 text-sm">
              {comment?.username !== undefined
                ? comment.username
                : currentUser.currentUser?.username}
            </h1>
            <p className="opacity-80">
              {comment?.createdAt !== undefined
                ? calculateTimePassed(comment?.createdAt)
                : "now"}
            </p>
          </div>
          <div className="flex space-x-5">
            <p
              onClick={() => {
                setCurrentTime(parseInt(comment.timestamp));
                scrollToTop();
              }}
              className=" cursor-pointer flex items-center justify-center p-2 w-14 h-6 font-bold  rounded-xl text-white bg-blue-500"
            >
              {convertTime(comment)}
            </p>
            <p className="text-sm w-[80%] whitespace-pre-wrap font-medium">
              {comment?.content}
            </p>
          </div>

          {comment.resource !== null && comment?.resource !== undefined && (
            <div className="w-[80wh]">
              <div className="flex items-center gap-4">
                {(() => {
                  const resource =
                    typeof comment?.resource === "string"
                      ? JSON.parse(comment?.resource)
                      : comment?.resource;
                  return (
                    Array.isArray(resource) &&
                    resource.length > 0 &&
                    resource.map((res) => {
                      if (res.mimetype?.includes("image")) {
                        return (
                          <div className="flex items-center gap-2">
                            <img
                              src={res.path}
                              alt=""
                              className="w-[200px] h-[100px] rounded-lg"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div className="flex items-center gap-2">
                            <a
                              href={res.path}
                              target="_blank"
                              className="text-blue-500 underline"
                            >
                              {res.originalname}
                            </a>
                          </div>
                        );
                      }
                    })
                  );
                })()}
              </div>
            </div>
          )}
          <div className="font-semibold opacity-80 mt-2">
            <p>Nhận xét này có hữu ích không</p>
            <div className="flex space-x-5 mt-2 items-center">
              {Positive === true ? (
                <ThumbsUp
                  className="rounded-full cursor-pointer border-[2px] border-white text-white p-1 bg-black"
                  size={32}
                  onClick={() => setPositive(null)}
                />
              ) : (
                <ThumbsUp
                  className="rounded-full cursor-pointer border-[2px] border-black text-black p-1"
                  size={32}
                  onClick={() => setPositive(true)}
                />
              )}
              {Positive === false ? (
                <ThumbsDown
                  className="rounded-full cursor-pointer border-[2px] border-white text-white bg-black p-1"
                  size={32}
                  onClick={() => setPositive(null)}
                />
              ) : (
                <ThumbsDown
                  className="rounded-full cursor-pointer border-[2px] border-black text-black p-1"
                  size={32}
                  onClick={() => setPositive(false)}
                />
              )}
              {comment.isReply && comment.isReply !== "true" && (
                <p
                  className="underline cursor-pointer"
                  onClick={() => setIsReply(!isReply)}
                >
                  Trả lời
                </p>
              )}
            </div>
          </div>
          <div className="w-[100vh] mx-5 p-2 py-0">
            {isReply && (
              <div>
                <WYSIWYGEditor
                  currentTime={currentTime}
                  Reply={{ comment_id: comment.comment_id }}
                  setReply={setReply}
                ></WYSIWYGEditor>
              </div>
            )}
          </div>
          {comment.isReply === "false" && showReply === true && (
            <p
              className="underline cursor-pointer"
              onClick={() => setShowReply(false)}
            >
              Ẩn phản hồi
            </p>
          )}
          <div className="">
            {showReply === true &&
              reply.map((comment) => {
                return (
                  <Comment
                    comment={comment}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                  />
                );
              })}
            <div className="flex items-center justify-center">
              {loading && <Spinner color="blue" />}
            </div>
            {comment.isReply === "false" &&
              showReply === true &&
              comment.reply_count &&
              comment.reply_count / 3 + 1 > page && (
                <p
                  className="ml-[100px] text-blue-500 text-base font-light cursor-pointer"
                  onClick={loadReplyCommentHandler}
                >
                  Xem thêm phản hồi
                </p>
              )}
          </div>

          {showReply === false && (
            <p
              className="underline cursor-pointer"
              onClick={loadReplyCommentHandler}
            >
              {comment.reply_count && comment.reply_count > 0
                ? `Xem ${
                    comment.reply_count < reply.length
                      ? reply.length
                      : comment.reply_count
                  } phản hồi`
                : reply.length > 0
                ? `Xem ${reply.length} phản hồi`
                : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
interface Props {
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  currentTime: number;
}
const Comments = ({ setCurrentTime, currentTime }: Props) => {
  const currentCourse = useSelector((state: SliceState) => state.courseSlice);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [paging, setPaging] = useState(1);
  const getComment = async () => {
    setLoading(true);
    if (currentCourse.currentLecture) {
      const res: IComment[] = await CommentOfLecture({
        id: currentCourse?.currentLecture?.lecture_id,
        paging: 1,
      });
      console.log(res);

      if (res.length > 0) setComments(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    setComments([]);
    getComment();
  }, [currentCourse.currentLecture]);
  const loadMoreCommentHandler = async () => {
    setLoading(true);
    if (currentCourse.currentLecture != null) {
      const res: IComment[] = await CommentOfLecture({
        id: currentCourse?.currentLecture?.lecture_id,
        paging: paging + 1,
      });

      if (res.length) {
        const newComment = res.filter((comment) => {
          return !comments.find(
            (existingComment) =>
              existingComment.comment_id === comment.comment_id
          );
        });
        setComments([...comments, ...newComment]);
      }

      setPaging(paging + 1);
    }
    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full h-auto">
        <div className="mt-3">
          <h1 className="font-semibold text-xl">Phản hồi của học sinh</h1>
        </div>
        <div className="my-3 w-full flex flex-col gap-4">
          <WYSIWYGEditor
            currentTime={currentTime}
            setComments={setComments}
            setLoading={setLoading}
          />
          <div className="flex items-center justify-center">
            {loading && <Spinner color="blue" />}
          </div>
          {comments?.map((comment, index) => {
            return (
              <Comment
                key={index}
                comment={comment}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
              />
            );
          })}

          <div className="flex items-center justify-center">
            {currentCourse.currentLecture &&
              currentCourse.currentLecture.comment_pages &&
              parseInt(currentCourse.currentLecture.comment_pages) > paging && (
                <button
                  className="italic text-blue-500 w-[170px]"
                  onClick={loadMoreCommentHandler}
                >
                  Hiển thị thêm bình luận
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
