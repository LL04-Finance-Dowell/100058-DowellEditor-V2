import React from "react";
import "./RightContextMenu.css";
import { BiCut,BiCopy } from "react-icons/bi";
import { ImPaste } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";

const RightContextMenu = ({
  x,
  y,
  closeContextMenu,
  cutInput,
  pasteInput,
  handleCopy,
  removeInput,
}) => {
  return (
    <div
      onClick={() => closeContextMenu()}
      className="positioning"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <ul className="menuStyle">
        <li onClick={cutInput}>
          <BiCut /> Cut
        </li>
        <li onClick={handleCopy}>
          <BiCopy /> Copy
        </li >
        <li onClick={pasteInput}>
          <ImPaste />
          Paste
        </li>
        <li onClick={removeInput}>
          <CgPlayListRemove />
          Remove
        </li>
      </ul>
    </div>
  );
};

export default RightContextMenu;
