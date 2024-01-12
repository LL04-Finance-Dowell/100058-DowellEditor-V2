import React, { useState } from 'react';
import copyInput from '../CopyInput';
import { renderPreview } from '../MidSection';

// Regular JavaScript function to create a text input field
function createTextElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar, getOffset, copy_data = false) {
  let inputField = document.createElement("div");
  //  inputField.setAttribute('draggable', true);
  inputField.setAttribute("contenteditable", true);
  inputField.className = "textInput";
  inputField.placeholder = "Enter text here";
  inputField.style.width = "100%";
  inputField.style.height = "100%";
  inputField.style.resize = "none";
  inputField.style.backgroundColor = "#0000";
  inputField.style.borderRadius = "0px";
  inputField.style.outline = "0px";
  inputField.style.overflow = "overlay";
  inputField.style.position = "relative";
  inputField.style.cursor = "text";

  inputField.textContent = 'Enter text here!';
  inputField.classList.add('empty')
  inputField.addEventListener('input', function() {
    const mainSection = document.querySelector('#main-section');
    if (mainSection) renderPreview(mainSection);
});
  // holderDIV.style.height = '130px';
  if (copy_data) {
    inputField.innerText = copy_data
  }

  inputField.onfocus = () => {
    if (inputField.textContent === 'Enter text here!') {
      inputField.textContent = '';
      inputField.classList.remove('empty')
    }
  }

  inputField.onblur = () => {
    if (!inputField.textContent.trim()) {
      inputField.textContent = 'Enter text here!';
      inputField.classList.add('empty')
    }
  }

  const txt = document.getElementsByClassName("textInput");
  if (txt.length) {
    const h = txt.length;
    inputField.id = `t${h + 1}`;
  } else {
    inputField.id = "t1";
  }

  if (inputField.innerHTML[0]) {
    const editTextField = {
      editTextField: {
        value: inputField.innerHTML,
        xcoordinate: getOffset(holderDIV).left,
        ycoordinate: getOffset(holderDIV).top,
      },
    };
  }

  if (inputField.value !== "") {
  }

  inputField.onclick = (e) => {
    e.stopPropagation();
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput("align2");
    }
    handleClicked("align2", "container2");
    setSidebar(true);
  };
  holderDIV.append(inputField);
  return holderDIV;
}
export default createTextElement;
