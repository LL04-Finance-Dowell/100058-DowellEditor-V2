import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useDraggableContext } from "../../../contexts/DraggableContext";

const EmailButton = ({ customFunc }) => {
  const { setDraggedItemType } = useDraggableContext();

  const dragStartEmail = (e) => {
    e.dataTransfer.setData("text/plain", "FORM");
    setDraggedItemType("FORM");
    if (document.querySelector(".drop_zone")) {
      document.querySelector(".drop_zone").classList.remove("drop_zone");
    }
  };

  return (
    <button
      type="button"
      title="Email"
      draggable="true"
      onDragStart={dragStartEmail}
      onClick={customFunc}
    >
      <AiOutlineMail />
    </button>
  );
};

export default EmailButton;
