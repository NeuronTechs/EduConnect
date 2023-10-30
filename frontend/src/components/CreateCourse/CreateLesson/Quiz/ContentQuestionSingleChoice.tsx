/* eslint-disable @typescript-eslint/no-unused-vars */
import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DotsSixVertical,
  Image,
  List,
  Pencil,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import React from "react";

const ContentQuestionSingleChoice = (props: {
  data: [];
}): React.ReactElement => {
  const [typeAnswer, setTypeAnswer] = React.useState<string>("answer");
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
          <Image
            size={15}
            className={`${
              typeAnswer === "image" ? "text-blue-500" : "hover:text-blue-400"
            }`}
            onClick={() => setTypeAnswer("image")}
          />
        </div>
      </div>
      <DndContext>
        <SortableContext items={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
          <div className="space-y-2 w-full">
            {typeAnswer === "answer" ? (
              <>
                <ItemAnswer
                  id={1}
                  data={{ id: 1, answer: "", isCorrect: false }}
                />
                <ItemAnswer
                  id={2}
                  data={{ id: 2, answer: "", isCorrect: false }}
                />
                <ItemAnswer
                  id={2}
                  data={{ id: 3, answer: "", isCorrect: false }}
                />
              </>
            ) : (
              <>
                <ItemAnswerImage
                  id={3}
                  data={{ id: 1, answer: "", isCorrect: false }}
                />
                <ItemAnswerImage
                  id={3}
                  data={{ id: 2, answer: "", isCorrect: false }}
                />
                <ItemAnswerImage
                  id={3}
                  data={{ id: 3, answer: "", isCorrect: false }}
                />
              </>
            )}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full  mb-4 mt-4 ">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            add
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Thêm trả lời mới..."
              required
            />
          </div>
          <button
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

export default ContentQuestionSingleChoice;

interface IItemAnswer {
  id: number;
  answer: string;
  isCorrect: boolean;
}
const ItemAnswer = (props: {
  id: number;
  data: IItemAnswer;
}): React.ReactElement => {
  const [hover, setHover] = React.useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        <p className="text-xs font-normal">Power Supply</p>
        <div className=" text-gray-500">
          <Pencil size={15} />
        </div>
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
            <button className=" p-1  text-gray-500 hover:text-gray-600">
              <Trash size={15} />
            </button>
          </>
        )}
        <p className="text-sm font-medium text-gray-500">Đúng</p>
        <input
          type="radio"
          value=""
          name="bordered-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

const ItemAnswerImage = (props: {
  id: number;
  data: IItemAnswer;
}): React.ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
            checked
            type="radio"
            value=""
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                stroke-linecap="round"
                stroke-linejoin="round"
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
        <button className=" p-1  text-gray-500 hover:text-gray-600">
          <Trash size={15} />
        </button>
      </div>
    </div>
  );
};
