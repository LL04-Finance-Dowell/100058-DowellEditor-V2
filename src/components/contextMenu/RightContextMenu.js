import React from "react";
import "./RightContextMenu.css";
import { BiCut } from "react-icons/bi";
import { ImPaste } from "react-icons/im";
import { CgPlayListRemove } from "react-icons/cg";
import { useStateContext } from '../../contexts/contextProvider';

const RightContextMenu = ({
  x,
  y,
  closeContextMenu,
  cutInput,
  pasteInput,
  handleCopy,
  removeInput,
}) => {
  const { confirmRemove, setConfirmRemove } = useStateContext()
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
        <li onClick={pasteInput}>
          <ImPaste />
          Paste
        </li>
        {/* <li onClick={removeInput}>
          <CgPlayListRemove />
          Remove
        </li> */}
        <li onClick={() => setConfirmRemove(!confirmRemove)}><CgPlayListRemove />Remove</li>
      </ul>
    </div>
  );
};

export default RightContextMenu;
