import { CreateQuizContext } from "@/context/CreateQuizContext";
import { IAnswerInfo, IQuestionInfo } from "@/types/type";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Pencil, Plus, Trash } from "@phosphor-icons/react";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContentQuestionMatching = (props: { data: IQuestionInfo }) => {
  const { handleEditQuestion } = React.useContext(CreateQuizContext);

  const handleAddNewAnswer = () => {
    handleEditQuestion({
      ...props.data,
      type: "matching",
      answers: [
        ...props.data.answers,
        {
          answer_id: (Math.random() * 10000).toString(),
          answer: "",
          image: null,
          isCorrect: 0,
          question: "",
          question_id: props.data.question_id,
          explain: "",
        },
      ],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div className="flex items-center justify-end gap-2"></div>
      </div>
      <DndContext>
        <SortableContext
          items={props.data.answers.map((item) => item.answer_id)}
        >
          <div className="space-y-2 w-full">
            {props.data.answers.length === 0 && (
              <div className="flex items-center justify-center w-full p-2 rounded-md border border-transparent relative min-h-[45px]">
                <p className="text-sm font-normal ">Chưa có câu trả lời nào</p>
              </div>
            )}
            {props.data.answers.map((item) => (
              <ItemAnswer
                key={item.answer_id}
                id={item.answer_id}
                data={item}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full  mb-4 mt-4 flex items-center justify-center">
        <button
          onClick={handleAddNewAnswer}
          type="submit"
          className="p-2 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Plus size={15} />
          <span className="sr-only">Thêm</span>
        </button>
      </div>
    </div>
  );
};

export default ContentQuestionMatching;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ItemAnswer = (_props: {
  id: string;
  data: IAnswerInfo;
}): React.ReactElement => {
  const [hover, setHover] = React.useState<boolean>(false);
  return (
    <div
      className="relative flex items-stretch gap-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* question */}
      <div className="flex-1 relative pl-7 p-2 bg-white h-full flex flex-col justify-center gap-2 ">
        <h5 className="text-sm font-semibold text-gray-500">Câu Hỏi</h5>
        <div className="flex items-center justify-start gap-2 leading-3 text-black font-normal text-sm ">
          <p>Bill</p>
          <Pencil size={15} className="text-gray-700" />
        </div>
        <div className="w-4 h-6 bg-white border-r-4 border-t-4 border-b-4 border-blue-200/30 rounded-r-full absolute -right-4 z-1"></div>
      </div>
      {/* answer */}
      <div className="flex-1 relative pl-7 p-2 bg-white h-full flex justify-between items-center ">
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-gray-500">Đáp Án</h5>
          <div className="flex items-center justify-start leading-3 text-black font-normal text-sm ">
            <div className="flex items-center gap-2">
              <p>Bill</p>
              <Pencil size={15} className="text-gray-700" />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {hover && (
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-blue-500 font-medium text-xs bg-blue-50/20 hover:bg-blue-500 hover hover:text-white border border-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-100 rounded-lg  px-3 py-0.5 text-center dark:focus:ring-blue-600 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:bg-blue-700"
            >
              <Plus size={15} />
              <p>Giải Thích</p>
            </button>
          )}
          <button className=" p-1  text-gray-500 hover:text-gray-600">
            <Trash size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
