import React from "react";
import {
  CaretCircleDown,
  DotsSixVertical,
  Files,
  Question,
  Trash,
  Video,
} from "@phosphor-icons/react";
// drap drop
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { insertArrayElements } from "@/utils/utils";
import { ILessonInfo } from "@/types/type";

const lessons: ILessonInfo[] = [
  { id: 1, title: "Lesson 1", type: "video" },
  { id: 2, title: "Lesson 2", type: "quiz" },
  { id: 3, title: "Lesson 3", type: "document" },
];
const LessonList = () => {
  const [lessonList, setLessonList] = React.useState<ILessonInfo[]>(lessons);
  const handlerDragEnd = ({ active, over }: DragEndEvent) => {
    if (over) {
      const overIndex = lessonList.findIndex(
        (lesson: ILessonInfo) => lesson.id === parseInt(over.id?.toString(), 10)
      );
      const activeIndex = lessonList.findIndex(
        (lesson: ILessonInfo) =>
          lesson.id === parseInt(active.id?.toString(), 10)
      );

      // insertArrayElements<T>(arr: T[], dragIndex: number, hoverIndex: number): T[]
      const newList = insertArrayElements(lessonList, activeIndex, overIndex);
      setLessonList(newList);
    }
    //
  };

  return (
    <div className="flex flex-col items-center justify-start py-2 w-full overflow-hidden">
      <DndContext onDragEnd={handlerDragEnd}>
        <SortableContext items={lessonList}>
          {lessonList.map((item) => (
            <LessonItem key={item.id} data={item} type={item.type} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default LessonList;

interface ILessonInfoItem {
  data: ILessonInfo;
  content?: string;
  type?: string;
}
const LessonItem = (props: ILessonInfoItem) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.data.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const active = false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full flex justify-between items-center p-2 gap-2 hover:bg-gray-100 ${
        active ? "border border-blue-400" : "border- border-transparent"
      } rounded-md`}
    >
      <div className="w-full flex gap-2 overflow-hidden items-center">
        <div className="flex items-center justify-center gap-1">
          <DotsSixVertical
            size={20}
            className="cursor-pointer"
            {...listeners}
          />
          {props.type === "video" && (
            <Video size={20} className="text-yellow-400" />
          )}
          {props.type === "quiz" && (
            <Question size={20} className="text-yellow-400" />
          )}
          {props.type === "document" && (
            <Files size={20} className="text-yellow-400" />
          )}
        </div>
        <div className="w-full text-xs font-medium overflow-hidden  ">
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            Phần 1: Giới thiệu về khoá học
          </p>
        </div>
        <div></div>
      </div>
      <div className="flex gap-2">
        <div className="bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer">
          <CaretCircleDown size={15} />
        </div>
        <div className="bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer">
          <Trash size={15} />
        </div>
      </div>
    </div>
  );
};
