import React, { useState } from 'react';
import copyInput from '../CopyInput';
import Axios from "axios";


// Regular JavaScript function to create a text input field
function createNewScaleInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded, token) {
    let scaleField = document.createElement("div");
    scaleField.className = "newScaleInput";
    scaleField.id = id;
    scaleField.style.width = "100%";
    scaleField.style.height = "100%";
    scaleField.style.backgroundColor = "#ffffff";
    scaleField.style.borderRadius = "0px";
    scaleField.style.outline = "0px";
    scaleField.style.overflow = "overlay";
    scaleField.style.position = "absolute";
    const scaleHold = document.createElement("div");
    scaleHold.className = "scool_input";
    scaleHold.style.fontFamily = element?.raw_data?.fontFamily;
    scaleHold.style.color = element?.raw_data?.fontColor;
    scaleHold.style.width = "100%";
    scaleHold.style.height = "90%";
    scaleHold.style.padding = "10px";
    const scaleText = document.createElement("div");
    scaleText.className = "scale_text";
    scaleText.textContent = element?.raw_data?.scaleText;
    scaleText.style.marginBottom = "10px";
    scaleText.style.width = "100%";
    scaleText.style.display = "flex";
    scaleText.style.alignItems = "center";
    scaleText.style.justifyContent = "center";
    scaleText.style.height = "10%";
    scaleText.style.backgroundColor = "transparent";
    scaleText.style.borderRadius = "0px";
    scaleHold.append(scaleText);

    const labelHold = document.createElement("div");
    labelHold.className = "label_hold";
    labelHold.style.width = "100%";
    labelHold.style.height = "85%";
    labelHold.style.border = "1px solid black";
    labelHold.style.backgroundColor = element?.raw_data?.scaleBgColor;
    scaleHold.appendChild(labelHold);
    labelHold.style.display = "flex";
    labelHold.style.justifyContent = "space-between";
    labelHold.style.alignItems = "center";
    // console.log(scaleId, "scale button");
    for (let i = 0; i < 11; i++) {
        const circle = document.createElement("div");
        circle.className = "circle_label";
        circle.style.width = "35%";
        circle.style.height = "35%";
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = element?.raw_data?.buttonColor;
        circle.style.top = "30%";
        circle.style.left = "30%";
        circle.style.display = "flex";
        circle.style.justifyContent = "center";
        circle.style.alignItems = "center";
        circle.style.marginLeft = "2px";

        const buttonImage = element?.raw_data?.buttonImages;
        if (buttonImage && Array.isArray(buttonImage) && buttonImage[i]) {
            let newImg = document.createElement("img");
            newImg.className = "images_label";
            newImg.src = buttonImage[i];
            console.log(buttonImage[i]);
            circle.appendChild(newImg);
        }

        if (element?.raw_data?.buttonText) {
            const buttonText = element.raw_data.buttonText;
            if (Array.isArray(buttonText) && buttonText.length > 0) {
                circle.textContent = buttonText[i % buttonText.length];
                console.log("EMOJIIIIIIIIIII");
            } else {
                console.log("Empty buttonText array");
            }
        } else {
            console.log("NUMBERRRRRRRRRRRRRR");
            circle.textContent = i;
        }
        labelHold.append(circle);

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const username = decoded?.details?.authorized;
        console.log(username);

        if (
            decoded.details.action === "document" &&
            username !== undefined
        ) {
            let circles = document.querySelectorAll(".circle_label");
            let isClicked = false;
            let selectedScore = -1;
            // const submitButtonScale = document.getElementById('finalize-button');

            circle.addEventListener("click", function () {
                if (!isClicked) {
                    let scale = document.querySelector(".focussedd");
                    const scaleNewId =
                        scale?.querySelector(".scaleId").textContent;
                    console.log(scaleNewId);
                    console.log(scaleNewId);
                    circle.style.backgroundColor = "blue";
                    Axios.post(
                        "https://100035.pythonanywhere.com/api/nps_responses_create",
                        {
                            scale_id: scaleNewId,
                            instance_id: pageNo,
                            brand_name: "XYZ545",
                            product_name: "XYZ511",
                            username: username,
                            score: i,
                        }
                    )
                        .then((response) => {
                            if (response.status === 200) {
                                setIsLoading(false);
                                var responseData = response.data;
                                setScaleData(responseData);
                                console.log(response);

                                const alert = document.createElement("div");
                                alert.className = "scale_alert";
                                const img = document.createElement("img");
                                const button = document.createElement("button");
                                img.src =
                                    "https://img.freepik.com/premium-vector/pin-with-check-mark-icon-vector-isolated-map-location-pointer-locator-position-point_578506-202.jpg?w=740";
                                img.width = 100;
                                img.height = 100;
                                button.appendChild(img);
                                const paragraph = document.createElement("h4");
                                paragraph.textContent =
                                    "Response recorded successfully for your selected button " +
                                    i;
                                button.appendChild(paragraph);
                                button.style.width = "100%";
                                alert.appendChild(button);
                                paragraph.style.color = "green";
                                alert.style.position = "absolute";
                                alert.style.marginRight = "3%";
                                button.style.background = "#fff";
                                // labelHold.style.display ="none";

                                childDiv.style.display = "none";
                                button.style.color = "blue";
                                button.style.borderRadius = "5px";
                                // button.style.padding = "10px 20px";
                                button.style.cursor = "pointer";
                                // button.addEventListener("click", function() {
                                //     alert.remove();
                                // });
                                button.classList.add("alert-button");
                                button.classList.add("close");
                                // setTimeout(() => {
                                //   alert.remove();
                                // }, 5000);
                                alert.appendChild(button);
                                scaleHold.appendChild(alert);
                                isClicked = true;
                                labelHold.style.display = "none";
                                window.onbeforeunload = (event) => {
                                    //Prevent the page from reloading
                                    event.preventDefault();
                                    event.returnValue = selectedScore;
                                };
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    if ((selectedScore = i)) {
                        const alert = document.createElement("div");
                        const img = document.createElement("img");
                        const button = document.createElement("button");
                        img.src =
                            "https://img.freepik.com/free-photo/yellow-triangle-warning-sign-symbol-danger-caution-risk-traffic-icon-background-3d-rendering_56104-1156.jpg?w=1060&t=st=1687272853~exp=1687273453~hmac=2a25ac004fa8fa44791de0ec6f23d6f27e6dcae15ed65cde391a01685579ddf1";
                        img.width = 100;
                        img.height = 100;
                        img.style.background = "#808080";
                        button.appendChild(img);
                        const paragraph = document.createElement("h4");
                        paragraph.textContent =
                            "You have already selected button " + i;
                        button.appendChild(paragraph);
                        button.style.width = "100%";
                        alert.appendChild(button);
                        paragraph.style.color = "yellow";
                        alert.style.position = "absolute";
                        alert.style.marginRight = "3%";
                        button.style.background = "#808080";
                        // labelHold.style.display ="none";
                        // childDiv.style.display ="none";
                        button.style.color = "blue";
                        button.style.borderRadius = "5px";
                        // button.style.padding = "10px 20px";
                        button.style.cursor = "pointer";
                        button.addEventListener("click", function () {
                            alert.remove();
                        });
                        button.classList.add("alert-button");
                        button.classList.add("close");
                        setTimeout(() => {
                            alert.remove();
                        }, 5000);
                        alert.appendChild(button);
                        labelHold.appendChild(alert);
                        isClicked = true;
                        return;
                    }
                }
            });
        }
    }

    const childDiv = document.createElement("div");
    childDiv.id = "child";
    childDiv.style.display = "flex";
    childDiv.style.justifyContent = "space-between";
    // childDiv.style.margin = "0px";

    const element1 = document.createElement("h6");
    element1.className = "left_child";
    element1.style.marginLeft = "0px";
    element1.textContent = element?.raw_data?.left;
    childDiv.appendChild(element1);

    const element2 = document.createElement("h6");
    element2.className = "neutral_child";
    element2.textContent = element?.raw_data?.center;
    childDiv.appendChild(element2);

    const element3 = document.createElement("h6");
    element3.className = "right_child";
    element3.textContent = element?.raw_data?.right;
    childDiv.appendChild(element3);

    const idHolder = document.createElement("h6");
    idHolder.className = "scaleId";
    idHolder.textContent = element?.raw_data?.scaleID;
    idHolder.style.display = "none";
    childDiv.appendChild(idHolder);

    scaleHold.append(childDiv);
    scaleField.append(scaleHold);

    if (element.data == "scale here") {
        scaleField.innerHTML = element.data;
    }
    if (
        element.data != "scale here" &&
        decoded.details.action === "template"
    ) {
        const scaleHold = document.createElement("div");
        scaleHold.className = "scool_input";
        scaleHold.style.color = "black";
        scaleHold.style.width = "100%";
        scaleHold.style.height = "90%";
        scaleHold.style.padding = "10px";
        scaleHold.style.display = "none";

        const scaleText = document.createElement("div");
        scaleText.className = "scale_text";
        scaleText.textContent = "Untitled-file_scale";
        scaleText.style.marginBottom = "10px";
        scaleText.style.width = "100%";
        scaleText.style.display = "flex";
        scaleText.style.alignItems = "center";
        scaleText.style.justifyContent = "center";
        scaleText.style.height = "10%";
        scaleText.style.backgroundColor = "transparent";
        scaleText.style.borderRadius = "0px";
        scaleText.style.display = "none";
        scaleHold.append(scaleText);

        const labelHold = document.createElement("div");
        labelHold.className = "label_hold";
        labelHold.style.width = "100%";
        labelHold.style.height = "85%";
        labelHold.style.border = "1px solid black";
        labelHold.style.backgroundColor = "blue";
        // labelHold.style.display = "none";
        scaleHold.appendChild(labelHold);
        labelHold.style.display = "flex";
        // labelHold.style.flexWrap = "wrap";
        labelHold.style.justifyContent = "space-between";
        labelHold.style.alignItems = "center";
        // labelHold.style.margin = "0px";
        labelHold.style.display = "none";

        for (let i = 0; i < 11; i++) {
            const circle = document.createElement("div");
            // Set the styles for the circle
            circle.className = "circle_label";
            circle.style.width = "35%";
            circle.style.height = "35%";
            circle.style.borderRadius = "50%";
            circle.style.backgroundColor = "red";
            circle.style.top = "30%";
            circle.style.left = "30%";
            circle.style.display = "flex";
            circle.style.justifyContent = "center";
            circle.style.alignItems = "center";
            circle.style.marginLeft = "2px";
            circle.style.display = "none";

            circle.textContent = i;
            labelHold.append(circle);
        }

        const childDiv = document.createElement("div");
        childDiv.id = "child";
        childDiv.style.display = "flex";
        childDiv.style.justifyContent = "space-between";
        // childDiv.style.margin = "0px";

        const element1 = document.createElement("h6");
        element1.className = "left_child";
        element1.style.marginLeft = "0px";
        element1.textContent = "Good";
        childDiv.appendChild(element1);

        const element2 = document.createElement("h6");
        element2.className = "neutral_child";
        element2.textContent = "Neutral";
        childDiv.appendChild(element2);

        const element3 = document.createElement("h6");
        element3.className = "right_child";
        element3.textContent = "Best";
        childDiv.appendChild(element3);
        scaleHold.append(childDiv);
        scaleField.append(scaleHold);

        scaleField.onclick = (e) => {
            // focuseddClassMaintain(e);
            table_dropdown_focuseddClassMaintain(e);
            handleClicked("newScale2");
            setSidebar(true);
        };
    }

    if (
        element.details === "Template scale" &&
        decoded.details.action === "document"
    ) {
        const scaleHold = document.createElement("div");
        scaleHold.className = "scool_input";
        scaleHold.style.color = "black";
        scaleHold.style.width = "100%";
        scaleHold.style.height = "90%";
        scaleHold.style.padding = "10px";
        scaleHold.style.display = "none";

        // scaleField.append(scaleHold);

        const scaleText = document.createElement("div");
        scaleText.className = "scale_text";
        scaleText.textContent = "Untitled-file_scale";
        scaleText.style.marginBottom = "10px";
        scaleText.style.width = "100%";
        scaleText.style.display = "flex";
        scaleText.style.alignItems = "center";
        scaleText.style.justifyContent = "center";
        scaleText.style.height = "10%";
        scaleText.style.backgroundColor = "transparent";
        scaleText.style.borderRadius = "0px";
        scaleHold.append(scaleText);

        const labelHold = document.createElement("div");
        labelHold.className = "label_hold";
        labelHold.style.width = "100%";
        labelHold.style.height = "85%";
        labelHold.style.border = "1px solid black";
        labelHold.style.backgroundColor = "blue";
        // labelHold.style.display = "none";
        scaleHold.appendChild(labelHold);
        labelHold.style.display = "flex";
        // labelHold.style.flexWrap = "wrap";
        labelHold.style.justifyContent = "space-between";
        labelHold.style.alignItems = "center";
        // labelHold.style.margin = "0px";

        for (let i = 0; i < 11; i++) {
            const circle = document.createElement("div");
            // Set the styles for the circle
            circle.className = "circle_label";
            circle.style.width = "35%";
            circle.style.height = "35%";
            circle.style.borderRadius = "50%";
            circle.style.backgroundColor = "red";
            circle.style.top = "30%";
            circle.style.left = "30%";
            circle.style.display = "flex";
            circle.style.justifyContent = "center";
            circle.style.alignItems = "center";
            circle.style.marginLeft = "2px";

            circle.textContent = i;
            labelHold.append(circle);
        }

        const childDiv = document.createElement("div");
        childDiv.id = "child";
        childDiv.style.display = "flex";
        childDiv.style.justifyContent = "space-between";

        const element1 = document.createElement("h6");
        element1.className = "left_child";
        element1.style.marginLeft = "0px";
        element1.textContent = "Good";
        childDiv.appendChild(element1);

        const element2 = document.createElement("h6");
        element2.className = "neutral_child";
        element2.textContent = "Neutral";
        childDiv.appendChild(element2);

        const element3 = document.createElement("h6");
        element3.className = "right_child";
        element3.textContent = "Best";
        childDiv.appendChild(element3);
        scaleHold.append(childDiv);

        scaleField.addEventListener("resize", () => {
            scaleHold.style.width = scaleField.clientWidth + "px";
            scaleHold.style.height = scaleField.clientHeight + "px";
        });

        scaleField.append(scaleHold);
    }

    if (
        element.details === "Document instance" &&
        decoded.details.action === "document"
    ) {
        const iframe = document.createElement("iframe");
        iframe.style.width = "90%";
        iframe.style.height = "90%";
        iframe.src = element.scale_url;

        scaleField.addEventListener("resize", () => {
            iframe.style.width = scaleField.clientWidth + "px";
            iframe.style.height = scaleField.clientHeight + "px";
        });

        // scaleField.append(iframe);
    }

    const scaleIdHolder = document.createElement("div");

    scaleIdHolder.className = "scaleId_holder";
    scaleIdHolder.innerHTML = element.id;
    scaleIdHolder.style.display = "none";

    const labelHolder = document.createElement("div");
    labelHolder.className = "label_holder";
    labelHolder.style.display = "none";

    scaleField.onclick = (e) => {
        focuseddClassMaintain(e);
        table_dropdown_focuseddClassMaintain(e);
        handleClicked("newScale2");
        setSidebar(true);
    };
    console.log(element);
    holderDIV.append(scaleField);
    holderDIV.append(scaleIdHolder);
    holderDIV.append(labelHolder);

    document
        .getElementsByClassName("midSection_container")
    [p - 1] // ?.item(0)
        ?.append(holderDIV);
}
export default createNewScaleInputField;