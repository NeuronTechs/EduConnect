import { DotsSixVertical, PlusCircle, Trash } from "@phosphor-icons/react";
import React from "react";
import LessonList from "./LessonList";
//
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { insertArrayElements } from "@/utils/utils";
import { ISectionInfo } from "@/types/type";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";
import InputEditTitle from "./CreateLesson/Quiz/InputEditTitle";
import * as teacherApi from "@/api/teacherApi/teacherApi";

// fake data generator
const SectionList = (props: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSectionCreate: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
  const { dataSection, setDataSection, handleAddNewSection, dataDescription } =
    React.useContext<ICreateCourseContext>(CreateCourseContext);

  // event drag sort item section in list of course
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && dataSection.length > 0) {
      const overIndex = dataSection.findIndex(
        (section: ISectionInfo) => section.session_id === over.id?.toString()
      );
      const activeIndex = dataSection.findIndex(
        (section: ISectionInfo) => section.session_id === active.id?.toString()
      );
      const newList = insertArrayElements(dataSection, activeIndex, overIndex);
      setDataSection(newList);
      updateSectionCourse(newList);
    }
  };
  // update section course
  const updateSectionCourse = async (data: ISectionInfo[]) => {
    try {
      await teacherApi.updateSectionCourse(
        dataDescription?.teacher_id ? dataDescription.teacher_id : "",
        dataDescription?.course_id ? dataDescription.course_id : "",
        data.map((item) => item.session_id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" min-h-full px-1 flex flex-col items-stretch space-y-4">
      <div className="flex-1 w-full overflow-auto space-y-3">
        <div className="w-full flex items-center justify-between p-2 gap-2 min-h-[40px] bg-white">
          <p className="text-sm font-bold">Phần khoá học</p>
        </div>
        {dataSection?.length === 0 ? (
          <div className="w-full flex items-center justify-center p-2 gap-2 min-h-[40px] bg-white">
            <p className="text-sm font-bold">Chưa có phần khoá học</p>
          </div>
        ) : (
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={dataSection.map((item) => item.session_id)}>
              {dataSection.map((item) => {
                return (
                  <ItemSection
                    key={item.session_id}
                    setIsOpenModal={props.setIsOpenModal}
                    setIdSectionCreate={props.setIdSectionCreate}
                    // data section
                    data={item}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>
      <div className="w-full flex items-center justify-center p-4 shadow-md bg-white">
        <button
          onClick={handleAddNewSection}
          className="px-2 py-1 flex items-center justify-center gap text-sm font-bold text-white bg-blue-400 hover:bg-blue-500 rounded-md"
        >
          <PlusCircle size={30} /> Thêm Chương Khoá Học
        </button>
      </div>
    </div>
  );
};

export default SectionList;

const ItemSection = (props: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSectionCreate: React.Dispatch<React.SetStateAction<string>>;
  data: ISectionInfo;
}): React.ReactElement => {
  const [isHovered, setIsHovered] = React.useState(false);

  const { handleDeleteSection, handleEditTitleSection } = React.useContext(
    CreateCourseContext
  ) as ICreateCourseContext;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.data.session_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // event
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNewLessonClick = () => {
    console.log(props.data.session_id);
    props.setIdSectionCreate(props.data.session_id);
    props.setIsOpenModal(true);
  };

  return (
    <div
      className="w-full bg-white  rounded-md shadow-sm"
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      {/* header */}
      <div
        className="w-full flex justify-between items-center p-2 gap-2 min-h-[40px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex gap-2 overflow-hidden items-center">
          <div className="flex items-center justify-center" {...listeners}>
            <DotsSixVertical size={20} className="cursor-pointer" />
          </div>
          <InputEditTitle
            onSubmit={(data) =>
              handleEditTitleSection(props.data.session_id, data)
            }
            value={props.data.name}
          />
          {/* {isHovered && !isEditing && (
            <div onClick={handleTitleClick}>
              <Pencil size={15} className="cursor-pointer" />
            </div>
          )} */}
        </div>
        <div className="flex gap-2">
          {isHovered && (
            <div
              className="bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer"
              onClick={() => handleDeleteSection(props.data.session_id)}
            >
              <Trash size={15} />
            </div>
          )}
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* children list */}
      <div className="flex flex-col w-full">
        <LessonList data={props.data} />
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="flex p-2 justify-between">
          <button
            onClick={handleNewLessonClick}
            className="text-blue-500 bg-blue-100 text-xs font-bold px-4 py-1.5 flex items-center justify-center space-x-2 cursor-pointer hover:bg-blue-200 rounded-md"
          >
            <PlusCircle size={20} />
            <p>thêm bài giảng</p>
          </button>
          <div></div>
          {/* <button className="text-gray-500 bg-gray-100 text-xs font-bold px-4 py-1.5 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-md">
            <Binoculars size={20} />
            <p>Tìm tài liệu</p>
          </button> */}
        </div>
      </div>
      {/* content */}
    </div>
  );
};
