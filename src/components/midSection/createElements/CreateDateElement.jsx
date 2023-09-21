import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createDateInputElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar, setRightSideDateMenu, setPostData, setStartDate, setMethod) {
  let dateField = document.createElement("div");
  dateField.className = "dateInput";
  dateField.style.width = "100%";
  dateField.style.height = "100%";
  dateField.style.backgroundColor = "#0000";
  dateField.style.borderRadius = "0px";
  dateField.style.outline = "0px";
  dateField.style.overflow = "overlay";

  dateField.style.position = "relative";

  dateField.onchange = (event) => {
    event.preventDefault();
    setPostData({
      ...postData,
      calenderField: {
        value: event.target.value,
        xcoordinate: getOffset(holderDIV).left,
        ycoordinate: getOffset(holderDIV).top,
      },
    });
  };
  setStartDate(new Date());
  setMethod("select");

  function dateClick() {
    document.getElementById("date_picker").click();
    setRightSideDateMenu(false);
  }
  dateField.onclick = (e) => {
    e.stopPropagation();
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput("calendar2");
    }
    handleClicked("calendar2", "container2");
    setRightSideDateMenu(false);
    const date = e.target.innerText
    if (date != "mm/dd/yyyy") {
      if (date.includes("/")) {
        const setDate = new Date(parseInt(date));
        //console.log("First from Midsection", setDate);
        setMethod("first");
        setStartDate(setDate);
      } else {
        if (date.includes("-")) {
          setMethod("fourth");
        } else {
          setMethod("second");
        }
        const setDate = new Date(e.target.innerText);
        //console.log("Second from Midsection", setDate);

        setStartDate(setDate);
      }
    }
    setSidebar(true);
    setTimeout(dateClick, 0);
  };

  dateField.innerText = "mm/dd/yyyy";

  holderDIV.append(dateField);
}
export default createDateInputElement;