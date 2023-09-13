import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createSignInputElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar, setPostData, getOffset) {
    let signField = document.createElement("div");
    signField.className = "signInput";
    signField.style.width = "100%";
    signField.style.height = "100%";
    signField.style.backgroundColor = "#0000";
    signField.style.borderRadius = "0px";
    signField.style.outline = "0px";
    signField.style.overflow = "overlay";

    signField.innerText = "Signature here";
    signField.style.position = "absolute";

    signField.onchange = (event) => {
        event.preventDefault();
        setPostData({
            ...postData,
            signField: {
                value: event.target.value,
                xcoordinate: getOffset(holderDIV).left,
                ycoordinate: getOffset(holderDIV).top,
            },
        });
    };

    signField.onclick = (e) => {
        e.stopPropagation();
        focuseddClassMaintain(e);

        if (e.ctrlKey) {
            copyInput("signs2");
        }
        handleClicked("signs2", "container2");
        setSidebar(true);
    };
    const imageSignButton = document.createElement("div");
    imageSignButton.className = "addImageSignButton";
    imageSignButton.innerText = "Choose File";
    imageSignButton.style.display = "none";

    const signBtn = document.createElement("input");
    signBtn.className = "addSignButtonInput";
    signBtn.type = "file";
    signBtn.style.objectFit = "cover";
    var uploadedImage = "";

    signBtn.addEventListener("input", () => {
        const reader = new FileReader();
        try {
            reader.addEventListener("load", () => {
                if(!reader.result){
                    setSidebar(false);
                    return;
                }
                uploadedImage = reader.result;
                const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                if (document.querySelector(".focussed")) {
                    document.querySelector(".focussed").innerHTML = signImage
                } else if (document.querySelector(".focussedd")) {
                    const target = document.querySelector(".focussedd");
                    if (target.classList.contains('signInput')) {
                        target.innerHTML = signImage
                    }
                };
                setSidebar(true);
            });
            reader.readAsDataURL(signBtn.files[0]);

        } catch (error) {
            console.log("FAILED TO UPLOAD:", error);
            setSidebar(true);

        }

    });

    imageSignButton.append(signBtn);

    holderDIV.append(signField);
    holderDIV.append(imageSignButton);
}
export default createSignInputElement;