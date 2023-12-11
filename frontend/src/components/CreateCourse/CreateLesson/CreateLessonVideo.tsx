import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import { Video } from "@phosphor-icons/react";
import React from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import TextEditor from "./TextEditor/TextEditor";
import { ILessonInfo } from "@/types/type";
import YouTube, { YouTubeEvent } from "react-youtube";
import axios from "axios";
import { isUrl } from "@/utils/utils";

const CreateLessonVideo = () => {
  const { selectLesson, handleEditLesson } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  const { register, handleSubmit, setValue, reset, watch } =
    useForm<ILessonInfo>({
      defaultValues: {
        ...selectLesson,
      },
    });
  React.useEffect(() => {
    reset(selectLesson);
  }, [reset, selectLesson, setValue]);

  const onSubmitTitle = (data: ILessonInfo) => {
    const lesson = selectLesson;
    lesson!.name = data.name;
    if (!lesson) return;
    handleEditLesson(lesson);
  };
  const onSubmitData = (data: ILessonInfo) => {
    console.log(data);
    if (!selectLesson) return;
    handleEditLesson({
      lecture_id: selectLesson?.lecture_id ? selectLesson?.lecture_id : "",
      session_id: selectLesson?.session_id ? selectLesson?.session_id : "",
      name: data.name,
      description: data.description,
      duration: data.duration,
      source: data.source,
      type: "video",
    });
  };
  const [selectTypeVideo, setSelectTypeVideo] =
    React.useState<string>("youtube");
  return (
    <div className="w-full h-full">
      {/* header */}
      <div className="w-full p-2 border-b-2 border-gray-200 flex items-center gap-2">
        <div className="flex flex-1">
          <div className=" flex gap-2 p-2 items-center text-gray-400 bg-gray-200 rounded-tl-md rounded-bl-md">
            <Video size={20} />
            <p className="text-xs  font-bold leading-3">Tên Video bài giảng</p>
          </div>
          <div className=" flex flex-1 items-center p-2 border border-gray- rounded-r-md">
            <input
              {...register("name")}
              placeholder="Nhập tiêu đề..."
              className="text-sm w-full outline-none border-none"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmitTitle)}
          type="button"
          // disabled={true}
          className="text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lưu
        </button>
      </div>
      {/* content */}
      <div className="content py-4 px-2 space-y-4">
        <div className="w-full">
          <label
            form="first_name"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Loại nguồn
          </label>
          <select
            id="Source_type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setSelectTypeVideo(e.target.value)}
            value={selectTypeVideo}
          >
            <option defaultValue={"youtube"} value="youtube">
              youtube
            </option>
          </select>
        </div>
        <UploadVideoType
          selectTypeVideo={selectTypeVideo}
          register={register}
          watch={watch}
          setValue={setValue}
        />
        <div className="w-full">
          <label
            form="first_name"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Thời lượng bài học
          </label>
          <input
            {...register("duration")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Thời lượng bài học"
            readOnly={true}
          />
        </div>
        <div className="w-full">
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Mô tả về bài giảng
          </label>
          <TextEditor
            value={watch("description") ? watch("description") : ""}
            onEditorChange={(data) => {
              setValue("description", data);
            }}
          />
        </div>
      </div>
      <div className="h-50px] w-full relative">
        <div className="sticky bottom-0 left-0 w-full flex justify-end">
          <button
            onClick={handleSubmit(onSubmitData)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLessonVideo;
// check video link url
const validateYoutubeId = async (youtubeId?: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=AIzaSyBzSWAb7dLcdSJh7dHX-lhI9SsSUeG4_UU`
    );
    const items = response.data.items;
    if (items.length === 0) {
      return false; // Video not found
    }
    return true; // Video found
  } catch (error) {
    console.error(error);
    return false;
  }
};
// check video link show content
const CheckVideoLink = (props: {
  videoUrl: string;
  setValue: UseFormSetValue<ILessonInfo>;
}) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const url = new URL(props.videoUrl);
  const youtubeId = url.searchParams.get("v");
  const onReady = (event: YouTubeEvent) => {
    // playerRef.current = event.target;

    const duration = event.target.getDuration();
    props.setValue("duration", duration);
  };
  React.useEffect(() => {
    const validateLink = async () => {
      const isValidId = await validateYoutubeId(youtubeId || "");
      setIsValid(isValidId);
    };
    validateLink();
  }, [youtubeId, props.videoUrl]);

  return (
    <div className="w-full flex items-center justify-center">
      {isValid ? (
        <div className="w-[60%] aspect-video">
          <YouTube videoId={youtubeId || ""} onReady={onReady} />
        </div>
      ) : (
        <div className="w-[60%] aspect-video flex items-center justify-center bg-gray-200 rounded-md">
          <h4 className="text">Liên kết không khả dụng</h4>
        </div>
      )}
    </div>
  );
};
// preview video

const PreviewVideo = (props: {
  register: UseFormRegister<ILessonInfo>;
  watch: UseFormWatch<ILessonInfo>;
  setValue: UseFormSetValue<ILessonInfo>;
}) => {
  return (
    <div className="w-full flex flex-col gap-3 ">
      <label
        form="message"
        className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
      >
        Video URL
      </label>
      <input
        {...props.register("source")}
        className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="video URL..."
      ></input>
      {/* preview */}
      {props.watch("source") && isUrl(props.watch("source").toString()) && (
        <CheckVideoLink
          videoUrl={props.watch("source").toString()}
          setValue={props.setValue}
        />
      )}
    </div>
  );
};
// upload video
const UploadVideoType = (props: {
  selectTypeVideo: string;
  register: UseFormRegister<ILessonInfo>;
  watch: UseFormWatch<ILessonInfo>;
  setValue: UseFormSetValue<ILessonInfo>;
}): React.ReactElement => {
  return (
    <div className="w-full">
      {props.selectTypeVideo === "youtube" && <PreviewVideo {...props} />}
      {props.selectTypeVideo === "Vimeo" && (
        <>
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Video URL
          </label>
          <textarea
            {...props.register("source")}
            rows={4}
            className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="video URL..."
          ></textarea>
        </>
      )}
      {props.selectTypeVideo === "Embed" && (
        <>
          <label
            form="message"
            className="block mb-2 text-xs font-bold text-gray-700 dark:text-white"
          >
            Video URL
          </label>
          <textarea
            {...props.register("source")}
            rows={4}
            className="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="video URL..."
          ></textarea>
        </>
      )}
    </div>
  );
};
