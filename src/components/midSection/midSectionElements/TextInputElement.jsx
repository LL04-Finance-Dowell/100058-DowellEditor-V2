import React, { useState } from 'react';

const TextInputElement = ({ element, documentMapRequired, pageNo }) => {
  const [isAnyRequiredElementEdited, setIsAnyRequiredElementEdited] = useState(false);

  const handleInput = (e) => {
    const required_map_document = documentMapRequired?.filter(
      (item) => element.id === item.content
    );

    if (
      e.currentTarget.parentElement.classList.contains('holderDIV') &&
      required_map_document.length > 0
    ) {
      e.currentTarget.parentElement.classList.add('element_updated');
    }
    if (element.required) {
      setIsAnyRequiredElementEdited(true);
    }
  };

  const handleClick = (e) => {
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput('align2');
    }
    handleClicked('align2');
    setSidebar(true);
  };

  return (
    <div
      contentEditable={true}
      className="textInput"
      id={element.id}
      style={{
        width: '100%',
        height: '100%',
        resize: 'none',
        zIndex: 2,
        backgroundColor: '#0000',
        borderRadius: '0px',
        outline: '0px',
        overflow: 'overlay',
        position: 'relative',
        cursor: 'text',
      }}
      onInput={handleInput}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: element.raw_data }}
    ></div>
  );
};

export default TextInputElement;
