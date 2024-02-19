import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createIframeInputField(id, element, p, holderDIV, table_dropdown_focuseddClassMaintain, handleClicked, setSidebar) {
    let isAnyRequiredElementEdited = false;
    
    let iframeField = document.createElement("div");
    iframeField.className = "iframeInput";
    iframeField.id = id;
    iframeField.style.width = "100%";
    iframeField.style.height = "100%";
    iframeField.style.backgroundColor = "#dedede";
    iframeField.style.borderRadius = "0px";
    iframeField.style.outline = "0px";
    iframeField.style.overflow = "overlay";

    iframeField.style.position = "absolute";


    holderDIV.style.position = "relative";
    const overlayText = document.createElement('span');
      overlayText.className = 'overlay-text';
      overlayText.textContent = 'Iframe';
      overlayText.style.position = "absolute";
      overlayText.style.right = "0px";
      overlayText.style.bottom = "-40px";
      overlayText.style.backgroundColor = "#e3eeff";
      overlayText.style.color = "gray";
      overlayText.style.padding = "0px 10px";
      overlayText.style.display = "none";

    if (element.data == "iFrame here") {
        iframeField.innerHTML = element.data;
    }
    if (element.data != "iFrame here") {
        const iframe = document.createElement("iframe");
        iframe.src = element.data;
        iframe.width = "100%";
        iframe.height = "100%";

        iframeField.append(iframe);
    }

    iframeField.onclick = (e) => {
        table_dropdown_focuseddClassMaintain(e);
        overlayText.style.display = "block";

        if (e.ctrlKey) {
            copyInput("iframe2");
        }
        handleClicked("iframe2");
        setSidebar(true);
    };

    iframeField.onmouseover = () => {
        overlayText.style.display = "block";
      }
    
      iframeField.onmouseleave = (e) => {
        overlayText.style.display = "none";
      }

    holderDIV.append(iframeField);
    holderDIV.append(overlayText);

    document
        .getElementsByClassName("midSection_container")
    [p - 1] // ?.item(0)
        ?.append(holderDIV);
}
export default createIframeInputField;