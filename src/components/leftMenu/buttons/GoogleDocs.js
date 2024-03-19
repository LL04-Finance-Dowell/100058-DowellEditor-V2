// components/buttons/TextButton.js
import React from "react";
import { GrDocumentText } from "react-icons/gr";
// import { BiSolidDownArrow } from "react-icons/bi";

import { useDraggableContext } from "../../../contexts/DraggableContext";

const GoogleDocsButton = ({ customFunc }) => {
    const { setDraggedItemType } = useDraggableContext();

    const dragStartFunc = (e) => {
        const element = document.getElementById("draggable");
        e.dataTransfer.setData("text/plain", "GOOGLE_DOCS_INPUT");
        setDraggedItemType("GOOGLE_DOCS_INPUT");
        element.classList.add("dragging");
        if (document.querySelector(".drop_zone")) {
            document.querySelector(".drop_zone").classList.remove("drop_zone");
        }
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
                <GrDocumentText />
            </button>

            <p className="btn_tag">Google Docs</p>
        </div>
    );
};

export default GoogleDocsButton;
