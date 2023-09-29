import React, { useState } from 'react';
import copyInput from '../CopyInput';
import icon from '../../../assets/icons/img.svg'

// Regular JavaScript function to create a text input field
function createImageElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar) {
    let imageField = document.createElement("div");
    imageField.className = "imageInput";
    imageField.id = "inputImg";
    imageField.style.width = "100%";
    imageField.style.height = "100%";
    imageField.style.backgroundColor = "#e3eeff";
    imageField.style.borderRadius = "0px";
    imageField.style.outline = "none";
    // imageField.style.border = "none";
    imageField.style.overflow = "overlay";
    // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
    imageField.style.position = "relative";

    const span2 = document.createElement('span');
    span2.className = 'img_text';
    span2.textContent = "Choose Image";
    span2.style.color = '#737272';

    const span1 = document.createElement('span');
    span1.className = 'icon_wrapper';
    span1.innerHTML = `<img src='${icon}'/>`;

    imageField.append(span1)
    imageField.append(span2);

    const img = document.getElementsByClassName("imageInput");
    if (img.length) {
        const h = img.length;
        imageField.id = `i${h + 1}`;
    } else {
        imageField.id = "i1";
    }

    imageField.addEventListener("onclick", () => {
        // console.log("imgData clicked");
    });

    imageField.onclick = (e) => {
        e.stopPropagation();
        focuseddClassMaintain(e);

        if (e.ctrlKey) {
            copyInput("image2");
        }
        // imageField.classList.add("focussed");
        handleClicked("image2", "container2");
        // copyImage()
        setSidebar(true);
    };

    const imageButton = document.createElement("div");
    imageButton.className = "addImageButton";
    imageButton.innerText = "Choose File";
    imageButton.style.display = "none";
    // imageButton.onclick = (e) => chooseFileClick(e);

    const imgBtn = document.createElement("input");
    imgBtn.className = "addImageButtonInput";
    imgBtn.type = "file";
    imgBtn.style.objectFit = "cover";
    var uploadedImage = "";

    imgBtn.addEventListener("input", () => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            uploadedImage = reader.result;
            document.querySelector(
                ".focussed"
            ).style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(imgBtn.files[0]);
    });

    // imgBtn.style.width = "100%";
    imageButton.append(imgBtn);
    holderDIV.append(imageField);
    holderDIV.append(imageButton);
}
export default createImageElement;
