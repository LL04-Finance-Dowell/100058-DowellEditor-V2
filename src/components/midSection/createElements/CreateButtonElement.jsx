import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createButtonInputElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar) {
    let buttonField = document.createElement("button");
    buttonField.className = "buttonInput";
    buttonField.style.width = "100%";
    buttonField.style.height = "100%";
    buttonField.style.backgroundColor = "#0000";
    buttonField.style.borderRadius = "0px";
    buttonField.style.outline = "0px";
    buttonField.style.overflow = "overlay";
    buttonField.style.position = "absolute";
    buttonField.textContent = "Button";

    buttonField.onclick = (e) => {
        e.stopPropagation();
        focuseddClassMaintain(e);
        if (e.ctrlKey) {
            copyInput("button2");
        }
        handleClicked("button2", "container2");
        setSidebar(true);
    };

    const linkHolder = document.createElement("div");
    linkHolder.className = "link_holder";
    linkHolder.style.display = "none";

    const purposeHolder = document.createElement("div");
    purposeHolder.className = "purpose_holder";
    purposeHolder.style.display = "none";

    holderDIV.append(buttonField);
    holderDIV.append(linkHolder);
    holderDIV.append(purposeHolder);
}
export default createButtonInputElement;