import React, { useState } from "react";
import copyInput from "../CopyInput";
import Axios from "axios";

// Regular JavaScript function to create a text input field
function createNewScaleInputField(
  id,
  element,
  p,
  holderDIV,
  focuseddClassMaintain,
  handleClicked,
  setSidebar,
  table_dropdown_focuseddClassMaintain,
  decoded,
  token,
  document_map_required
) {
  let isAnyRequiredElementEdited = false;

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

  const otherComponent = document.createElement("h6");
  otherComponent.className = "otherComponent";
  otherComponent.style.display = "none";
  otherComponent.textContent = element?.raw_data?.otherComponent;
  scaleHold.appendChild(otherComponent);

  const scaleTypeHolder = document.createElement("h6");
  scaleTypeHolder.className = "scaleTypeHolder";
  scaleTypeHolder.textContent = element?.raw_data?.scaleType;
  scaleTypeHolder.style.display = "none";
  scaleHold.appendChild(scaleTypeHolder);

  const stapelScaleArray = document.createElement("div");
  stapelScaleArray.className = "stapelScaleArray";
  stapelScaleArray.textContent = element?.raw_data?.stapelScaleArray;
  stapelScaleArray.style.display = "none";
  scaleHold.append(stapelScaleArray);

  const percentScaleArray = document.createElement("div");
  percentScaleArray.className = "percentScaleArray";
  percentScaleArray.textContent = element?.raw_data?.percentLabel;
  percentScaleArray.style.display = "none";
  scaleHold.append(percentScaleArray);

  const npsLiteTextArray = document.createElement("div");
  npsLiteTextArray.className = "nps_lite_text";
  npsLiteTextArray.textContent = element?.raw_data?.npsLiteTextArray;
  npsLiteTextArray.style.display = "none";
  scaleHold.append(npsLiteTextArray);

  const stapelOptionHolder = document.createElement("div");
  stapelOptionHolder.className = "stapelOptionHolder";
  stapelOptionHolder.textContent = element?.raw_data?.stapelOptionHolder;
  stapelOptionHolder.style.display = "none";
  scaleHold.append(stapelOptionHolder);

  const npsLiteOptionHolder = document.createElement("div");
  npsLiteOptionHolder.className = "nps_option_holder";
  npsLiteOptionHolder.textContent = element?.raw_data?.npsLiteOptionHolder;
  npsLiteOptionHolder.style.display = "none";
  scaleHold.append(npsLiteOptionHolder);

  const optionHolderLikert = document.createElement("div");
  optionHolderLikert.className = "likert_Option_Holder";
  optionHolderLikert.textContent = element?.raw_data?.likertOptionHolder || "";
  optionHolderLikert.style.display = "none";
  scaleHold.append(optionHolderLikert);

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
  if (scaleTypeHolder.textContent === "nps") {
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

      const orientation = element?.raw_data?.orentation;
      if (orientation === "nps_vertical") {
        const nps_vertical = document.createElement("h2");
        nps_vertical.className = "nps_vertical";
        nps_vertical.style.display = "none";
        nps_vertical.textContent = "nps_vertical";
        labelHold.appendChild(nps_vertical);

        labelHold.style.height = "82%";
        labelHold.style.top = "54%";
        labelHold.style.left = "50%";
        labelHold.style.transform = "translate(-50%, -50%)";
        scaleHold.style.border = "none";
        scaleHold.style.textAlign = "center";
        labelHold.style.width = "30%";
        labelHold.style.position = "absolute";
        labelHold.style.flexDirection = "column";
        labelHold.style.alignItems = "center";
        labelHold.style.marginTop = "0";

        // buttonCircleM.style.marginTop = "2px";
      }
      const buttonImage = element?.raw_data?.buttonImages;
      if (buttonImage && Array.isArray(buttonImage) && buttonImage[i]) {
        let newImg = document.createElement("img");
        newImg.className = "images_label";
        newImg.src = buttonImage[i];
        // console.log(buttonImage[i]);
        circle.appendChild(newImg);
      }

      if (element?.raw_data?.buttonText) {
        const buttonText = element.raw_data.buttonText;
        if (Array.isArray(buttonText) && buttonText.length > 0) {
          circle.textContent = buttonText[i % buttonText.length];
          // console.log("EMOJIIIIIIIIIII");
        } else {
          // console.log("Empty buttonText array");
        }
      } else {
        // console.log("NUMBERRRRRRRRRRRRRR");
        circle.textContent = i;
      }
      labelHold.append(circle);
      // Get the token from the request header.
      // const token = request.headers.get("Authorization");

      // If the token is not present, return an error.
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (decoded.details.action === "document") {
        let isClicked = false;

        function setClickedCircleBackgroundColor(circle, bgColor, scaleID) {
          localStorage.setItem(
            `circleBgColor_${scaleID}_${circle.textContent}`,
            bgColor
          );
          localStorage.setItem(
            `lastClickedCircleID_${scaleID}`,
            circle.textContent,
            bgColor
          );
        }

        function getClickedCircleBackgroundColor(circle, scaleID) {
          const circleKey = `circleBgColor_${scaleID}_${circle.textContent}`;
          return localStorage.getItem(circleKey);
        }

        setTimeout(() => {
          let scales = document.querySelectorAll(".newScaleInput");
          // console.log(scales);
          scales.forEach((scale) => {
            const scaleID = scale?.querySelector(".scaleId").textContent;
            const circlesInScale = scale.querySelectorAll(".circle_label");
            const lastClickedCircleID = localStorage.getItem(
              `lastClickedCircleID_${scaleID}`
            );

            circlesInScale.forEach((circle) => {
              const storedBgColor = getClickedCircleBackgroundColor(
                circle,
                scaleID
              );

              if (storedBgColor) {
                if (circle.textContent === lastClickedCircleID) {
                  circle.style.backgroundColor = storedBgColor;
                } else {
                  circle.style.backgroundColor;
                }
              }
            });
          });
        }, 500);
        circle.addEventListener("click", function () {
          if (!isClicked) {
            let scale =
              circle.parentElement.parentElement.parentElement.parentElement;
            let holding = scale?.querySelector(".newScaleInput");
            const buttonCircle = scale
              ? scale.querySelectorAll(".circle_label")
              : [];

            function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
              return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
              );
            }

            function invert(rgb) {
              rgb = [].slice
                .call(arguments)
                .join(",")
                .replace(/rgb\(|\)|rgba\(|\)|\s/gi, "")
                .split(",");
              for (var i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
              return rgbToHex(rgb[0], rgb[1], rgb[2]);
            }

            const circleBgColor = circle.style.backgroundColor;

            circle.style.backgroundColor = invert(circleBgColor);

            for (let i = 0; i < buttonCircle.length; i++) {
              if (buttonCircle[i].textContent !== circle.textContent) {
                buttonCircle[i].style.backgroundColor = circleBgColor;
              }
            }

            let holdElem = scale?.querySelector(".holdElem");

            if (holdElem) {
              // If holdElem exists, update its text content
              holdElem.textContent = i;
            } else {
              // If holdElem doesn't exist, create a new one
              holdElem = document.createElement("div");
              holdElem.className = "holdElem";
              holdElem.style.display = "none";
              holdElem.textContent = i;
              holding?.appendChild(holdElem);
              console.log("This is holdEle", holdElem.textContent);
              // if (scaleField?.parentElement?.classList.contains("holderDIV")) {
              //   scaleField?.parentElement?.classList.add("element_updated");
              // }
              const required_map_document = document_map_required?.filter(
                (item) => element?.id == item?.content
              );
              if (
                scaleField?.parentElement?.classList.contains("holderDIV") &&
                required_map_document?.length > 0
              ) {
                scaleField?.parentElement?.classList.add("element_updated");
              }
            }

            const scaleID = scale?.querySelector(".scaleId")?.textContent;
            setClickedCircleBackgroundColor(
              circle,
              circle.style.backgroundColor,
              scaleID
            );

            localStorage.setItem(
              `lastClickedCircleID_${scaleID}`,
              circle.textContent
            );
          }
        });
      }
    }
  } else if (scaleTypeHolder.textContent === "snipte") {
    const stapelScale = stapelScaleArray.textContent.split(",");
    const selectedOption = stapelOptionHolder.textContent;
    // console.log("This is the stapel", stapelScale);
    // console.log("This is option", selectedOption);
    for (let i = 0; i < stapelScale.length; i++) {
      const circle = document.createElement("div");
      circle.className = "circle_label";
      circle.textContent = stapelScale[i];
      labelHold.appendChild(circle);
      circle.style.width = "35%";
      circle.style.height = "35%";
      circle.style.borderRadius = "50%";
      circle.style.display = "flex";
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      circle.style.margin = "0 2px";
      circle.style.backgroundColor = element?.raw_data?.buttonColor;
      const stapelOrientation = element?.raw_data?.stapelOrientation;
      if (stapelOrientation === "stapel_vertical") {
        const stapel_vertical = document.createElement("h2");
        stapel_vertical.className = "stapel_vertical";
        stapel_vertical.style.display = "none";
        stapel_vertical.textContent = "stapel_vertical";
        labelHold.appendChild(stapel_vertical);

        labelHold.style.height = "82%";
        labelHold.style.top = "54%";
        labelHold.style.left = "50%";
        labelHold.style.transform = "translate(-50%, -50%)";
        scaleHold.style.border = "none";
        scaleHold.style.textAlign = "center";
        labelHold.style.width = "30%";
        labelHold.style.position = "absolute";
        labelHold.style.flexDirection = "column";
        labelHold.style.alignItems = "center";
        labelHold.style.marginTop = "0";
      }
      if (selectedOption === "emoji") {
        const buttonText = element.raw_data.buttonText;
        circle.textContent = buttonText[i % buttonText.length];
      }

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (decoded.details.action === "document") {
        const shouldHideFinalizeButton =
          localStorage.getItem("hideFinalizeButton");

        function setClickedCircleBackgroundColor(circle, bgColor, scaleID) {
          localStorage.setItem(
            `circleBgColor_${scaleID}_${circle.textContent}`,
            bgColor
          );
          localStorage.setItem(
            `lastClickedCircleID_${scaleID}`,
            circle.textContent,
            bgColor
          );
        }

        function getClickedCircleBackgroundColor(circle, scaleID) {
          const circleKey = `circleBgColor_${scaleID}_${circle.textContent}`;
          return localStorage.getItem(circleKey);
        }
        let circles = document.querySelectorAll(".circle_label");
        let isClicked = false;

        let circleBgColor = circle.style.backgroundColor;
        setTimeout(() => {
          let scales = document.querySelectorAll(".newScaleInput");
          // console.log(scales);
          scales.forEach((scale) => {
            const scaleID = scale?.querySelector(".scaleId").textContent;
            const circlesInScale = scale.querySelectorAll(".circle_label");
            const lastClickedCircleID = localStorage.getItem(
              `lastClickedCircleID_${scaleID}`
            );

            circlesInScale.forEach((circle) => {
              const storedBgColor = getClickedCircleBackgroundColor(
                circle,
                scaleID
              );

              if (storedBgColor) {
                if (circle.textContent === lastClickedCircleID) {
                  circle.style.backgroundColor = storedBgColor;
                } else {
                  circle.style.backgroundColor;
                }
              }
            });
          });
        }, 1000);

        circle.addEventListener("click", function () {
          if (!isClicked) {
            let holdingParentEl =
              circle.parentElement.parentElement.parentElement.parentElement;
            let scale =
              circle.parentElement.parentElement.parentElement.parentElement;
            let holding = scale?.querySelector(".newScaleInput");
            const buttonCircle = scale
              ? scale.querySelectorAll(".circle_label")
              : [];

            // console.log("This is the background color", holdingParentEl);
            function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
              return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
              );
            }
            function invert(rgb) {
              rgb = [].slice
                .call(arguments)
                .join(",")
                .replace(/rgb\(|\)|rgba\(|\)|\s/gi, "")
                .split(",");
              for (var i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
              return rgbToHex(rgb[0], rgb[1], rgb[2]);
            }

            circle.style.backgroundColor = invert(circle.style.backgroundColor);

            for (let i = 0; i < buttonCircle.length; i++) {
              if (buttonCircle[i].textContent !== circle.textContent) {
                buttonCircle[i].style.backgroundColor = circleBgColor;
              }
            }

            let holdElem = scale?.querySelector(".holdElem");

            if (holdElem) {
              // If holdElem exists, update its text content
              holdElem.textContent = stapelScale[i];
            } else {
              // If holdElem doesn't exist, create a new one
              holdElem = document.createElement("div");
              holdElem.className = "holdElem";
              holdElem.style.display = "none";
              holdElem.textContent = stapelScale[i];
              holding?.appendChild(holdElem);
              console.log("This is holdEle", holdElem.textContent);
              const required_map_document = document_map_required?.filter(
                (item) => element?.id == item?.content
              );
              if (
                scaleField?.parentElement?.classList.contains("holderDIV") &&
                required_map_document?.length > 0
              ) {
                scaleField?.parentElement?.classList.add("element_updated");
              }
              if (element.required) {
                isAnyRequiredElementEdited = true;
              }
              // if (scaleField?.parentElement?.classList.contains("holderDIV")) {
              //   scaleField?.parentElement?.classList.add("element_updated");
              // }
            }
            const scaleID = scale?.querySelector(".scaleId")?.textContent;
            setClickedCircleBackgroundColor(
              circle,
              circle.style.backgroundColor,
              scaleID
            );

            localStorage.setItem(
              `lastClickedCircleID_${scaleID}`,
              circle.textContent
            );
          }
        });
      }
    }
  } else if (scaleTypeHolder.textContent === "nps_lite") {
    const npsLiteText = npsLiteTextArray.textContent.split(",");
    for (let i = 0; i < npsLiteText.length; i++) {
      const circle = document.createElement("div");
      circle.className = `circle_label circle_${i}`;
      circle.textContent = npsLiteText[i];
      circle.style.borderRadius = "25px";
      circle.style.padding = "12px 27px";
      circle.style.margin = "0 auto";
      circle.style.display = "flex";
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      circle.style.width = "27%";
      circle.style.height = "35%";
      circle.style.fontSize = "18px";
      circle.style.backgroundColor = element?.raw_data?.buttonColor;

      if (element?.raw_data?.buttonText) {
        const buttonText = element.raw_data.buttonText;
        if (Array.isArray(buttonText) && buttonText.length > 0) {
          circle.textContent = buttonText[i % buttonText.length];
        } else {
          // console.log("Empty buttonText array");
        }
      } else {
        circle.textContent = i;
      }

      labelHold.appendChild(circle);

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      let orientation = element?.raw_data?.orientation;
      if (orientation === "Vertical") {
        const orientation = document.createElement("div");
        orientation.className = "orientation";
        orientation.textContent = "Vertical";
        orientation.style.display = "none";
        labelHold.appendChild(orientation);

        circle.style.margin = "15px 0";
        circle.style.padding = "10px 30px";

        scaleHold.style.border = "none";
        scaleHold.style.textAlign = "center";
        labelHold.style.height = "auto";
        labelHold.style.width = "50%";
        labelHold.style.position = "absolute";
        labelHold.style.display = "flex";
        labelHold.style.flexDirection = "column";
        labelHold.style.alignItems = "center";
        labelHold.style.marginTop = "0";
        labelHold.style.marginLeft = "26%";
      }

      if (decoded.details.action === "document") {
        let isClicked = false;
        function setClickedCircleBackgroundColor(circle, bgColor, scaleID) {
          localStorage.setItem(
            `circleBgColor_${scaleID}_${circle.textContent}`,
            bgColor
          );
          localStorage.setItem(
            `lastClickedCircleID_${scaleID}`,
            circle.textContent,
            bgColor
          );
        }

        function getClickedCircleBackgroundColor(circle, scaleID) {
          const circleKey = `circleBgColor_${scaleID}_${circle.textContent}`;
          return localStorage.getItem(circleKey);
        }

        setTimeout(() => {
          let scales = document.querySelectorAll(".newScaleInput");
          // console.log(scales);
          scales.forEach((scale) => {
            const scaleID = scale?.querySelector(".scaleId").textContent;
            const circlesInScale = scale.querySelectorAll(".circle_label");
            const lastClickedCircleID = localStorage.getItem(
              `lastClickedCircleID_${scaleID}`
            );

            circlesInScale.forEach((circle) => {
              const storedBgColor = getClickedCircleBackgroundColor(
                circle,
                scaleID
              );

              if (storedBgColor) {
                if (circle.textContent === lastClickedCircleID) {
                  circle.style.backgroundColor = storedBgColor;
                } else {
                  circle.style.backgroundColor;
                }
              }
            });
          });
        }, 1000);

        circle.addEventListener("click", function () {
          if (!isClicked) {
            let scale =
              circle.parentElement.parentElement.parentElement.parentElement;
            let holding = scale?.querySelector(".newScaleInput");
            const buttonCircle = scale
              ? scale.querySelectorAll(".circle_label")
              : [];

            console.log(
              "This is the background color",
              circle.style.backgroundColor
            );

            function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
              return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
              );
            }

            function invert(rgb) {
              rgb = [].slice
                .call(arguments)
                .join(",")
                .replace(/rgb\(|\)|rgba\(|\)|\s/gi, "")
                .split(",");
              for (var i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
              return rgbToHex(rgb[0], rgb[1], rgb[2]);
            }

            const circleBgColor = circle.style.backgroundColor;

            circle.style.backgroundColor = invert(circleBgColor);

            for (let i = 0; i < buttonCircle.length; i++) {
              if (buttonCircle[i].textContent !== circle.textContent) {
                buttonCircle[i].style.backgroundColor = circleBgColor;
              }
            }

            let holdElem = scale?.querySelector(".holdElem");

            if (holdElem) {
              // If holdElem exists, update its text content
              holdElem.textContent = npsLiteText[i];
            } else {
              // If holdElem doesn't exist, create a new one
              holdElem = document.createElement("div");
              holdElem.className = "holdElem";
              holdElem.style.display = "none";
              holdElem.textContent = npsLiteText[i] === "" ? i : npsLiteText[i];
              holding?.appendChild(holdElem);
              console.log("This is holdEle", holdElem.textContent);
              const required_map_document = document_map_required?.filter(
                (item) => element?.id == item?.content
              );
              if (
                scaleField?.parentElement?.classList.contains("holderDIV") &&
                required_map_document?.length > 0
              ) {
                scaleField?.parentElement?.classList.add("element_updated");
              }
              if (element.required) {
                isAnyRequiredElementEdited = true;
              }
              // if (scaleField?.parentElement?.classList.contains("holderDIV")) {
              //   scaleField?.parentElement?.classList.add("element_updated");
              // }
            }

            const scaleID = scale?.querySelector(".scaleId")?.textContent;
            setClickedCircleBackgroundColor(
              circle,
              circle.style.backgroundColor,
              scaleID
            );

            localStorage.setItem(
              `lastClickedCircleID_${scaleID}`,
              circle.textContent
            );
          }
        });
      }
    }
  } else if (scaleTypeHolder.textContent === "likert") {
    const likertScaleArray = document.createElement("div");
    likertScaleArray.className = "likert_Scale_Array";
    likertScaleArray.textContent = element?.raw_data?.likertScaleArray || "";
    likertScaleArray.style.display = "none";

    scaleHold.append(likertScaleArray);
    const likertScale = likertScaleArray.textContent.split(",");
    const numRows = Math.ceil(likertScale / 3);
    const numColumns = Math.min(likertScale, 3);
    // console.log("This is the likertjddddddd++++!!!!!!!!!", likertScale);

    for (let i = 0; i < likertScale.length; i++) {
      const circle = document.createElement("div");
      circle.className = "circle_label";
      circle.textContent = likertScale[i];
      circle.style.width = "80%";
      circle.style.height = "55%";
      circle.style.borderRadius = "25px";
      circle.style.padding = "12px 10px";
      circle.style.marginLeft = "5px";
      circle.style.marginRight = "5px";
      circle.style.backgroundColor = element?.raw_data?.buttonColor;
      circle.style.display = "flex";
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      labelHold.style.display = "grid";
      labelHold.style.gridTemplateColumns = `repeat(3, 1fr)`;
      labelHold.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      labelHold.appendChild(circle);

      let orientation = element?.raw_data?.orientation;
      if (orientation === "vertical") {
        const orientation = document.createElement("div");
        orientation.className = "orientation";
        orientation.textContent = "vertical";
        orientation.style.display = "none";
        labelHold.appendChild(orientation);
        labelHold.style.position = "absolute";
        circle.style.margin = "5px 0";
        circle.style.padding = "6px 12px";
        labelHold.style.height = "80%";
        labelHold.style.width = "50%";
        labelHold.style.display = "flex";
        labelHold.style.flexDirection = "column";
        labelHold.style.alignItems = "center";
        labelHold.style.marginTop = "1%";
        labelHold.style.marginLeft = "26%";
      }
      // var optionPosition = document.querySelector("#orientationIdLinkert");
      // if (optionPosition) {
      //   const newSelectedOrientation = getSelectedOrientationValue(); // Get the selected orientation
      //   optionPosition.value = newSelectedOrientation;

      //   // Save the selected orientation to local storage
      //   localStorage.setItem('selectedOrientation', newSelectedOrientation);
      // }
      if (decoded.details.action === "document") {
        let isClicked = false;
        const shouldHideFinalizeButton =
          localStorage.getItem("hideFinalizeButton");

        function setClickedCircleBackgroundColor(circle, bgColor, scaleID) {
          localStorage.setItem(
            `circleBgColor_${scaleID}_${circle.textContent}`,
            bgColor
          );
          localStorage.setItem(
            `lastClickedCircleID_${scaleID}`,
            circle.textContent,
            bgColor
          );
        }

        function getClickedCircleBackgroundColor(circle, scaleID) {
          const circleKey = `circleBgColor_${scaleID}_${circle.textContent}`;
          return localStorage.getItem(circleKey);
        }

        setTimeout(() => {
          let scales = document.querySelectorAll(".newScaleInput");
          // console.log(scales);
          scales.forEach((scale) => {
            const scaleID = scale?.querySelector(".scaleId").textContent;
            const circlesInScale = scale.querySelectorAll(".circle_label");
            const lastClickedCircleID = localStorage.getItem(
              `lastClickedCircleID_${scaleID}`
            );

            circlesInScale.forEach((circle) => {
              const storedBgColor = getClickedCircleBackgroundColor(
                circle,
                scaleID
              );

              if (storedBgColor) {
                if (circle.textContent === lastClickedCircleID) {
                  circle.style.backgroundColor = storedBgColor;
                } else {
                  circle.style.backgroundColor;
                }
              }
            });
          });
        }, 1000);

        circle.addEventListener("click", function () {
          if (!isClicked) {
            let scale =
              circle.parentElement.parentElement.parentElement.parentElement;
            let holding = scale?.querySelector(".newScaleInput");
            const buttonCircle = scale
              ? scale.querySelectorAll(".circle_label")
              : [];

            console.log(
              "This is the background color",
              circle.style.backgroundColor
            );

            function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
              return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
              );
            }

            function invert(rgb) {
              rgb = [].slice
                .call(arguments)
                .join(",")
                .replace(/rgb\(|\)|rgba\(|\)|\s/gi, "")
                .split(",");
              for (var i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
              return rgbToHex(rgb[0], rgb[1], rgb[2]);
            }

            const circleBgColor = circle.style.backgroundColor;

            circle.style.backgroundColor = invert(circleBgColor);

            for (let i = 0; i < buttonCircle.length; i++) {
              if (buttonCircle[i].textContent !== circle.textContent) {
                buttonCircle[i].style.backgroundColor = circleBgColor;
              }
            }

            let holdElem = scale?.querySelector(".holdElem");

            if (holdElem) {
              // If holdElem exists, update its text content
              holdElem.textContent = likertScale[i];
            } else {
              // If holdElem doesn't exist, create a new one
              holdElem = document.createElement("div");
              holdElem.className = "holdElem";
              holdElem.style.display = "none";
              holdElem.textContent = likertScale[i];
              holding?.appendChild(holdElem);
              console.log("This is holdEle", holdElem.textContent);
              const required_map_document = document_map_required?.filter(
                (item) => element?.id == item?.content
              );
              if (
                scaleField?.parentElement?.classList.contains("holderDIV") &&
                required_map_document?.length > 0
              ) {
                scaleField?.parentElement?.classList.add("element_updated");
              }
              if (element.required) {
                isAnyRequiredElementEdited = true;
              }
            }

            const scaleID = scale?.querySelector(".scaleId")?.textContent;
            setClickedCircleBackgroundColor(
              circle,
              circle.style.backgroundColor,
              scaleID
            );

            localStorage.setItem(
              `lastClickedCircleID_${scaleID}`,
              circle.textContent
            );
          }
        });
      }
    }
  } else if (scaleTypeHolder.textContent === "percent_scale") {
    let prodLength = element?.raw_data?.percentLabel;
    console.log(labelHold.children.length);

    for (let i = 0; i < prodLength; i++) {
      // let originalText = element?.raw_data?.percentCenter[i];
      // let percentValue = originalText?.replace("%", "");
      labelHold.style.display = "flex";
      labelHold.style.justifyContent = "center";
      labelHold.style.height = "100%";
      labelHold.style.flexDirection = "column";
      labelHold.style.border = "none";

      let conatainerDIV = document.createElement("div");
      conatainerDIV.className = "containerDIV";
      conatainerDIV.style.width = "95%";
      conatainerDIV.style.padding = "10px 39px 10px 10px";
      conatainerDIV.style.border = "1px solid gray";
      labelHold.append(conatainerDIV);
      // conatainerDIV.append(labelHold);
      // scaleHold.append(conatainerDIV)

      let nameDiv = document.createElement("div");
      nameDiv.className = "product_name";
      nameDiv.style.textAlign = "center";
      nameDiv.style.fontWeight = "700";
      nameDiv.textContent = element?.raw_data?.percentProdName[i];
      conatainerDIV.appendChild(nameDiv);
      // labelHold.appendChild(nameDiv);

      const inputPercent = document.createElement("input");
      inputPercent.type = "range";
      inputPercent.min = "0";
      inputPercent.max = "100";
      // inputPercent.value = percentValue;
      inputPercent.disabled = "true";
      inputPercent.className = "percent-slider";
      inputPercent.style.width = "100%";
      inputPercent.style.cursor = "pointer";
      inputPercent.style.background = element?.raw_data?.percentBackground;
      inputPercent.style.webkitAppearance = "none";
      inputPercent.style.borderRadius = "10px";
      inputPercent.setAttribute("data-index", i);
      conatainerDIV.appendChild(inputPercent);
      // labelHold.appendChild(inputPercent);

      let percentChilds = document.createElement("div");
      percentChilds.style.display = "flex";
      percentChilds.style.width = "100%";
      percentChilds.style.alignItems = "center";
      percentChilds.style.justifyContent = "space-between";

      let leftPercent = document.createElement("div");
      leftPercent.textContent = "0";
      leftPercent.className = "left-percent";
      percentChilds.appendChild(leftPercent);

      let centerPercent = document.createElement("div");
      // centerPercent.textContent = `${element?.raw_data?.percentCenter[i]}`;
      centerPercent.className = "center-percent";
      percentChilds.appendChild(centerPercent);

      let rightPercent = document.createElement("div");
      rightPercent.textContent = "100";
      rightPercent.className = "right-percent";
      percentChilds.appendChild(rightPercent);

      conatainerDIV.appendChild(percentChilds);
      // labelHold.appendChild(percentChilds);
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      let orientation = element?.raw_data?.orientation;
      if (orientation === "Vertical") {
        const orientation = document.createElement("div");
        orientation.className = "orientation";
        orientation.textContent = "Vertical";
        orientation.style.display = "none";
        scaleHold.appendChild(orientation);

        scaleHold.style.display = "flex";
        scaleHold.style.flexDirection = "column";
        scaleHold.style.alignItems = "center";
        scaleHold.style.justifyContent = "center";

        conatainerDIV.style.padding =
          nameDiv.textContent.length < 9
            ? "24px 39px 10px 14px"
            : "24px 39px 37px 14px";
        conatainerDIV.style.width = "90%";
        conatainerDIV.style.position = "relative";

        labelHold.style.width = "100%";
        labelHold.style.height = "96%";
        labelHold.style.alignItems = "center";
        labelHold.style.transform = "rotate(270deg)";
        nameDiv.style.position = "absolute";
        nameDiv.style.top = nameDiv.textContent.length < 9 ? "23px" : "39px";
        nameDiv.style.right = "-2px";
        nameDiv.style.left = "70%";
        nameDiv.style.width = "50%";
        nameDiv.style.transform = "rotate(90deg)";

        inputPercent.style.width = "100%";
      }

      if (decoded.details.action === "document") {
        inputPercent.disabled = "";
        const scale = document.querySelector(".focussedd");

        // ...

        // Add an event listener to update centerPercent
        const scaleId = element?.raw_data?.scaleID; // Replace with your scale identifier

        // Generate a unique key for localStorage using scaleId and index
        const localStorageKey = `inputPercent_${scaleId}_${i}`;

        // Add an event listener to update centerPercent
        inputPercent.addEventListener("input", function () {
          centerPercent.textContent = `${inputPercent.value}%`;
          if (scaleField?.parentElement?.classList.contains("holderDIV")) {
            scaleField?.parentElement?.classList.add("element_updated");
          }

          // Store the current inputPercent value in localStorage using the unique key
          localStorage.setItem(localStorageKey, inputPercent.value);
        });

        // Retrieve and set the value from localStorage if available using the unique key
        const storedInputValue = localStorage.getItem(localStorageKey);
        if (storedInputValue !== null) {
          inputPercent.value = storedInputValue;
          centerPercent.textContent = `${inputPercent.value}%`;
        }
      }
    }
  } else if (scaleTypeHolder.textContent === "percent_sum_scale") {
    let prodLength = element?.raw_data?.percentLabel;

    for (let i = 0; i < prodLength; i++) {
      labelHold.style.display = "flex";
      labelHold.style.justifyContent = "center";
      labelHold.style.height = "100%";
      labelHold.style.flexDirection = "column";
      labelHold.style.border = "none";

      let containerDiv = document.createElement("div");
      containerDiv.className = "containerDIV";
      containerDiv.style.width = "95%";
      containerDiv.style.padding = "10px 39px 10px 10px";
      containerDiv.style.border = "1px solid gray";
      labelHold.append(containerDiv);

      let nameDiv = document.createElement("div");
      nameDiv.className = "product_name";
      nameDiv.style.textAlign = "center";
      nameDiv.style.fontWeight = "700";
      nameDiv.textContent = element?.raw_data?.percentProdName[i];
      containerDiv.appendChild(nameDiv);

      const inputPercent = document.createElement("input");
      inputPercent.type = "range";
      inputPercent.min = "0";
      inputPercent.max = "100";
      inputPercent.disabled = "true";
      inputPercent.className = "percent-slider";
      inputPercent.style.width = "100%";
      inputPercent.style.cursor = "pointer";
      inputPercent.style.background = element?.raw_data?.percentBackground;
      inputPercent.style.webkitAppearance = "none";
      inputPercent.style.borderRadius = "10px";
      containerDiv.appendChild(inputPercent);

      let percentChilds = document.createElement("div");
      percentChilds.style.display = "flex";
      percentChilds.style.width = "100%";
      percentChilds.style.alignItems = "center";
      percentChilds.style.justifyContent = "space-between";

      let leftPercent = document.createElement("div");
      leftPercent.textContent = "0";
      leftPercent.className = "left-percent";
      percentChilds.appendChild(leftPercent);

      let centerPercent = document.createElement("div");
      centerPercent.className = "center-percent";
      percentChilds.appendChild(centerPercent);

      let rightPercent = document.createElement("div");
      rightPercent.textContent = "100";
      rightPercent.className = "right-percent";
      percentChilds.appendChild(rightPercent);

      containerDiv.appendChild(percentChilds);

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      let orientation = element?.raw_data?.orientation;
      if (orientation === "Vertical") {
        const orientation = document.createElement("div");
        orientation.className = "orientation";
        orientation.textContent = "Vertical";
        orientation.style.display = "none";
        scaleHold.appendChild(orientation);

        scaleHold.style.display = "flex";
        scaleHold.style.flexDirection = "column";
        scaleHold.style.alignItems = "center";
        scaleHold.style.justifyContent = "center";
        containerDiv.style.padding =
        nameDiv.textContent.length < 9
          ? "24px 39px 10px 14px"
          : "24px 39px 37px 14px";
        containerDiv.style.width = "90%";
        containerDiv.style.position = "relative";
        containerDiv.style.borderRight = "none";
        labelHold.style.width = "100%";
        labelHold.style.height = "96%";
        labelHold.style.alignItems = "center";
        labelHold.style.transform = "rotate(270deg)";
        nameDiv.style.position = "absolute";
        nameDiv.style.lineHeight = "0.95";
        if ( nameDiv.textContent.length < 10) {
          nameDiv.style.top = "20px"
          nameDiv.style.left = "93%";
          nameDiv.style.right = "2px";
        } else {
          nameDiv.style.left = "98%";
          nameDiv.style.top = "-1px";
          nameDiv.style.right = "-7px";
        }
        nameDiv.style.transform = "rotate(90deg)";
        nameDiv.style.paddingBottom = prodLength > 6 ? "30px" : "0px";
        inputPercent.style.width = "100%";
        scaleText.style.marginBottom = "65px";
      }

      if (decoded.details.action === "document") {
        inputPercent.disabled = "";
        const scale = document.querySelector(".focussedd");

        // ...

        // Add an event listener to update centerPercent
        const scaleId = element?.raw_data?.scaleID; // Replace with your scale identifier

        // Generate a unique key for localStorage using scaleId and index
        const localStorageKey = `inputPercent_${scaleId}_${i}`;

        // Add an event listener to update centerPercent
        inputPercent.addEventListener("input", function () {
          centerPercent.textContent = `${inputPercent.value}%`;
          if (scaleField?.parentElement?.classList.contains("holderDIV")) {
            scaleField?.parentElement?.classList.add("element_updated");
          }

          // Store the current inputPercent value in localStorage using the unique key
          localStorage.setItem(localStorageKey, inputPercent.value);
        });

        // Retrieve and set the value from localStorage if available using the unique key
        const storedInputValue = localStorage.getItem(localStorageKey);
        if (storedInputValue !== null) {
          inputPercent.value = storedInputValue;
          centerPercent.textContent = `${inputPercent.value}%`;
        }
      }
    }
  } else if (scaleTypeHolder.textContent === "comparison_paired_scale") {
    const pairedScaleArray = document.createElement("div");
    pairedScaleArray.className = "paired_Scale_Array";
    pairedScaleArray.textContent = element?.raw_data?.pairedScaleArray || "";
    pairedScaleArray.style.display = "none";

    scaleHold.append(pairedScaleArray);
    const pairedScale = pairedScaleArray.textContent.split(",");
    console.log("This is the d++++!!!!!!!!!", pairedScale);

    for (let i = 0; i < pairedScale.length; i++) {
      const circle = document.createElement("div");
      circle.className = "circle_label";
      circle.textContent = pairedScale[i];
      circle.style.width = "80%";
      circle.style.height = "55%";
      circle.style.borderRadius = "25px";
      circle.style.padding = "12px 10px";
      circle.style.marginLeft = "5px";
      circle.style.marginRight = "5px";
      circle.style.backgroundColor = element?.raw_data?.buttonColor;
      circle.style.display = "flex";
      circle.style.justifyContent = "center";
      circle.style.alignItems = "center";
      labelHold.style.display = "grid";
      labelHold.appendChild(circle);

      let orientation = element?.raw_data?.orientation;
      if (orientation === "vertical") {
        const orientation = document.createElement("div");
        orientation.className = "orientation";
        orientation.textContent = "vertical";
        orientation.style.display = "none";
        labelHold.appendChild(orientation);
        labelHold.style.position = "absolute";
        circle.style.margin = "5px 0";
        circle.style.padding = "6px 12px";
        labelHold.style.height = "80%";
        labelHold.style.width = "50%";
        labelHold.style.display = "flex";
        labelHold.style.flexDirection = "column";
        labelHold.style.alignItems = "center";
        labelHold.style.marginTop = "1%";
        labelHold.style.marginLeft = "26%";
      }
      if (decoded.details.action === "document") {
        let isClicked = false;
        const shouldHideFinalizeButton =
          localStorage.getItem("hideFinalizeButton");

        function setClickedCircleBackgroundColor(circle, bgColor, scaleID) {
          localStorage.setItem(
            `circleBgColor_${scaleID}_${circle.textContent}`,
            bgColor
          );
          localStorage.setItem(
            `lastClickedCircleID_${scaleID}`,
            circle.textContent,
            bgColor
          );
        }

        function getClickedCircleBackgroundColor(circle, scaleID) {
          const circleKey = `circleBgColor_${scaleID}_${circle.textContent}`;
          return localStorage.getItem(circleKey);
        }

        setTimeout(() => {
          let scales = document.querySelectorAll(".newScaleInput");
          console.log(scales);
          scales.forEach((scale) => {
            const scaleID = scale?.querySelector(".scaleId").textContent;
            const circlesInScale = scale.querySelectorAll(".circle_label");
            const lastClickedCircleID = localStorage.getItem(
              `lastClickedCircleID_${scaleID}`
            );

            circlesInScale.forEach((circle) => {
              const storedBgColor = getClickedCircleBackgroundColor(
                circle,
                scaleID
              );

              if (storedBgColor) {
                if (circle.textContent === lastClickedCircleID) {
                  circle.style.backgroundColor = storedBgColor;
                } else {
                  circle.style.backgroundColor;
                }
              }
            });
          });
        }, 1000);

        circle.addEventListener("click", function () {
          if (!isClicked) {
            let scale =
              circle.parentElement.parentElement.parentElement.parentElement;
            let holding = scale?.querySelector(".newScaleInput");
            const buttonCircle = scale
              ? scale.querySelectorAll(".circle_label")
              : [];

            console.log(
              "This is the background color",
              circle.style.backgroundColor
            );

            function componentToHex(c) {
              var hex = c.toString(16);
              return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
              return (
                "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
              );
            }

            function invert(rgb) {
              rgb = [].slice
                .call(arguments)
                .join(",")
                .replace(/rgb\(|\)|rgba\(|\)|\s/gi, "")
                .split(",");
              for (var i = 0; i < rgb.length; i++)
                rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
              return rgbToHex(rgb[0], rgb[1], rgb[2]);
            }

            const circleBgColor = circle.style.backgroundColor;

            circle.style.backgroundColor = invert(circleBgColor);

            for (let i = 0; i < buttonCircle.length; i++) {
              if (buttonCircle[i].textContent !== circle.textContent) {
                buttonCircle[i].style.backgroundColor = circleBgColor;
              }
            }

            let holdElem = scale?.querySelector(".holdElem");

            if (holdElem) {
              // If holdElem exists, update its text content
              holdElem.textContent = likertScale[i];
            } else {
              // If holdElem doesn't exist, create a new one
              holdElem = document.createElement("div");
              holdElem.className = "holdElem";
              holdElem.style.display = "none";
              holdElem.textContent = likertScale[i];
              holding?.appendChild(holdElem);
              console.log("This is holdEle", holdElem.textContent);
              if (scaleField?.parentElement?.classList.contains("holderDIV")) {
                scaleField?.parentElement?.classList.add("element_updated");
              }
            }

            const scaleID = scale?.querySelector(".scaleId")?.textContent;
            setClickedCircleBackgroundColor(
              circle,
              circle.style.backgroundColor,
              scaleID
            );

            localStorage.setItem(
              `lastClickedCircleID_${scaleID}`,
              circle.textContent
            );
          }
        });
      }
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

  const orientation = element?.raw_data?.orentation;
  if (orientation === "nps_vertical") {
    childDiv.style.display = "flex";
    childDiv.style.flexDirection = "column";
    childDiv.style.justifyContent = "space-between";

    childDiv.style.alignItems = "flex-start";
    childDiv.style.width = "32%";
    childDiv.style.marginLeft = "auto";
    childDiv.style.height = "98%";

    // buttonCircleM.style.marginTop = "2px";
  }

  const stapelOrientation = element?.raw_data?.stapelOrientation;
  if (stapelOrientation === "stapel_vertical") {
    childDiv.style.display = "flex";
    childDiv.style.flexDirection = "column";
    childDiv.style.justifyContent = "space-between";

    childDiv.style.alignItems = "flex-start";
    childDiv.style.width = "32%";
    childDiv.style.marginLeft = "auto";
    childDiv.style.height = "98%";
  }

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
  if (element.data != "scale here" && decoded.details.action === "template") {
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
    // const parentDiv = document.createElement("div");
    // parentDiv.id = "parent";
    // parentDiv.style.margin = "0px";

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

    // const iframe = document.createElement("iframe");
    // iframe.style.width = "90%";
    // iframe.style.height = "90%";
    // iframe.src = element.scale_url;

    // scaleField.addEventListener("resize", () => {
    //   iframe.style.width = scaleField.clientWidth + "px";
    //   iframe.style.height = scaleField.clientHeight + "px";
    // });

    // scaleField.append(iframe);
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
    // const iframe = document.createElement("iframe");
    // iframe.style.width = "90%";
    // iframe.style.height = "90%";

    // Axios.post(
    //   "https://100035.pythonanywhere.com/api/nps_create_instance",
    //   {
    //     scale_id: element.scaleId,
    //   }
    // )
    //   .then((res) => {
    //     setIsLoading(false);
    //     // console.log(res, "scaleData");
    //     const lastInstance = res.data.response.instances.slice(-1)[0];
    //     const lastValue = Object.values(lastInstance)[0];
    //     iframe.src = lastValue;
    //     // console.log(lastValue);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     // console.log(err);
    //   });

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
    // const parentDiv = document.createElement("div");
    // parentDiv.id = "parent";
    // parentDiv.style.margin = "0px";

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
    // console.log("This is the scale type", scaleTypeHolder.textContent);
  };
  // console.log(element);
  holderDIV.append(scaleField);
  holderDIV.append(scaleIdHolder);
  holderDIV.append(labelHolder);

  document
    .getElementsByClassName("midSection_container")
    [p - 1] // ?.item(0)
    ?.append(holderDIV);
}
export default createNewScaleInputField;
