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
// logic main
import { insertArrayElements } from "@/utils/utils";
import { ILessonInfo, ISectionInfo } from "@/types/type";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";

interface ILessonList {
  data: ISectionInfo;
}
const LessonList = (props: ILessonList): React.ReactElement => {
  const { handleEditSection } = React.useContext(
    CreateCourseContext
  ) as ICreateCourseContext;
  const handlerDragEnd = ({ active, over }: DragEndEvent) => {
    const dataList = props.data.lessons;
    if (over) {
      const overIndex = dataList.findIndex(
        (lesson: ILessonInfo) => lesson.id === over.id?.toString()
      );
      const activeIndex = dataList.findIndex(
        (lesson: ILessonInfo) => lesson.id === active.id?.toString()
      );

      // insertArrayElements<T>(arr: T[], dragIndex: number, hoverIndex: number): T[]
      const newList = insertArrayElements(dataList, activeIndex, overIndex);
      const sectionNew = { ...props.data, lessons: newList };
      handleEditSection(props.data.id, sectionNew);
      // setDataSection(newSectionList);
    }
    //
  };

  return (
    <div className="flex flex-col items-center justify-start py-2 w-full overflow-hidden">
      {props.data.lessons.length === 0 && (
        <div className="flex w-full py-4 items-center justify-center">
          <p className="text-sm font-medium text-black "></p>
          Chưa có bài giảng được tạo
        </div>
      )}
      <DndContext onDragEnd={handlerDragEnd}>
        <SortableContext items={props.data.lessons}>
          {props.data.lessons.map((item) => (
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
  const { handleDeleteLesson, selectLesson, handlerSelectLesson } =
    React.useContext(CreateCourseContext) as ICreateCourseContext;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.data.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const active = selectLesson?.id === props.data.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full flex justify-between items-center p-2 gap-2 hover:bg-gray-100 ${
        active ? "border border-blue-400" : "border border-transparent"
      } rounded-md`}
      onClick={() => handlerSelectLesson(props.data)}
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
        <div
          className="bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer"
          onClick={() =>
            handleDeleteLesson(props.data.idSection, props.data.id)
          }
        >
          <Trash size={15} />
        </div>
      </div>
    </div>
  );
};
