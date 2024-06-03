import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createDropDownInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded, setRightSideDropDown, setDropdownName) {
    let isAnyRequiredElementEdited = false;

    let dropdownField = document.createElement("div");
    dropdownField.className = "dropdownInput";
    dropdownField.id = id;
    dropdownField.style.width = "100%";
    dropdownField.style.height = "100%";
    dropdownField.style.backgroundColor = "#0000";
    dropdownField.style.borderRadius = "0px";
    dropdownField.style.outline = "0px";
    dropdownField.style.overflow = "overlay";
    dropdownField.style.color = element.color;
    // dropdownField.innerHTML = `<select><option>${postData.dropdownField.value}</option></select>`;
    dropdownField.style.position = "absolute";

    const selectElement = document.createElement("select");
    selectElement.className = "select-element";
    selectElement.style.backgroundColor = "#0000";
    selectElement.innerHTML = element.data2;
    selectElement.style.color = element.color;
    selectElement.style.width = "100%"

    const savedSelectedValue = element.data; // This is the value of the saved selected option

    // Find and set the saved selected option
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].text === savedSelectedValue) {
            options[i].selected = true;
            break;
        }
    }

    dropdownField.onclick = (e) => {
        // focuseddClassMaintain(e);
        table_dropdown_focuseddClassMaintain(e);
        if (e.ctrlKey) {
            copyInput("dropdown2");
        }
        handleClicked("dropdown2");
        setRightSideDropDown(false);
        setSidebar(true);
        para.style.display = "block"
    };

    dropdownField.onmouseleave = () => {
        para.style.display = "none"
    }

    // selectElement.innerHTML = element.data2;

    const para = document.createElement("p");
    para.innerHTML = " Dropdown Name";
    para.className = "dropdownName";
    para.innerText = element.data1;
    para.style.display = "none"

    dropdownField.append(para);
    dropdownField.append(selectElement);
    setDropdownName(element.data1);

    // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

    holderDIV.append(dropdownField);

    // holderDIV.append(paragraphField);

    document
        .getElementsByClassName("midSection_container")
    [p - 1] // ?.item(0)
        ?.append(holderDIV);
}
export default createDropDownInputField;