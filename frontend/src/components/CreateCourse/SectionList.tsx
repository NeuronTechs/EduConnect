import {
  Binoculars,
  CaretCircleDown,
  DotsSixVertical,
  Pencil,
  PlusCircle,
  Trash,
} from "@phosphor-icons/react";
import React from "react";
import LessonList from "./LessonList";
//
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { insertArrayElements } from "@/utils/utils";
import { Collapse } from "@material-tailwind/react";
import { ISectionInfo } from "@/types/type";
import {
  CreateCourseContext,
  ICreateCourseContext,
} from "@/context/CreateCourseContext";

// fake data generator
const SectionList = (props: {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIdSectionCreate: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
  const { dataSection, setDataSection, handleAddNewSection } =
    React.useContext(CreateCourseContext);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && dataSection.length > 0) {
      const overIndex = dataSection.findIndex(
        (section: ISectionInfo) => section.id === over.id?.toString()
      );
      const activeIndex = dataSection.findIndex(
        (section: ISectionInfo) => section.id === active.id?.toString()
      );
      console.log(activeIndex, overIndex);
      const newList = insertArrayElements(dataSection, activeIndex, overIndex);
      setDataSection(newList);
    }
  };

  return (
    <div className="h-full px-1 py-2 flex flex-col items-stretch">
      <div className="flex-1 w-full overflow-auto space-y-2">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={dataSection}>
            {dataSection.map((item) => {
              return (
                <ItemSection
                  key={item.id}
                  setIsOpenModal={props.setIsOpenModal}
                  setIdSectionCreate={props.setIdSectionCreate}
                  // data section
                  data={item}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={handleAddNewSection}
          className="px-2 py-1 flex items-center justify-center gap text-sm font-bold text-white bg-blue-400 hover:bg-blue-500 rounded-md"
        >
          <PlusCircle size={32} /> Thêm phần khoá học
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
  const [isEditing, setIsEditing] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const { handleDeleteSection } = React.useContext(
    CreateCourseContext
  ) as ICreateCourseContext;

  const toggleOpen = () => setOpen((cur) => !cur);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.data.id });

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
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleNewLessonClick = () => {
    props.setIdSectionCreate(props.data.id);
    props.setIsOpenModal(true);
  };

  return (
    <div
      className="w-full bg-white  rounded-sm"
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      {/* header */}
      <div
        className="w-full flex justify-between items-center p-2 gap-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex gap-2 overflow-hidden items-center">
          <div className="flex items-center justify-center" {...listeners}>
            <DotsSixVertical size={20} className="cursor-pointer" />
          </div>
          <div
            className={`w-full text-sm font-bold overflow-hidden ${
              isEditing
                ? "[&[contenteditable]]:focus:outline-none [&[contenteditable]]:focus:border [&[contenteditable]]:focus:border-blue-500"
                : ""
            }}`}
            onClick={handleTitleClick}
            onBlur={handleTitleBlur}
            contentEditable={isEditing}
          >
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {props.data.title}
            </p>
          </div>
          {isHovered && !isEditing && (
            <div onClick={handleTitleClick}>
              <Pencil size={15} className="cursor-pointer" />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isHovered && (
            <div
              className="bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer"
              onClick={() => handleDeleteSection(props.data.id)}
            >
              <Trash size={15} />
            </div>
          )}

          <div
            className={`bg-blue-gray-50 p-1 rounded-full text-gray-700 cursor-pointer ${
              open ? "rotate-180" : "rotate-0"
            } ani transition ease-in-out delay-150`}
            onClick={toggleOpen}
          >
            <CaretCircleDown size={15} />
          </div>
        </div>
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* children list */}
      <Collapse open={open}>
        <div className="flex flex-col w-full">
          <LessonList data={props.data} />
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex p-1 justify-between">
            <button
              onClick={handleNewLessonClick}
              className="text-blue-500 bg-blue-100 text-xs font-bold px-4 py-1.5 flex items-center justify-center space-x-2 cursor-pointer hover:bg-blue-200 rounded-md"
            >
              <PlusCircle size={20} />
              <p>thêm bài giảng</p>
            </button>
            <button className="text-gray-500 bg-gray-100 text-xs font-bold px-4 py-1.5 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-md">
              <Binoculars size={20} />
              <p>Tìm tài liệu</p>
            </button>
          </div>
        </div>
      </Collapse>
      {/* content */}
    </div>
  );
};
