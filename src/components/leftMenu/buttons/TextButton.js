// components/buttons/TextButton.js
import React from "react";
import { BiText } from "react-icons/bi";
import { useDraggableContext } from "../../../contexts/DraggableContext";

const TextButton = ({ customFunc }) => {
  const { setDraggedItemType } = useDraggableContext();

  const dragStartFunc = (e) => {
    e.dataTransfer.setData("text/plain", "TEXT_INPUT");
    setDraggedItemType("TEXT_INPUT");
  };

  return (
    <div className="btn_wrapper">
      <button
        type="button"
        title="Text"
        draggable="true"
        onDragStart={dragStartFunc}
        id="draggable"
        onDragEnd={customFunc}
      >
        <BiText />
      </button>

      <p className="btn_tag">Text</p>
    </div>
  );
};

export default TextButton;
