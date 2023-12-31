import { CreateQuizContext } from "@/context/CreateQuizContext";
import { IAnswerInfo, IQuestionInfo } from "@/types/type";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForm } from "react-hook-form";
import {
  DotsSixVertical,
  // Image,
  List,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import React from "react";
import InputEditTitle from "./InputEditTitle";

interface IInputAnswer {
  title: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContentQuestionMultiplyChoice = (props: { data: IQuestionInfo }) => {
  const [typeAnswer, setTypeAnswer] = React.useState<string>("answer");
  const { handleAddNewAnswerQuestion } = React.useContext(CreateQuizContext);
  const { register, handleSubmit, reset } = useForm<IInputAnswer>();
  const onSubmit = (data: IInputAnswer) => {
    if (data.title === "") return;
    handleAddNewAnswerQuestion({
      answer_id: `${props.data.answers.length + 1}`,
      question_id: props.data.question_id,
      answer: data.title,
      isCorrect: 0,
      image: null,
      question: null,
    });
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div className="flex items-center justify-end gap-2">
          <List
            size={15}
            className={`${
              typeAnswer === "answer" ? "text-blue-500" : "hover:text-blue-400"
            }`}
            onClick={() => setTypeAnswer("answer")}
          />
          {/* ===========================================================update laster =========================================== */}
          {/* <Image
            size={15}
            className={`${
              typeAnswer === "image" ? "text-blue-500" : "hover:text-blue-400"
            }`}
            onClick={() => setTypeAnswer("image")}
          /> */}
        </div>
      </div>
      {props.data.answers.length === 0 ? (
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-center w-full p-2 rounded-md border border-transparent relative min-h-[45px]">
            <p className="text-sm font-normal ">Chưa có câu trả lời nào</p>
          </div>
        </div>
      ) : (
        <DndContext>
          <SortableContext
            items={props.data.answers.map((item) => item.answer_id)}
          >
            <div className="space-y-2 w-full">
              {typeAnswer === "answer" ? (
                <>
                  {props.data.answers.map((item) => {
                    return (
                      <ItemAnswer
                        key={item.answer_id}
                        id={item.answer_id}
                        data={item}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  {props.data.answers.map((item) => {
                    return (
                      <ItemAnswerImage
                        key={item.answer_id}
                        id={item.answer_id}
                        data={item}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="w-full  mb-4 mt-4 ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            add
          </label>
          <div className="relative w-full">
            <input
              {...register("title")}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Thêm trả lời mới..."
              required
            />
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Plus size={15} />
            <span className="sr-only">Thêm</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentQuestionMultiplyChoice;

const ItemAnswer = (props: {
  id: string;
  data: IAnswerInfo;
}): React.ReactElement => {
  const [hover, setHover] = React.useState<boolean>(false);
  const [isCheck, setIsCheck] = React.useState<boolean>(
    props.data.isCorrect ? true : false
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { handleEditAnswerQuestion, handleDeleteAnswerQuestion } =
    React.useContext(CreateQuizContext);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    handleEditAnswerQuestion(props.data.answer_id, {
      ...props.data,
      isCorrect: e.target.checked ? 1 : 0,
    });
    setIsCheck(e.target.checked);
  };

  return (
    <div
      className=" flex items-center justify-between w-full p-2 rounded-md border border-transparent bg-white relative min-h-[45px]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-start gap-2">
        <div className="flex items-center justify-center" {...listeners}>
          <DotsSixVertical size={15} className="cursor-pointer" />
        </div>

        <InputEditTitle
          onSubmit={(data) =>
            handleEditAnswerQuestion(props.data.question_id, {
              ...props.data,
              answer: data,
            })
          }
          value={
            props.data.answer ? props.data.answer : "chưa nhập câu trả lời"
          }
        />
      </div>
      <div className="flex bg-white items-center justify-center gap-3">
        {hover && (
          <>
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-blue-500 font-medium text-xs bg-blue-50/20 hover:bg-blue-500 hover hover:text-white border border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-100 rounded-lg  px-3 py-0.5 text-center dark:focus:ring-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700"
            >
              <Plus size={15} />
              <p>Thêm Giải Thích</p>
            </button>
            <button
              className=" p-1  text-gray-500 hover:text-gray-600"
              onClick={() => handleDeleteAnswerQuestion(props.data)}
            >
              <Trash size={15} />
            </button>
          </>
        )}
        <p className="text-sm font-medium text-gray-500">Đúng</p>
        <input
          type="checkbox"
          value={props.data.answer_id}
          checked={isCheck}
          onChange={(e) => {
            handleChangeValue(e);
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

const ItemAnswerImage = (props: {
  id: string;
  data: IAnswerInfo;
}): React.ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const { handleEditAnswerQuestion, handleDeleteAnswerQuestion } =
    React.useContext(CreateQuizContext);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    handleEditAnswerQuestion(props.data.answer_id, {
      ...props.data,
      isCorrect: e.target.checked ? 1 : 0,
    });
  };

  return (
    <div
      className="flex flex-col gap-2 bg-white p-2 rounded-md border border-transparent"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className=" flex items-center justify-between w-full relative">
        <div className="flex items-center justify-start gap-2">
          <div className="flex items-center justify-center" {...listeners}>
            <DotsSixVertical size={15} className="cursor-pointer" />
          </div>
          <p className="text-xs font-normal">Power Supply</p>
          <div className=" text-gray-500">
            <Pencil size={15} />
          </div>
        </div>
        <div className="flex bg-white items-center justify-center gap-3">
          <p className="text-sm font-medium text-gray-500">Đúng</p>
          <input
            type="checkbox"
            checked={props.data.isCorrect ? true : false}
            onChange={(e) => {
              handleChangeValue(e);
            }}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Bấm để tải lên</span> hoặc kéo và
              thả
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="flex items-center justify-center gap-2 text-blue-500 font-medium text-xs bg-blue-50/20 hover:bg-blue-500 hover hover:text-white border border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-100 rounded-lg  px-3 py-0.5 text-center dark:focus:ring-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700"
        >
          <Plus size={15} />
          <p>Thêm Giải Thích</p>
        </button>
        <button
          className=" p-1  text-gray-500 hover:text-gray-600"
          onClick={() => handleDeleteAnswerQuestion(props.data)}
        >
          <Trash size={15} />
        </button>
      </div>
    </div>
  );
};
