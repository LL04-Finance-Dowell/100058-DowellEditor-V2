import React, { useState } from "react";

const TextInputElement = ({ element, documnetMap, pageNo }) => {
  const [isAnyRequiredElementEdited, setIsAnyRequiredElementEdited] = useState(
    false
  );

  const handleInput = (e) => {
    const required_map_document = document_map_required?.filter(
      (item) => element.id == item.content
    );

    if (
      inputFieldRef.current?.parentElement.classList.contains("holderDIV") &&
      required_map_document?.length > 0
    ) {
      inputFieldRef.current?.parentElement.classList.toggle(
        "element_updated",
        true
      );
    }
    if (element.required) {
      setIsAnyRequiredElementEdited(true);
    }
  };

  const handleInputClick = (e) => {
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput("align2");
    }
    handleClicked("align2");
    setSidebar(true);
  };

  const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
  const id = `${element.id}`;

  const inputFieldRef = React.createRef();

  return (
    <div
      ref={inputFieldRef}
      contentEditable
      className="textInput"
      id={id}
      style={{
        width: "100%",
        height: "100%",
        resize: "none",
        zIndex: 2,
        backgroundColor: "#0000",
        borderRadius: "0px",
        outline: "0px",
        overflow: "overlay",
        position: "relative",
        cursor: "text",
      }}
      onInput={handleInput}
      onClick={handleInputClick}
    >
      {element.raw_data}
    </div>
  );
};

export default TextInputElement;
