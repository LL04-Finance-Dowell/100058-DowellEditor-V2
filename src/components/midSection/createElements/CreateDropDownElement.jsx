import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createDropDownInputElement(holderDIV, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, setRightSideDropDown, setPostData, getOffset) {
    let dropdownField = document.createElement("div");
        dropdownField.className = "dropdownInput";
        dropdownField.style.width = "100%";
        dropdownField.style.height = "100%";
        dropdownField.style.backgroundColor = "#0000";
        dropdownField.style.borderRadius = "0px";
        dropdownField.style.outline = "0px";
        dropdownField.style.overflow = "overlay";

        dropdownField.style.position = "absolute";

        const dropD = document.getElementsByClassName("dropdownInput");
        if (dropD .length) {
        const d = dropD .length;
        dropdownField.id = `dd${d + 1}`;
        } else {
          dropdownField.id = "dd1";
        }

        const selectElement = document.createElement("select");
        selectElement.className = "select-element";
        selectElement.style.width = "500";
        selectElement.style.height = "auto";
        selectElement.onclick = () => {
          selectElement.parentElement.click();
        };

        dropdownField.onchange = (event) => {
          event.preventDefault();
          setPostData({
            ...postData,
            dropdownField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          });
        };

        if (dropdownField) {
          const dropdownField = {
            dropdownField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        }

        dropdownField.onclick = (e) => {
          e.stopPropagation();
          // focuseddClassMaintain(e);
          table_dropdown_focuseddClassMaintain(e);
          // dropdownField.classList.add("focussed");
          if (e.ctrlKey) {
            copyInput("dropdown2");
          }
          handleClicked("dropdown2", "container2");
          setRightSideDropDown(false);
          setSidebar(true);
        };

        const para = document.createElement("p");
        para.innerHTML = " Dropdown Name";
        para.className = "dropdownName";
        para.onclick = () => {
          para.parentElement.click();
        };
        dropdownField.append(para);
        dropdownField.append(selectElement);
        holderDIV.append(dropdownField);
        return holderDIV;
}
export default createDropDownInputElement;