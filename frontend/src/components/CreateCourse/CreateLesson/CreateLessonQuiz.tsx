import React from "react";
import {
  CaretDown,
  DotsSixVertical,
  Pencil,
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

interface IInputTitle {
  title: string;
}
const CreateLessonQuiz = (): React.ReactElement => {
  const { register, handleSubmit } = useForm<IInputTitle>();
  const onSubmitTitle = (data: IInputTitle) => {};
  return (
    <div className="w-full h-full">
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
          disabled={true}
          className="text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Lưu
        </button>
      </div>
      <ContainerQuestion />
      <div className="w-full">
        <AddQuestion />
      </div>
    </div>
  );
};

export default CreateLessonQuiz;

const ContainerQuestion = (): React.ReactElement => {
  return (
    <div className="py-6 space-y-2">
      <QuestionItem />
    </div>
  );
};

const QuestionItem = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionType, setQuestionType] = React.useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any>([]);

  return (
    <div className=" px-2 pt-2 rounded-md border border-transparent bg-blue-200/30 relative  flex flex-col justify-center items-center">
      <button className="absolute -top-[10px] p-1 border-4 border-white bg-blue-600 hover:bg-blue-500 active:bg-blue-600 text-white rounded-md">
        <Plus size={15} />
      </button>
      <div className="absolute right-0 -top-[1px] flex bg-white">
        <button className="bg-red-500 p-1  text-white">
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
              <p className="text-sm font-semibold">Fill the Gap</p>
              <Pencil size={15} className="text-gray-500" />
            </div>
            <div className="flex items-center justify-start gap-4">
              <select
                onChange={(e) => setQuestionType(parseInt(e.target.value))}
                value={questionType}
                className="bg-white border border-transparent text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={1}>Lựa Chọn Duy Nhất</option>
                <option value={2}>Nhiều Lựa Chọn</option>
                <option value={3}>Đúng - Sai</option>
                <option value={4}>Kết Hợp</option>
                <option value={5}>Kết Hợp Hình Ảnh</option>
                <option value={6}>Từ Khoá</option>
                <option value={7}>Điền Vào Khoảng Trống</option>
              </select>
              {/* <select className="bg-white border border-transparent text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="">Chọn Thể Loại</option>
                <option value="">Nhiều Lựa Chọn</option>
                <option value="CA">Đúng - Sai</option>
                <option value="FR">Kết Hợp</option>
                <option value="DE">Từ Khóa</option>
                <option value="DE">Điền Vào Khoảng Trống</option>
              </select> */}
            </div>
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
        <RenderContentQuestion type={questionType} />
      </div>
    </div>
  );
};
const RenderContentQuestion = (props: { type: number }) => {
  if (props.type === 1) return <ContentQuestionSingleChoice data={[]} />;
  if (props.type === 2) return <ContentQuestionMultiplyChoice data={[]} />;
  if (props.type === 3) return <ContentQuestionTrueFalse data={[]} />;
  if (props.type === 4) return <ContentQuestionMatching data={[]} />;
  if (props.type === 5) return <ContentQuestionMatchingImage data={[]} />;
  if (props.type === 6) return <ContentQuestionKeyword />;
  if (props.type === 7) return <ContentQuestionFill />;
};
const AddQuestion = (): React.ReactElement => {
  // set the dropdown menu element
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
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Lựa Chọn Duy Nhất</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Nhiều Lựa Chọn</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Đúng - Sai</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Kết Hợp</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Kết Hợp Hình Ảnh</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Từ Khoá</p>
            </div>
          </MenuItem>
          <MenuItem>
            <div className="flex items-center justify-start gap-2">
              <p className="text-sm font-semibold">Điền Vào Khoảng Trống</p>
            </div>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
