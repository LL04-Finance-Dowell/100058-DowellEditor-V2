import React from 'react';
import { MdPayments } from "react-icons/md";
import { useDraggableContext } from "../../../contexts/DraggableContext";

const PaymentButton = ({ customFunc }) => {
    const { setDraggedItemType } = useDraggableContext();

    const dragStartButton = (e) => {
      e.dataTransfer.setData("text/plain", "PAYMENT_INPUT");
      setDraggedItemType("PAYMENT_INPUT");
      if (document.querySelector(".drop_zone")) {
        document.querySelector(".drop_zone").classList.remove("drop_zone");
      }
    };
    return (
        <button
            type="button"
            title="payment"
            draggable="true"
            onDragStart={dragStartButton}
            onClick={customFunc}
        >
            <MdPayments />
        </button>
    );
};

export default PaymentButton;