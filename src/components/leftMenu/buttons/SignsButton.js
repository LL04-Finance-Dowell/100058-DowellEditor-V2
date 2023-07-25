import React from "react";
import { FaSignature } from "react-icons/fa";
import { useDraggableContext } from "../../../contexts/DraggableContext"; 

const SignsButton = ({ customFunc }) => {
  const { setDraggedItemType } = useDraggableContext(); 

  const dragStartSigns = (e) => {
    e.dataTransfer.setData("text/plain", "SIGN_INPUT");
    setDraggedItemType("SIGN_INPUT");
    if (document.querySelector(".drop_zone")) {
      document.querySelector(".drop_zone").classList.remove("drop_zone");
    }
  };

  return (
    <button
      type="button"
      title="Signature"
      draggable="true"
      onDragStart={dragStartSigns}
      onClick={customFunc}
    >
      <FaSignature />
    </button>
  );
};

export default SignsButton;
