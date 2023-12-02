import { CreateQuizContext } from "@/context/CreateQuizContext";
import { IQuestionInfo } from "@/types/type";
import React from "react";
import { useForm } from "react-hook-form";
interface IInputQuiz {
  title: string;
}
const ContentQuestionFill = (props: {
  data: IQuestionInfo;
}): React.ReactElement => {
  console.log(props.data);
  const { register, handleSubmit } = useForm<IInputQuiz>({
    defaultValues: { title: props.data.answers[0]?.answer },
  });
  const { handleEditAnswerQuestion } = React.useContext(CreateQuizContext);
  const onsubmit = (data: IInputQuiz) => {
    console.log(data);
    if (data.title !== "") {
      handleEditAnswerQuestion(props.data.question_id, {
        ...props.data.answers[0],
        answer: data.title,
      });
    }
  };
  return (
    <div className="flex flex-col items-start py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div></div>
      </div>

      <div className="space-y-2 w-full">
        <textarea
          id="message"
          rows={4}
          {...register("title")}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Câu Trả Lời..."
        ></textarea>
      </div>
      <button
        onClick={handleSubmit(onsubmit)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Lưu
      </button>
    </div>
  );
};

export default ContentQuestionFill;
