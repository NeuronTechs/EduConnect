import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVertical, Pencil, Plus, Trash } from "@phosphor-icons/react";
import React from "react";

const ContentQuestionKeyword = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-2">
      <div className="flex items-center justify-between w-full ">
        <p className="text-xs font-bold text-gray-500">Câu Trả Lời</p>
        <div></div>
      </div>
      <DndContext>
        <SortableContext items={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
          <div className="space-y-2 w-full">
            <ItemAnswer id={1} data={[]} />
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

export default ContentQuestionKeyword;

const ItemAnswer = (props: { id: number; data: [] }) => {
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
      </div>
    </div>
  );
};
