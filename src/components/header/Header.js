import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Header.css";
import { FaCopy, FaPen, FaSave } from "react-icons/fa";
import { BiImport, BiExport, BiCut, BiCopyAlt } from "react-icons/bi";
import { ImRedo, ImUndo, ImPaste } from "react-icons/im";
import CryptoJS from "crypto-js";
import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import { CgMenuLeft, CgPlayListRemove } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillPrinter } from "react-icons/ai";

import { downloadPDF } from "../../utils/genratePDF.js";

import generateImage from "../../utils/generateImage.js";

const Header = () => {
  const inputRef = useRef(null);
  const componentRef = useRef(null);
  const menuRef = useRef(null);
  const {
    item,
    setItem,
    isLoading,
    setIsLoading,
    isDataSaved,
    setIsDataSaved,
    isFlipClicked,
    setIsFlipClicked,
    fetchedData,
    setFetchedData,
    deletePages,
    setDeletepages,
    title,
    setTitle,
    data,
    setData,
    isClicked,
    isFinializeDisabled,
    setIsDataRetrieved,
    setIsFinializeDisabled,
    scaleId,
    setScaleId,
    scaleData,
    setScaleData,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
    companyId,
    setCompanyId,
    isMenuVisible,
    setIsMenuVisible,
    buttonLink,
    buttonPurpose,
    setCustomId,
    focuseddClassMaintain,
    handleClicked,
    setSidebar,
    borderSize,
    setBorderSize,
    borderColor,
    setBorderColor,
    inputBorderSize,
    setInputBorderSize,
    inputBorderColor,
    setInputBorderColor,
    calendarBorderSize,
    setCalendarBorderSize,
    calendarBorderColor,
    setCalendarBorderColor,
    dropdownBorderSize,
    setDropdownBorderSize,
    dropdownBorderColor,
    setDropdownBorderColor,
    buttonBorderSize,
    setButtonBorderSize,
    buttonBorderColor,
    setButtonBorderColor,
    signBorderSize,
    setSignBorderSize,
    signBorderColor,
    setSignBorderColor,
    tableBorderSize,
    setTableBorderSize,
    tableBorderColor,
    setTableBorderColor,
    iframeBorderSize,
    setIframeBorderSize,
    iframeBorderColor,
    setIframeBorderColor,
    scaleBorderSize,
    setScaleBorderSize,
    scaleBorderColor,
    setScaleBorderColor,
    containerBorderSize,
    setContainerBorderSize,
    containerBorderColor,
    setContainerBorderColor,
  } = useStateContext();

  const [printContent, setPrintContent] = useState(false);

  const handleOptions = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleUndo = () => {
    document.execCommand("undo");
  };
  const handleRedo = () => {
    document.execCommand("redo");
  };

  const handleCopy = () => {
    document.execCommand("copy");
  };

  const handleTitle = () => {
    const divElement = inputRef.current;
    divElement.focus();

    const range = document.createRange();
    range.selectNodeContents(divElement);

    const endOffset = divElement.innerText.length;
    // range.setStart(divElement.firstChild, endOffset);
    // range.setEnd(divElement.firstChild, endOffset);

    range.setStart(divElement, endOffset);
    range.setEnd(divElement, endOffset);

    range.collapse(false);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  let createPageNumber;
  if (item?.length) {
    createPageNumber = item[item?.length - 1].split("_")[1];
  } else {
    createPageNumber = 0;
  }
  function createNewPage() {
    createPageNumber++;
    const current = [...item];
    current.push(`div_${createPageNumber}`);

    setItem(current);
  }

  function removePage() {
    const current = [...item];

    var pageNumber = prompt("Enter the number of page to delete");
    if (pageNumber != null) {
      const index = pageNumber - 1;
      const page = document.getElementsByClassName("midSection_container")[
        index
      ];

      if (index > 0 && index < item?.length) {
        page.parentElement.remove();
        item.pop();
      } else {
        console.warn(`Cant remove page`);
      }
    }
  }

  // Adding a new branch comment

  function getPosition(el) {
    const midSec = document.getElementById("midSection_container");

    const rect = el.getBoundingClientRect();
    const midsectionRect = midSec.getBoundingClientRect();

    return {
      top:
        rect.top > 0
          ? Math.abs(midsectionRect.top)
          : rect.top - midsectionRect.top,
      left: rect.left - midsectionRect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
  }

  let contentFile = [];
  let page = [{}];

  for (let i = 1; i <= item?.length; i++) {
    const element = { [i]: [] };
    page[0] = { ...page[0], ...element };
  }

  const dataInsertWithPage = (tempPosn, elem) => {
    let low = 0;
    let high = 1122;
    for (let i = 1; i <= item?.length; i++) {
      if (tempPosn.top >= low && tempPosn.top < high) {
        page[0][i].push(elem);
      }
      low += 1122;
      high += 1122;
    }
  };

  const findPaageNum = (element) => {
    let targetParent = element;
    let pageNum = null;
    while (1) {
      if (targetParent.classList.contains("midSection_container")) {
        targetParent = targetParent;
        break;
      } else {
        targetParent = targetParent.parentElement;
      }
    }
    pageNum = targetParent.innerText.split("\n")[0];
    return pageNum;
  };
  
  function savingTableData() {
    const tables = document.getElementsByClassName("tableInput");
    let tables_tags = [];

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        var new_table = document.getElementsByTagName("table")[0];

        tables_tags.push(new_table);
      }
    }
  }

  let elem = {};
  function saveDocument() {
    const txt = document.getElementsByClassName("textInput");
    if (txt.length) {
      for (let h = 0; h < txt.length; h++) {
        if (
          txt[h]?.parentElement?.classList?.contains("holderDIV") &&
          !txt[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = txt[h].parentElement;
          let tempPosn = getPosition(tempElem);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: txt[h].parentElement.style.top,
            left: tempPosn.left,
            type: "TEXT_INPUT",
            data: txt[h].innerText,
            border: `${inputBorderSize} dotted ${inputBorderColor}`,
            borderWidths: txt[h].parentElement.style.border,
            raw_data: txt[h].innerHTML,
            id: `t${h + 1}`,
          };

          const pageNum = findPaageNum(txt[h]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const img_input = document.getElementsByTagName("input");
    const img = document.getElementsByClassName("imageInput");
    if (img) {
      for (let h = 0; h < img.length; h++) {
        if (
          img[h]?.parentElement?.classList?.contains("holderDIV") &&
          !img[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          const reader = new FileReader();
          let tempElem = img[h].parentElement;
          let tempPosn = getPosition(tempElem);
          console.log(
            "img[h].style.backgroundImage",
            img[h].style.backgroundImage
          );
          const dataName = img[h].style.backgroundImage
            ? img[h].style.backgroundImage
            : img[h].innerText;
          console.log("dataName", dataName);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: img[h].parentElement.style.top,
            left: tempPosn.left,
            type: "IMAGE_INPUT",
            data: dataName,
            borderWidth: `${borderSize}px dotted ${borderColor}`,
            id: `i${h + 1}`,
          };

          const pageNum = findPaageNum(img[h]);
          page[0][pageNum]?.push(elem);
        }
      }
    }

    const date = document.getElementsByClassName("dateInput");
    if (date.length) {
      for (let h = 0; h < date.length; h++) {
        if (
          date[h]?.parentElement?.classList?.contains("holderDIV") &&
          !date[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = date[h].parentElement;
          let tempPosn = getPosition(tempElem);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: date[h].parentElement.style.top,
            left: tempPosn.left,
            type: "DATE_INPUT",
            border: `${calendarBorderSize} dotted ${calendarBorderColor}`,
            calBorder: date[h].parentElement.style.border,
            data: date[h].innerHTML,
            id: `d${h + 1}`,
          };

          const pageNum = findPaageNum(date[h]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const sign = document.getElementsByClassName("signInput");
    if (sign.length) {
      for (let h = 0; h < sign.length; h++) {
        if (
          sign[h]?.parentElement?.classList?.contains("holderDIV") &&
          !sign[h]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = sign[h].parentElement;
          let tempPosn = getPosition(tempElem);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: sign[h].parentElement.style.top,
            left: tempPosn.left,
            type: "SIGN_INPUT",
            border: `${signBorderSize} dotted ${signBorderColor}`,
            signBorder: sign[h].parentElement.style.border,
            data:
              sign[h].firstElementChild === null
                ? // decoded.details.action === "document"
                  sign[h].innerHTML
                : sign[h].firstElementChild.src,
            id: `s${h + 1}`,
          };

          const pageNum = findPaageNum(sign[h]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const tables = document.getElementsByClassName("tableInput");

    if (tables.length) {
      for (let t = 0; t < tables.length; t++) {
        if (
          tables[t]?.parentElement?.classList?.contains("holderDIV") &&
          !tables[t]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = tables[t].parentElement;
          let tempPosn = getPosition(tempElem);

          function getChildData() {
            const allTableCCells = [];
            const tableChildren = tables[t].firstElementChild.children;
            for (let i = 0; i < tableChildren.length; i++) {
              const tableTR = { tr: null };
              const newTableTR = [];
              for (let j = 0; j < tableChildren[i].children.length; j++) {
                // const element = tableChildren[i];

                const TdDivClassName =
                  tableChildren[i].children[
                    j
                  ]?.firstElementChild?.className.split(" ")[0];

                const trChild = {
                  td: {
                    type:
                      (TdDivClassName == "dateInput" && "DATE_INPUT") ||
                      (TdDivClassName == "textInput" && "TEXT_INPUT") ||
                      (TdDivClassName == "imageInput" && "IMAGE_INPUT") ||
                      (TdDivClassName == "signInput" && "SIGN_INPUT"),
                    // if(){
                    data:
                      TdDivClassName == "imageInput"
                        ? tableChildren[i].children[j]?.firstElementChild.style
                            .backgroundImage
                        : tableChildren[i].children[j]?.firstElementChild
                            ?.innerHTML,
                    id: `tableTd${j + 1}`,
                  },
                };

                newTableTR.push(trChild);
              }
              tableTR.tr = newTableTR;
              allTableCCells.push(tableTR);
            }
            // console.log("allTableCCells", allTableCCells);
            return allTableCCells;
          }
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: tables[t].parentElement.style.top,
            left: tempPosn.left,
            type: "TABLE_INPUT",
            // start work here
            // data: tables[t].firstElementChild.innerHTML,
            data: getChildData(),
            border: `${tableBorderSize} dotted ${tableBorderColor}`,
            tableBorder: tables[t].parentElement.style.border,
            id: `tab${t + 1}`,
          };
          // dataInsertWithPage(tempPosn, elem);
          const pageNum = findPaageNum(tables[t]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const containerElements = document.getElementsByClassName("containerInput");

    if (containerElements.length) {
      for (let h = 0; h < containerElements.length; h++) {
        if (
          containerElements[h]?.parentElement?.classList?.contains("holderDIV")
        ) {
          let tempElem = containerElements[h].parentElement;
          let tempPosn = getPosition(tempElem);

          function getChildData() {
            const allContainerChildren = [];
            const containerChildren = containerElements[h].children;

            for (let i = 0; i < containerChildren.length; i++) {
              const element = containerChildren[i];

              let tempPosnChild = getPosition(element);
              const containerChildClassName =
                containerChildren[i].firstElementChild?.className.split(" ")[0];
              const childData = {};
              childData.width = tempPosnChild.width;
              childData.height = tempPosnChild.height;
              childData.top = tempPosnChild.top;
              childData.topp = element.style.top;
              childData.left = tempPosnChild.left;

              let type = "";

              switch (containerChildClassName) {
                case "dateInput":
                  type = "DATE_INPUT";
                  break;
                case "textInput":
                  type = "TEXT_INPUT";
                  break;
                case "imageInput":
                  type = "IMAGE_INPUT";
                  break;
                case "signInput":
                  type = "SIGN_INPUT";
                  break;
                case "iframeInput":
                  type = "IFRAME_INPUT";
                  break;
                case "scaleInput":
                  type = "SCALE_INPUT";
                  break;
                case "newScaleInput":
                  type = "NEW_SCALE_INPUT";
                  break;
                case "buttonInput":
                  type = "BUTTON_INPUT";
                  break;
                case "dropdownInput":
                  type = "DROPDOWN_INPUT";
                  break;
                case "cameraInput":
                  type = "CAMERA_INPUT";
                  break;
                default:
                  type = "";
              }

              childData.type = type;
              const imageData =
                "imageInput" &&
                element?.firstElementChild?.style?.backgroundImage
                  ? element.firstElementChild.style.backgroundImage
                  : element.firstElementChild?.innerHTML;
              if (type != "TEXT_INPUT") {
                childData.data = imageData;
              }
              if (type == "TEXT_INPUT") {
                childData.data = element.firstElementChild?.innerText;
                childData.raw_data = element.firstElementChild?.innerHTML;
              }

              childData.id = `${containerChildClassName[0]}${h + 1}`;
              allContainerChildren.push(childData);
            }

            return allContainerChildren;
          }
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: containerElements[h].parentElement.style.top,
            left: tempPosn.left,
            type: "CONTAINER_INPUT",
            border: `${containerBorderSize} dotted ${containerBorderColor}`,
            containerBorder: containerElements[h].parentElement.style.border,
            data: getChildData(),
            id: `c${h + 1}`,
          };

          const pageNum = findPaageNum(containerElements[h]);
          page[0][pageNum].push(elem);
        }
      }
    }
    const iframes = document.getElementsByClassName("iframeInput");
    if (iframes.length) {
      for (let i = 0; i < iframes.length; i++) {
        if (
          !iframes[i]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = iframes[i].parentElement;
          let tempPosn = getPosition(tempElem);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: iframes[i].parentElement.style.top,
            left: tempPosn.left,
            type: "IFRAME_INPUT",
            border: `${iframeBorderSize} dotted ${iframeBorderColor}`,
            iframeBorder: iframes[i].parentElement.style.border,
            data: iframes[i].innerText
              ? "iFrame here"
              : iframes[i].firstElementChild.src,
            id: `ifr${i + 1}`,
          };

          const pageNum = findPaageNum(iframes[i]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const scales = document.getElementsByClassName("scaleInput");
    if (scales.length) {
      for (let s = 0; s < scales.length; s++) {
        if (
          !scales[s]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = scales[s].parentElement;
          let tempPosn = getPosition(tempElem);
          console.log(scales[s].firstElementChild);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: scales[s].parentElement.style.top,
            left: tempPosn.left,
            type: "SCALE_INPUT",
            border: `${scaleBorderSize} dotted ${scaleBorderColor}`,
            scaleBorder: scales[s].parentElement.style.border,
            data: `${title}_scale_${s + 1}`,
            scale_url: scales[s].firstElementChild.src,
            scaleId: tempElem.children[1].innerHTML,
            id: `scl${s + 1}`,
            details:
              decoded.details.action === "document"
                ? "Document instance"
                : "Template scale",
          };

          const pageNum = findPaageNum(scales[s]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const newScales = document.getElementsByClassName("newScaleInput");
    if (newScales.length) {
      for (let b = 0; b < newScales.length; b++) {
        if (
          !newScales[b]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = newScales[b].parentElement;

          let tempPosn = getPosition(tempElem);
          console.log(newScales[b]);
          let circles = newScales[b].querySelector(".circle_label");
          let scaleBg = newScales[b].querySelector(".label_hold");
          let leftChild = newScales[b].querySelector(".left_child");
          let neutralChild = newScales[b].querySelector(".neutral_child");
          let rightChild = newScales[b].querySelector(".right_child");
          let scaleText = newScales[b].querySelector(".scale_text");

          let font = newScales[b].querySelector(".scool_input");
          let scaleID = newScales[b].querySelector(".scaleId");
          console.log(font);

          let properties = {
            scaleBgColor: scaleBg.style.backgroundColor,
            fontColor: font.style.color,
            fontFamily: font.style.fontFamily,
            left: leftChild.textContent,
            center: neutralChild.textContent,
            right: rightChild.textContent,
            buttonColor: circles.style.backgroundColor,
            scaleID: scaleID.textContent,
            scaleText: scaleText.textContent,
          };
          console.log(properties);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: newScales[b].parentElement.style.top,
            left: tempPosn.left,
            type: "NEW_SCALE_INPUT",
            data: `${title}_scale_${b + 1}`,

            raw_data: properties,

            id: `scl${b + 1}`,
          };
          console.log(elem);
          const pageNum = findPaageNum(newScales[b]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const imageCanva = document.getElementsByClassName("cameraInput");
    if (imageCanva.length) {
      for (let b = 0; b < imageCanva.length; b++) {
        if (
          !imageCanva[b]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = imageCanva[b].parentElement;

          let tempPosn = getPosition(tempElem);
          console.log(imageCanva[b]);
          let imageLinkHolder = imageCanva[b].querySelector(".imageLinkHolder");
          let videoLinkHolder = imageCanva[b].querySelector(".videoLinkHolder");

          let properties = {
            imageLinkHolder: imageLinkHolder.textContent,
            videoLinkHolder: videoLinkHolder.textContent,
          };
          console.log(properties);
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: imageCanva[b].parentElement.style.top,
            left: tempPosn.left,
            type: "CAMERA_INPUT",
            raw_data: properties,
            id: `cam1${b + 1}`,
          };
          console.log(elem);
          const pageNum = findPaageNum(imageCanva[b]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const buttons = document.getElementsByClassName("buttonInput");
    if (buttons.length) {
      for (let b = 0; b < buttons.length; b++) {
        if (
          !buttons[b]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = buttons[b].parentElement;
          let tempPosn = getPosition(tempElem);
          const link = buttonLink;

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: buttons[b].parentElement.style.top,
            left: tempPosn.left,
            type: "BUTTON_INPUT",
            buttonBorder: `${buttonBorderSize}px dotted ${buttonBorderColor}`,
            data: buttons[b].textContent,
            raw_data: tempElem.children[1].innerHTML,
            purpose: tempElem.children[2].innerHTML,
            id: `btn${b + 1}`,
          };

          const pageNum = findPaageNum(buttons[b]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const dropDowns = document.getElementsByClassName("dropdownInput");

    if (dropDowns.length) {
      for (let d = 0; d < dropDowns.length; d++) {
        if (
          !dropDowns[d]?.parentElement?.parentElement?.classList?.contains(
            "containerInput"
          )
        ) {
          let tempElem = dropDowns[d].parentElement;
          let tempPosn = getPosition(tempElem);

          const selectElement = dropDowns[d].lastElementChild;
          const selectedOption =
            selectElement.options[selectElement.selectedIndex];
          const selectedText = selectedOption?.textContent;
          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: dropDowns[d].parentElement.style.top,
            left: tempPosn.left,
            type: "DROPDOWN_INPUT",
            border: `${dropdownBorderSize} dotted ${dropdownBorderColor}`,
            dropdownBorder: dropDowns[d].parentElement.style.border,
            data: selectedText,
            data1: dropDowns[d].firstElementChild.innerHTML,
            data2: dropDowns[d].lastElementChild.innerHTML,
            id: `dd${d + 1}`,
          };

          const pageNum = findPaageNum(dropDowns[d]);
          page[0][pageNum].push(elem);
        }
      }
    }

    const emails = document.getElementsByClassName("emailButton");
    if (emails.length) {
      for (let e = 0; e < emails.length; e++) {
        if (!emails[e]?.parentElement?.classList?.contains("containerInput")) {
          let tempElem = emails[e].parentElement;
          let tempPosn = getPosition(tempElem);

          elem = {
            width: tempPosn.width,
            height: tempPosn.height,
            top: tempPosn.top,
            topp: emails[e].parentElement.style.top,
            left: tempPosn.left,
            type: "FORM",
            data: emails[e].textContent,
            id: `eml${e + 1}`,
          };

          const pageNum = findPaageNum(emails[e]);
          page[0][pageNum].push(elem);
        }
      }
    }

    contentFile.push(page);

    return contentFile;
  }

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const link_idd = searchParams.get("link_id");

  var decoded = jwt_decode(token);

  const { action, authorized, process_id, user_type, document_map, _id, role } =
    decoded?.details;
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;
  const documentFlag = decoded?.details?.document_flag;
  const titleName = decoded?.details?.name;
  const finalDocName = decoded?.details?.update_field.document_name;

  const element_updated_length =
    document.getElementsByClassName("element_updated")?.length;
  const document_map_required = docMap?.filter((item) => item.required);

  useEffect(() => {
    if (document_map_required?.length > 0) {
      if (document_map_required?.length == element_updated_length) {
        setIsFinializeDisabled(false);
      }
    } else {
      setIsFinializeDisabled(false);
    }
  }, [element_updated_length]);

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const dataa = saveDocument();

    const finalize = document.getElementById("finalize-button");

    const titleName = document.querySelector(".title-name").innerHTML;

    const field = {
      _id: decoded.details._id,
    };
    let updateField = {};
    if (decoded.details.action === "template") {
      updateField = {
        template_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    } else if (decoded.details.action === "document") {
      updateField = {
        document_name: titleName,
        content: JSON.stringify(dataa),
        page: item,
      };
    }

    console.log(updateField);

    <iframe src="http://localhost:5500/"></iframe>;

    function sendMessage() {
      const message =
        decoded.details.action === "document"
          ? "Document saved"
          : "Template saved";
      const iframe = document.querySelector("iframe");
      iframe?.contentWindow?.postMessage(message, "*");
    }

    Axios.post(
      "https://100058.pythonanywhere.com/api/save-data-into-collection/",
      {
        cluster: decoded.details.cluster,
        collection: decoded.details.collection,
        command: decoded.details.command,
        database: decoded.details.database,
        document: decoded.details.document,
        field: field,
        function_ID: decoded.details.function_ID,
        team_member_ID: decoded.details.team_member_ID,
        update_field: updateField,
        page: item,
        // scale_url: `${scaleData}`,
        company_id: companyId,
        type: decoded.details.action,
      }
    )
      .then((res) => {
        if (res) {
          toast.success("Saved successfully");
          setIsLoading(false);
          if (finalize) {
            handleFinalize();
          }
          setIsDataSaved(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  // token creation code
  function base64url(source) {
    // Encode in classical base64
    var encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, "");

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, "-");
    encodedSource = encodedSource.replace(/\//g, "_");

    return encodedSource;
  }

  var header = {
    alg: "HS256",
    typ: "JWT",
  };

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  var encodedHeader = base64url(stringifiedHeader);

  var dataa = {
    document_id: decoded.details._id,
    action: actionName,
  };

  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(dataa));
  var encodedData = base64url(stringifiedData);

  var exportToken = encodedHeader + "." + encodedData;

  // token creation end

  const getPostData = async () => {
    const response = await Axios.post(
      "https://100058.pythonanywhere.com/api/get-data-from-collection/",
      {
        document_id: decoded.details._id,
        action: decoded.details.action,
        database: decoded.details.database,
        collection: decoded.details.collection,
        team_member_ID: decoded.details.team_member_ID,
        function_ID: decoded.details.function_ID,
        cluster: decoded.details.cluster,
        document: decoded.details.document,
      }
    )
      .then((res) => {
        // Handling title
        const loadedDataT = res.data;
        // console.log(res.data.content, "loaded");

        if (decoded.details.action === "template") {
          setTitle(loadedDataT.template_name);
        } else if (decoded.details.action === "document") {
          setTitle(loadedDataT.document_name);
        }

        //Handling content
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);

        setData(loadedData[0][0]);
        setIsDataRetrieved(true);

        setIsLoading(false);
        setFetchedData(loadedData[0][0]);

        //Handling company_id
        const company_id = res.data.company_id;
        setCompanyId(company_id);
        npsCustomData();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const npsCustomData = () => {
    console.log(decoded.details._id);
    Axios.post("https://100035.pythonanywhere.com/api/nps_custom_data_all", {
      template_id: decoded.details._id,
    })
      .then((res) => {
        console.log(res.data);
        const data = res.data.data;
        setCustomId(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getPostData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // isMenuVisible(false);
        setIsMenuVisible(true);
      }
    }
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // copy text function

  function copyText() {
    let div = document.querySelector(".token_text");
    let text = div.innerText;
    let textArea = document.createElement("textarea");
    textArea.width = "1px";
    textArea.height = "1px";
    textArea.background = "transparents";
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy"); //No i18n
    document.body.removeChild(textArea);
    toast("Text coppied", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  // copy text function end

  function handleToken() {
    setData([]);
    setIsDataRetrieved(false);
    setFetchedData([]);
    setIsLoading(true);
    var tokenn = prompt("Paste your token here");
    if (tokenn != null) {
      const decodedTok = jwt_decode(tokenn);
      console.log("tokkkkkkennn", tokenn);
      const getPostData = async () => {
        const response = await Axios.post(
          "https://100058.pythonanywhere.com/api/get-data-from-collection/",
          {
            document_id: decodedTok.document_id,
            action: decodedTok.action,
          }
        )
          .then((res) => {
            // Handling title
            const loadedDataT = res.data;
            console.log(res);

            if (decoded.details.action === "template") {
              setTitle("Untitle-File");
            } else if (decoded.details.action === "document") {
              setTitle("Untitle-File");
            }

            //Handling content
            const loadedData = JSON.parse(res.data.content);
            const pageData = res.data.page;
            setItem(pageData);
            console.log(loadedData);
            console.log(loadedData[0][0]);
            setData(loadedData[0][0]);
            setFetchedData(loadedData[0][0]);
            setIsDataRetrieved(true);
            // setSort(loadedData[0][0]);
            setIsLoading(false);
            setFetchedData(loadedData[0][0]);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      };
      getPostData();
    }
  }

  // console.log('page count check', item);
  const linkId = decoded.details.link_id;

  function handleFinalize() {
    setIsLoading(true);
    const finalize = document.getElementById("finalize-button");
    const reject = document.getElementById("reject-button");
    Axios.post(
      // `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize/`,
      `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize-or-reject/`,
      {
        user_type: user_type,
        link_id: link_idd,
        action: "finalized",

        authorized: authorized,

        item_type: action,
        item_id: _id,
        company_id: companyId,
        role: role,
      }
    )
      .then((res) => {
        console.log("This is my response", res);
        setIsLoading(false);
        toast.success(res?.data);
        finalize.style.visibility = "hidden";
        reject.style.visibility = "hidden";
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err);
        // alert(err?.message);
      });
  }

  function handleReject() {
    setIsLoading(true);
    Axios.post(
      // `https://100094.pythonanywhere.com/v1/processes/${process_id}/reject/`,
      `https://100094.pythonanywhere.com/v1/processes/${process_id}/finalize-or-reject/`,
      {
        action: "rejected",
        // item_id: process_id,
        authorized: authorized,
        // document_id: _id,
        item_type: action,
        item_id: _id,
        company_id: companyId,
        role: role,
        user_type: user_type,
        link_id: link_idd,
      }
    )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        // alert(res?.data);
        toast.error(res?.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err);
      });
  }
  const hanldePrint = (e) => {
    window.print();
    // bodyEl.style.display = "block";
  };

  //Event handler for pdf print
  const handlePDFPrint = async () => {
    const allScales = document.querySelectorAll(".newScaleInput");
    for (let i = 0; i <= Array.from(allScales).length; i++) {
      if (Array.from(allScales)[i]) {
        let res = await generateImage(Array.from(allScales)[i]);
        Array.from(allScales)[i].setAttribute("snapshot", res);
      }
    }
    const containerAll = document.querySelectorAll(".midSection_container");
    const fileName = document.querySelector(".title-name").innerText;
    downloadPDF(Array.from(containerAll), fileName);
  };

  return (
    <div
      className={`header ${
        actionName == "template" ? "header_bg_template" : "header_bg_document"
      }`}
    >
      <Container fluid>
        <Row>
          <Col className="d-flex lhs-header">
            <div className="header_icons position-relative">
              <CgMenuLeft className="head-bar" onClick={handleOptions} />
              {isMenuVisible && (
                <div
                  ref={menuRef}
                  className={`position-absolute bg-white d-flex flex-column p-4 bar-menu menu ${
                    isMenuVisible ? "show" : ""
                  }`}
                >
                  <div className="d-flex cursor_pointer" onClick={handleUndo}>
                    <ImUndo />
                    <p>Undo</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleRedo}>
                    <ImRedo />
                    <p>Redo</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleUndo}>
                    {/* handleCut */}
                    <BiCut />
                    <p>Cut</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleCopy}>
                    <BiCopyAlt />
                    <p>Copy</p>
                  </div>
                  <div className="d-flex cursor_pointer" onClick={handleRedo}>
                    {/* handlePaste */}
                    <ImPaste />
                    <p>Paste</p>
                  </div>
                  <div
                    className="d-flex cursor_pointer"
                    onClick={() => handlePDFPrint()}
                  >
                    <p>
                      <AiFillPrinter /> Print
                    </p>
                  </div>

                  {actionName == "template" && (
                    <button
                      className="page_btn p-0 d-flex"
                      onClick={() => createNewPage()}
                    >
                      <MdOutlinePostAdd />
                      <p>Add Page</p>
                    </button>
                  )}
                  {actionName == "template" && (
                    <button
                      className="page_btn p-0 d-flex"
                      onClick={() => removePage()}
                    >
                      <CgPlayListRemove />
                      <p>Remove Page</p>
                    </button>
                  )}
                  <button className="page_btn p-0 d-flex" onClick={handleToken}>
                    <BiImport />
                    <p>Import</p>
                  </button>
                  <button
                    className="d-flex page_btn p-0"
                    id="saving-button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <BiExport />
                    <p>Export</p>
                  </button>
                </div>
              )}
            </div>

            <div className="d-flex align-items-center gap-2 header_p">
              <div
                className="title-name px-3"
                contentEditable={true}
                style={{ fontSize: 24 }}
                spellCheck="false"
                ref={inputRef}
              >
                {docMap ? finalDocName : titleName}
              </div>
              <FaPen className="cursor-pointer" onClick={handleTitle} />
            </div>
          </Col>

          <Col>
            <div className="right_header">
              <div className={docMap ? "header_btn" : "savee"}>
                <Button
                  size="md"
                  className="rounded"
                  id="saving-buttonn"
                  onClick={submit}
                  style={{
                    visibility: documentFlag && "hidden",
                  }}
                >
                  Save <FaSave color="white" />
                </Button>
                {/*  )} */}
              </div>
              <div className="mt-1 text-center p-2">
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Token
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body token_text">{exportToken}</div>
                      <div className="modal-footer head">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={copyText}
                          type="button"
                          data-bs-dismiss="modal"
                          className="copyBtnn btn btn-primary"
                        >
                          <FaCopy className="me-2" color="white" size={32} />
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {actionName == "document" && docMap && data != "" && (
                <>
                  <div className="mt-2 text-center mb-2 px-2">
                    <Button
                      variant="success"
                      size="md"
                      className="rounded px-4"
                      id="finalize-button"
                      disabled={isFinializeDisabled}
                      onClick={submit}
                      style={{
                        visibility:
                          documentFlag == "processing" ? "visible" : "hidden",
                      }}
                    >
                      Finalize
                    </Button>
                  </div>

                  <div className="mt-2 text-center mb-2 px-2">
                    <Button
                      variant="danger"
                      size="md"
                      className="rounded px-4"
                      id="reject-button"
                      onClick={handleReject}
                      style={{
                        visibility:
                          documentFlag == "processing" ? "visible" : "hidden",
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </>
              )}
            </div>
            <ToastContainer size={5} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
