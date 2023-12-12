import { CommentLecture } from "@/api/courseApi/courseApi";
import { IComment, SliceState } from "@/types/type";
import { Avatar } from "@material-tailwind/react";
import React, { useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useSelector } from "react-redux";

const WYSIWYGEditor = ({
  currentTime,
  Reply,
  setReply,
  setComments,
  setLoading,
}: {
  currentTime: number;
  Reply?: { comment_id: string | null | undefined };
  setComments?: React.Dispatch<React.SetStateAction<IComment[]>>;
  setReply?: React.Dispatch<React.SetStateAction<IComment[]>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentUser } = useSelector((state: SliceState) => state.authSlice);
  const { currentLecture } = useSelector(
    (state: SliceState) => state.courseSlice
  );
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files

    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (setLoading) setLoading(true);
    if (currentUser != null && currentLecture != null) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("timestamp", currentTime.toString());
      formData.append("lecture_id", currentLecture.lecture_id);
      formData.append("username", currentUser.username);
      formData.append("isReply", Reply ? "true" : "false");
      if (Reply && Reply.comment_id) {
        formData.append("reply_id", Reply.comment_id);
      }
      files.forEach((file) => {
        formData.append("files", file);
      });
      const res = await CommentLecture(formData);
      if (Reply && setReply && res) {
        console.log(res);

        setReply((prev: IComment[]) => [res as IComment, ...prev]);
      } else {
        if (setComments && res) {
          console.log(res);

          setComments((prev: IComment[]) => [res as IComment, ...prev]);
        }
      }

      setContent("");
      setFiles([]);
    }
    if (setLoading) setLoading(false);
  };

  return (
    <div className="grid grid-cols-12">
      <Avatar
        loading="lazy"
        className="w-[40px] h-[40px] col-span-1"
        src={
          currentUser && typeof currentUser.avatar === "string"
            ? currentUser.avatar
            : "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
        }
        alt="avatar"
      />
      <div className="w-full col-span-11 mb-4 border-2 border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center justify-between px-3 py-2 border-b-2 dark:border-gray-600">
          <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600"></div>

          <div
            id="tooltip-fullscreen"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Show full screen
            <div className="tooltip-arrow" data-popper-arrow />
          </div>
        </div>
        <div
          className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800"
          {...getRootProps()}
        >
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-3">
              {files.map((data) => {
                return (
                  <div className="m-2 text-gray-800 w-[200px] flex flex-col items-center rounded-lg bg-gray-300 relative">
                    <div
                      onClick={() => {
                        //remove file from files
                        setFiles((prevFiles) => {
                          return prevFiles.filter(
                            (file) => file.name !== data.name
                          );
                        });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 flex justify-center items-center rounded-full text-[8px]  font-bold cursor-pointer"
                    >
                      X
                    </div>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={URL.createObjectURL(data)}
                      alt=" "
                    ></img>
                    <p style={{ color: "black", fontSize: 12 }}>{data.name}</p>
                  </div>
                );
              })}
            </div>
            <textarea
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write an article..."
              required
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              defaultValue={""}
            ></textarea>
          </div>
          {isDragActive ? <p></p> : <p></p>}
        </div>
      </div>
      <button
        onClick={submitHandler}
        className="inline-flex col-span-3 items-center px-2 ml-14 justify-center py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Bình luận
      </button>
    </div>
  );
};

export default WYSIWYGEditor;
