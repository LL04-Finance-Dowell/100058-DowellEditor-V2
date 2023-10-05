import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createImageElement(holderDIV, focuseddClassMaintain, handleClicked, setSidebar,copy_data=false) {
    let imageField = document.createElement("div");
    imageField.className = "imageInput";
    imageField.id = "inputImg";
    imageField.style.width = "100%";
    imageField.style.height = "100%";
    imageField.style.backgroundColor = "#0000";
    imageField.style.borderRadius = "0px";
    imageField.style.outline = "none";
    // imageField.style.border = "none";
    imageField.style.overflow = "overlay";
    // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
    imageField.style.position = "relative";
    if(copy_data && copy_data != "Choose Image"){
        imageField.style.backgroundImage =copy_data;
    }else{
        imageField.innerText = "Choose Image";
    }
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
    return holderDIV;
}
export default createImageElement;
