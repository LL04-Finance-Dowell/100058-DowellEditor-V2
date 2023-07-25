import React from "react";
import { BiImage } from "react-icons/bi";
import { useDraggableContext } from "../../../contexts/DraggableContext";

const ImageButton = ({ customFunc }) => {
  const { setDraggedItemType } = useDraggableContext();

  const dragStartImage = (e) => {
    e.dataTransfer.setData("text/plain", "IMAGE_INPUT");
    setDraggedItemType("IMAGE_INPUT");
  };

  const dragEndFunc = () => {
    setDraggedItemType(null);
  };

  return (
    <button
      type="button"
      title="Image"
      draggable="true"
      onDragStart={dragStartImage}
      onDragEnd={dragEndFunc}
      onClick={customFunc}
    >
      <BiImage />
    </button>
  );
};

export default ImageButton;
