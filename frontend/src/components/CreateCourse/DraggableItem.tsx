import React from "react";

interface IProps {
  id: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}

const DraggableItem = (props: IProps): React.ReactElement => {
  return (
    <div
      id={props.id}
      draggable
      onDragStart={props.onDragStart}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      {props.children}
    </div>
  );
};

export default DraggableItem;
