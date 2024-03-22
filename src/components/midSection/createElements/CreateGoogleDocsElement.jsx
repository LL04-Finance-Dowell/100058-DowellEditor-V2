import React from 'react';
import copyInput from '../CopyInput';
import { renderPreview } from '../MidSection';



function CreateGoogleDocsElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar, getOffset, copy_data = false) {
    let googleDocs = document.createElement("div");
    //  googleDocs.setAttribute('draggable', true);
    googleDocs.setAttribute("contenteditable", false);
    googleDocs.className = "googleDocsButton";
    googleDocs.placeholder = "Enter text here";
    googleDocs.style.width = "100%";
    googleDocs.style.height = "100%";
    googleDocs.style.resize = "none";
    googleDocs.style.backgroundColor = "#0000";
    googleDocs.style.borderRadius = "0px";
    googleDocs.style.outline = "0px";
    googleDocs.style.overflow = "overlay";
    googleDocs.style.position = "relative";
    googleDocs.style.cursor = "pointer";

    googleDocs.textContent = 'Enter the Link for your googleDocs';
    googleDocs.classList.add('empty')
    holderDIV.style.border = '';
    googleDocs.addEventListener('input', function (e) {
        const previewCanvas = document.querySelector('.preview-canvas');
        if (previewCanvas) {
            const mainSection = document.querySelector('.editSec_midSec');
            if (mainSection) renderPreview(mainSection);
        };
    });



    googleDocs.onclick = (e) => {
        e.stopPropagation();
        focuseddClassMaintain(e);
        if (e.ctrlKey) {
            copyInput("googleDocs2");
        }
        handleClicked("googleDocs2", "container2");
        setSidebar(true);
    };

    holderDIV.append(googleDocs);
    return holderDIV;
}


export default CreateGoogleDocsElement;