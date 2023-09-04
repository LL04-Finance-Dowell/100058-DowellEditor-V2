import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createFormInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar) {
  let isAnyRequiredElementEdited = false;
  
  let buttonField = document.createElement("button");
    buttonField.className = "emailButton";
    buttonField.id = id;
    buttonField.style.width = "100%";
    buttonField.style.height = "100%";
    buttonField.style.backgroundColor = "#0000";
    buttonField.style.borderRadius = "0px";
    buttonField.style.outline = "0px";
    buttonField.style.overflow = "overlay";
    buttonField.style.position = "absolute";
    buttonField.style.borderWidth = element.data;
    buttonField.textContent = element.data;

    buttonField.onclick = (e) => {
      focuseddClassMaintain(e);
      if (e.ctrlKey) {
        copyInput("email2");
      }
      handleClicked("email2");
      setSidebar(true);
    };

    holderDIV.append(buttonField);
    document
      .getElementsByClassName("midSection_container")
      [p - 1] // ?.item(0)
      ?.append(holderDIV);
}
export default createFormInputField;