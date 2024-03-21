import React from 'react';
import copyInput from '../CopyInput';


function CreateGoogleDocsElement(holderDIV, focuseddClassMaintain, handleClicked) {
    let googleDocs = document.createElement("button");
    googleDocs.className = "googleDocsButton";
    googleDocs.style.width = "100%";
    googleDocs.style.height = "100%";
    googleDocs.style.backgroundColor = "#0000";
    googleDocs.style.borderRadius = "0px";
    // paymentField.style.outline = "0px";
    googleDocs.style.overflow = "overlay";
    googleDocs.style.position = "absolute";
    googleDocs.style.outline = "none";
    // paymentField.style.boxShadow="none"; 
    googleDocs.style.border = "none"
    googleDocs.textContent = "Create a google docs";

    // const googleDocsInput = document.getElementsByClassName("googleDocsInput");
    // if (googleDocsInput.length) {
    //     const p = googleDocsInput.length;
    //     googleDocs.id = `pay${p + 1}`;
    // } else {
    //     googleDocs.id = "pay1";
    // }

    googleDocs.onclick = (e) => {
        e.stopPropagation();
        focuseddClassMaintain(e);
        if (e.ctrlKey) {
            copyInput("payment2");
        }
        handleClicked("payment2", "container2");
    };

    const linkHolder = document.createElement("div");
    linkHolder.className = "stripe_key";
    linkHolder.style.display = "none";

    const purposeHolder = document.createElement("div");
    purposeHolder.className = "paypal_id";
    purposeHolder.style.display = "none";

    holderDIV.append(googleDocs);
    holderDIV.append(linkHolder);
    holderDIV.append(purposeHolder);

    // * This loop is to trigger rightside bar to update to the recently selected btn type
    let x = true;
    while (x) {
        googleDocs.click();
        x = false;
    }
};

export default CreateGoogleDocsElement;