import React from "react";
import {
  CaretDown,
  DotsSixVertical,
  Plus,
  Question,
  Trash,
} from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import ContentQuestionSingleChoice from "./Quiz/ContentQuestionSingleChoice";
import ContentQuestionMultiplyChoice from "./Quiz/ContentQuestionMultiplyChoice";
import ContentQuestionTrueFalse from "./Quiz/ContentQuestionTrueFalse";
import ContentQuestionMatching from "./Quiz/ContentQuestionMatching";
import ContentQuestionMatchingImage from "./Quiz/ContentQuestionMatchingImage";
import ContentQuestionKeyword from "./Quiz/ContentQuestionKeyword";
import ContentQuestionFill from "./Quiz/ContentQuestionFill";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import TextEditor from "./TextEditor/TextEditor";
import { IQuestionInfo, IQuizInfo } from "@/types/type";
import { CreateQuizContext } from "@/context/CreateQuizContext";
import InputEditTitle from "./Quiz/InputEditTitle";
import { CreateCourseContext } from "@/context/CreateCourseContext";
import quizApi from "@/api/quizApi";

interface IInputQuiz {
  title: string;
}

const CreateLessonQuiz = (): React.ReactElement => {
  const [indexTab, setIndexTab] = React.useState<number>(0);
  //
  const { dataQuiz, setDataQuiz } = React.useContext(CreateQuizContext);
  const { selectLesson, handleEditLesson } =
    React.useContext(CreateCourseContext);
  //
  const { register, handleSubmit } = useForm<IInputQuiz>({
    defaultValues: { title: selectLesson?.name },
  });
  const onSubmitTitle = (data: IInputQuiz) => {
    if (data.title.trim() === "") return;
    if (selectLesson) {
      handleEditLesson({
        ...selectLesson,
        name: data.title,
      });
    }
  };
  // React.useEffect(() => {
  //   console.log(dataQuiz);
  // }, [dataQuiz]);
  React.useEffect(() => {
    if (selectLesson) {
      const requestApi = async () => {
        const res = await quizApi.getQuiz(selectLesson.lecture_id);
        setDataQuiz(res);
      };
      requestApi();
    }
  }, [selectLesson, setDataQuiz]);
  return (
    <div className="w-full h-full space-y-2">
      {/* header */}
      <div className="w-full p-2 border-b-2 border-gray-200 flex items-center gap-2">
        <div className="flex flex-1">
          <div className=" flex gap-2 p-2 items-center text-gray-400 bg-gray-200 rounded-tl-md rounded-bl-md">
            <Question size={20} />
            <p className="text-xs  font-bold leading-3">Tên bài kiểm tra</p>
          </div>
          <div className=" flex flex-1 items-center p-2 border border-gray- rounded-r-md">
            <input
              {...register("title")}
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
      {/* tab content */}
      <div className="w-full">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setIndexTab(0)}
                className={`inline-block p-4 ${
                  indexTab === 0
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } rounded-t-lg `}
              >
                Câu Hỏi
              </div>
            </li>
            <li className="mr-2 cursor-pointer">
              <div
                onClick={() => setIndexTab(1)}
                className={`inline-block p-4 ${
                  indexTab === 1
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                } rounded-t-lg active `}
                aria-current="page"
              >
                Thiết Lập
              </div>
            </li>
          </ul>
        </div>
        {indexTab === 0 && (
          <>
            <ContainerQuestion data={dataQuiz.questions} />
            <div className="w-full">
              <AddQuestion />
            </div>
          </>
        )}

        {indexTab === 1 && (
          <div className="py-6 space-y-2">
            <SettingQuiz />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLessonQuiz;

const SettingQuiz = (): React.ReactElement => {
  const { dataQuiz } = React.useContext(CreateQuizContext);
  const { register, handleSubmit, setValue } = useForm<IQuizInfo>({
    defaultValues: dataQuiz,
  });
  const handleUpdateInfoQuiz = (data: IQuizInfo) => {
    if (dataQuiz.lecture_id) {
      quizApi.updateQuiz(data);
    }
  };
  return (
    <div className="w-full space-y-3 px-2">
      <div className="space-y-2">
        <p className="text-xs font-bold text-black">Mô Tả</p>
        <textarea
          {...register("content")}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Viết Mô Tả Về Bài Kiếm Tra..."
        ></textarea>
      </div>
      <div className="flex gap-2">
        <div className="space-y-2">
          <p className="text-xs font-bold text-black">
            Thời lượng bài kiểm tra
          </p>
          <input
            {...register("duration")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-black">Đơn vị thời gian</p>
          <select
            {...register("durationUnit")}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"m"}>phút</option>
            <option value={"d"}>ngày</option>
            <option value={"w"}>tuần</option>
          </select>
        </div>
      </div>
      {/* <div className="space-y-2">
        <p className="text-xs font-bold text-black">Loại bài Kiểm Tra</p>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={"Default"}>Mặc định</option>
          <option value={"global"}>toàn cầu</option>
          <option value={"Pagination"}>Phân trang</option>
        </select>
      </div> */}

      <div className="flex items-center justify-start gap-2">
        <label className="relative inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            {...register("isRandom")}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Chọn ngẫu nhiên các câu hỏi
          </span>
        </label>
        <label className="relative inline-flex items-center mb-4 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            {...register("isShowAnswer")}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Hiển thị câu trả lời đúng
          </span>
        </label>
      </div>
      <div className="flex gap-2">
        <div className="space-y-2">
          <p className="text-xs font-bold text-black">Đạt điểm (%)</p>
          <input
            {...register("passPercent")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-black">
            Bị cắt điểm sau khi thi lại (%)
          </p>
          <input
            {...register("retakePercent")}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold text-black">Nội dung bài học</p>
        <TextEditor
          value={dataQuiz.description}
          onEditorChange={(data) => {
            setValue("description", data);
          }}
        />
      </div>
      <div className="flex w-full py-4 px-2">
        <button
          onClick={handleSubmit(handleUpdateInfoQuiz)}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

const ContainerQuestion = ({
  data,
}: {
  data: IQuestionInfo[];
}): React.ReactElement => {
  return (
    <div className="py-6 space-y-2">
      {data.length === 0 ? (
        <div className="flex items-center justify-center w-full p-2 rounded-md border border-transparent relative min-h-[45px]">
          <p className="text-sm font-normal ">Chưa có câu trả lời nào</p>
        </div>
      ) : (
        data.map((item) => (
          <div key={item.question_id} className="w-full">
            <QuestionItem data={item} />
          </div>
        ))
      )}
    </div>
  );
};

const QuestionItem = ({
  data,
}: {
  data: IQuestionInfo;
}): React.ReactElement => {
  // ===================================================== update last ===========================================
  // const [questionType, setQuestionType] = React.useState<string>(data.type); // set type question
  // ==============================================================================================================

  const [isHover, setIsHover] = React.useState<boolean>(false);
  const { handleEditQuestion, handleDeleteQuestion } =
    React.useContext(CreateQuizContext);
  // =======================================================update last==========================================
  // useEffect(() => {
  //   if (questionType === "fill")
  //     handleEditQuestion({
  //       ...data,
  //       answers: [
  //         {
  //           answer_id: `${Math.floor(Math.random() * 1000000)}`,
  //           question_id: data.question_id,
  //           answer: "nhập câu trả lời",
  //           isCorrect: true,
  //           image: null,
  //           question: null,
  //         },
  //       ],
  //     });
  //   else if (questionType === "true_false")
  //     handleEditQuestion({
  //       ...data,
  //       answers: [
  //         {
  //           answer_id: ` ${Math.floor(Math.random() * 1000000)} `,
  //           question_id: data.question_id,
  //           answer: "true",
  //           isCorrect: true,
  //           image: null,
  //           question: "",
  //         },
  //         {
  //           answer_id: `${Math.floor(Math.random() * 1000000)}`,
  //           question_id: data.question_id,
  //           answer: "false",
  //           isCorrect: false,
  //           image: null,
  //           question: null,
  //         },
  //       ],
  //     });
  //   else
  //     handleEditQuestion({
  //       ...data,
  //       answers: [],
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [questionType]);
  // ============================================================================================================
  const handleClickDeleteQuestion = () => {
    handleDeleteQuestion(data.question_id);
  };

  const handleEditQuestionTitle = (title: string) => {
    handleEditQuestion({
      ...data,
      question: title,
    });
  };

  const renderTextType = (type: string) => {
    if (type === "single_choice") return "Lựa Chọn Duy Nhất";
    if (type === "multiple_choice") return "Nhiều Lựa Chọn";
    if (type === "true_false") return "Đúng - Sai";
    if (type === "matching") return "Kết Hợp";
    if (type === "matching_image") return "Kết Hợp Hình Ảnh";
    if (type === "keyword") return "Từ Khoá";
    if (type === "fill") return "Điền Vào Khoảng Trống";
  };
  return (
    <div
      className=" px-2 pt-2 rounded-md border border-transparent bg-blue-200/30 relative  flex flex-col justify-center items-center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <button className="absolute -top-[10px] p-1 border-4 border-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600 text-white rounded-md">
          <Plus size={15} />
        </button>
      )}
      <div className="absolute right-0 -top-[1px] flex bg-white">
        <button
          className="bg-red-500 p-1  text-white"
          onClick={handleClickDeleteQuestion}
        >
          <Trash size={15} />
        </button>
        <div className="flex items-center justify-center">
          <DotsSixVertical size={15} className="cursor-pointer" />
        </div>
      </div>
      {/* question */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div className="h-[50px] w-[50px] bg-white flex items-center justify-center"></div>
          <div className="space-y-2">
            <div className="flex items-center justify-start gap-2">
              <InputEditTitle
                value={data.question ? data.question : "nhập câu hỏi"}
                onSubmit={handleEditQuestionTitle}
              />
            </div>
            <div className="flex items-center justify-start text-gray-500 text-sm font-medium">
              {renderTextType(data.type)}
            </div>
            {/* =========================================================================== update last ===========================================================*/}
            {/* <div className="flex items-center justify-start gap-4">
              <select
                onChange={(e) => setQuestionType(e.target.value)}
                value={questionType}
                className="bg-white border border-transparent text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"single_choice"}>Lựa Chọn Duy Nhất</option>
                <option value={"multiple_choice"}>Nhiều Lựa Chọn</option>
                <option value={"true_false"}>Đúng - Sai</option>
                <option value={"matching"}>Kết Hợp</option>
                <option value={"matching_image"}>Kết Hợp Hình Ảnh</option>
                <option value={"keyword"}>Từ Khoá</option>
                <option value={"fill"}>Điền Vào Khoảng Trống</option>
              </select>
            </div> */}
            {/* ================================================================================================================================================== */}
          </div>
        </div>
        <div className="flex items-center justify-center pr-10">
          <button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <svg
              className="w-2 h-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
      </div>
      <hr className="h-px my-4 bg-gray-300 border-0 dark:bg-gray-700 w-full"></hr>
      {/* answer */}
      <div className="w-full">
        <RenderContentQuestion type={data.type} data={data} />
      </div>
    </div>
  );
};
const RenderContentQuestion = (props: {
  type: string;
  data: IQuestionInfo;
}) => {
  if (props.type === "single_choice")
    return <ContentQuestionSingleChoice data={props.data} />;
  if (props.type === "multiple_choice")
    return <ContentQuestionMultiplyChoice data={props.data} />;
  if (props.type === "true_false")
    return <ContentQuestionTrueFalse data={props.data} />;
  if (props.type === "matching")
    return <ContentQuestionMatching data={props.data} />;
  if (props.type === "matching_image")
    return <ContentQuestionMatchingImage data={props.data} />;
  if (props.type === "keyword")
    return <ContentQuestionKeyword data={props.data} />;
  if (props.type === "fill") return <ContentQuestionFill data={props.data} />;
};
const AddQuestion = (): React.ReactElement => {
  const { handleAddNewQuestion, dataQuiz } =
    React.useContext(CreateQuizContext);
  // set the dropdown menu element
  const handleAddQuestion = (type: string) => {
    handleAddNewQuestion({
      question_id: Math.floor(Math.random() * 1000000).toString(),
      lecture_id: dataQuiz.lecture_id,
      quiz_id: dataQuiz.quiz_id,
      question: "nhập câu hỏi",
      type: type,
      answers: [],
      images: null,
    });
  };
  return (
    <div className="border-dashed border-2 border-sky-500 px-5 py-4 flex items-center justify-center gap-2">
      <Menu>
        <MenuHandler>
          <button
            id="dropdownAddNewQuestion"
            type="button"
            className="flex items-center justify-center gap-2 text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-1 text-center mr-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-500"
          >
            <Plus size={15} />
            Loại câu hỏi
            <CaretDown size={15} weight="fill" />
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("single_choice")}
            >
              <p className="text-sm font-semibold">Lựa Chọn Duy Nhất</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("multiple_choice")}
            >
              <p className="text-sm font-semibold">Nhiều Lựa Chọn</p>
            </div>
          </MenuItem>
          {/* ===============================================================================update lase================================================== */}
          {/* <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("true_false")}
            >
              <p className="text-sm font-semibold">Đúng - Sai</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("matching")}
            >
              <p className="text-sm font-semibold">Kết Hợp</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("matching_image")}
            >
              <p className="text-sm font-semibold">Kết Hợp Hình Ảnh</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("keyword")}
            >
              <p className="text-sm font-semibold">Từ Khoá</p>
            </div>
          </MenuItem> */}
          {/* ================================================================================================================================================== */}
          <MenuItem>
            <div
              className="flex items-center justify-start gap-2"
              onClick={() => handleAddQuestion("fill")}
            >
              <p className="text-sm font-semibold">Điền Vào Khoảng Trống</p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
