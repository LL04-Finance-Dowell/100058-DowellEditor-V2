import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createSignInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, document_map_required) {

    let isAnyRequiredElementEdited = false;

    let signField = document.createElement("div");
    signField.className = "signInput";
    signField.id = id;
    signField.style.width = "100%";
    signField.style.height = "100%";
    signField.style.backgroundColor = "#0000";
    signField.style.borderRadius = "0px";
    signField.style.outline = "0px";
    signField.style.overflow = "overlay";

    signField.style.position = "absolute";

    holderDIV.style.position = "relative";
    const overlayText = document.createElement('span');
      overlayText.className = 'overlay-text';
      overlayText.textContent = 'Signature';
      overlayText.style.position = "absolute";
      overlayText.style.right = "0px";
      overlayText.style.bottom = "-40px";
      overlayText.style.backgroundColor = "#e3eeff";
      overlayText.style.color = "gray";
      overlayText.style.padding = "0px 10px";
      overlayText.style.display = "none";

    signField.onclick = (e) => {
        focuseddClassMaintain(e);
        overlayText.style.display = "block";
        if (e.ctrlKey) {
            copyInput("signs2");
        }

        handleClicked("signs2");
        setSidebar(true);
    };

    signField.onmouseover = () => {
        overlayText.style.display = "block";
      }
    
      signField.onmouseleave = (e) => {
        overlayText.style.display = "none";
      }

    element.data?.startsWith("url(" && "data")
        ? (signField.innerHTML = `<img src=${element.data} />`)
        : (signField.innerHTML = `${element.data}`);

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
                reader.addEventListener("load", () => {
                    uploadedImage = reader.result;
                    if (!reader.result) {
                        setSidebar(false);
                        return;
                    }
                    const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                    document.querySelector(".focussed").innerHTML = signImage;

                    const required_map_document = document_map_required?.filter(
                        (item) => element.id === item.content
                      );
                    
                      if (signField?.parentElement?.classList.contains("holderDIV") && required_map_document?.length > 0) {
                        signField?.parentElement?.classList.add("element_updated");
                      }
                    
                      if (element.required) {
                        isAnyRequiredElementEdited = true;
                      }
                });
                reader.readAsDataURL(signBtn.files[0]);
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
    holderDIV.append(overlayText);

    document
        .getElementsByClassName("midSection_container")
    [p - 1] // ?.item(0)
        ?.append(holderDIV);
}
export default createSignInputField;