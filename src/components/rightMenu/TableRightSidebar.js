import React, { useEffect, useState } from "react";
import deleteSVG from "../../assets/tableicons/delete-button-svgrepo-com.svg"
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import { Row, Button, Form, DropdownButton, Dropdown } from "react-bootstrap";

import { useStateContext } from "../../contexts/contextProvider";
import { table_dropdown_focuseddClassMaintain } from "../../utils/focusClassMaintain/focusClass";
// import { CgMenuCheese } from "react-icons/cg";

const TableRightSidebar = () => {
  const {
    isDropped,
    setIsClicked,
    setSidebar,
    handleClicked,
    startDate,
    signState,
    bold,
    italic,
    underline,
    strikethrough,
    setStartDate,
    setMethod,
    setRightSideDateMenu,
    focuseddClassMaintain,
    tableBorderSize,
    setTableBorderSize,
    tableBorderColor,
    setTableBorderColor,
    setConfirmRemove, confirmRemove
    // handleDropp,
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  // const [borderSize, setBorderSize] = useState(1);
  // const [borderColor, setBorderColor] = useState("#000000");
  const [showSlider, setShowSlider] = useState(false);

  const [isDisableTableRightMenu, setIsDisableTableRightMenu] = useState(false);
  const [isCreateTableBtnDisabled, setIsCreateTableBtnDisabled] =
    useState(false);

  useEffect(() => {
    const focusseddDiv = document.querySelector(".focussedd");
    if (focusseddDiv?.firstChild?.hasChildNodes() && !(focusseddDiv?.firstChild?.children[0].classList.contains('placeholder') && focusseddDiv?.firstChild?.children.length === 1)) {
      setIsCreateTableBtnDisabled(true);
    } else {
      setIsCreateTableBtnDisabled(false);
    }
    // if (
    //   focusseddDiv?.firstChild?.hasChildNodes() &&
    //   focusseddDiv?.firstChild?.firstChild?.classList?.contains(
    //     "row_col_add_div"
    //   )
    // ) {
    //   setIsDisableTableRightMenu(true);
    // }
  }, [isCreateTableBtnDisabled]);

  const handleDropp = (e) => {
    // e.preventDefault();
    if (
      e.target.childNodes.length < 2 &&
      !e.target.classList.contains("imageInput")
    ) {
      e.target.style.border = "1px solid black";
    }
    if (e.target.classList.contains("imageInput")) {
      e.target.style.border = "none";
    }
    const typeOfOperation = e.dataTransfer.getData("text/plain");
    // console.log("cell has been dropped on " + typeOfOperation);
    // // console.log("e.target", e.target, e.target.hasChildNodes());
    // if (
    //   e.target.childNodes.length < 2 &&
    //   !e.target.classList.contains("imageInput")
    // ) {
    if (typeOfOperation === "TEXT_INPUT") {
      let inputField = document.createElement("div");
      const targetTable = e.target.parentElement.parentElement
      const textId = targetTable.querySelectorAll(".textInput").length + 1
      //  inputField.setAttribute('draggable', true);

      inputField.setAttribute("contenteditable", true);
      inputField.id = `${targetTable.id}t${textId}`
      inputField.className = "textInput";
      inputField.innerHTML = "Enter text here";
      inputField.style.width = "100%";
      inputField.style.height = "100%";
      inputField.style.resize = "none";
      inputField.style.backgroundColor = "#0000";
      inputField.style.borderRadius = "0px";
      inputField.style.outline = "0px";
      inputField.style.overflow = "overlay";
      inputField.style.position = "relative";
      inputField.style.cursor = "text";
      inputField.onclick = (e) => {
        if (inputField) {
          //   handleClicked("align2", "table2");
          //   setSidebar(true);
          //   e.stopPropagation();
          // }
          e.stopPropagation();
          focuseddClassMaintain(e);
          handleClicked("align2", "table2");
          setSidebar(true);
        }
      };

      e.target.append(inputField);
    }
    else if (typeOfOperation === "IMAGE_INPUT") {
      const targetTable = e.target.parentElement.parentElement
      const imageId = targetTable.querySelectorAll(".textInput").length + 1
      let imageField = document.createElement("div");

      imageField.className = "imageInput";
      imageField.style.width = "100%";
      imageField.style.height = "100%";
      imageField.style.backgroundColor = "#0000";
      imageField.style.borderRadius = "0px";
      imageField.style.outline = "0px";
      imageField.style.overflow = "overlay";
      imageField.innerHTML = "Image here";
      imageField.style.position = "relative";
      imageField.id = `${targetTable.id}i${imageId}`

      imageField.onclick = (e) => {
        if (imageField) {
          handleClicked("image2", "table2");
          setSidebar(true);
          e.stopPropagation();
          focuseddClassMaintain(e);
        }
      };
      const imageButtonContainer = document.createElement("div");
      imageButtonContainer.className = "addImageButton";
      imageButtonContainer.innerText = "Choose File";
      imageButtonContainer.style.display = "none";
      // imageButtonContainer.onclick = (e) => chooseFileClick(e);

      const imgBtnContainer = document.createElement("input");
      imgBtnContainer.className = "addImageButtonInput";
      imgBtnContainer.id = id;
      imgBtnContainer.type = "file";
      imgBtnContainer.style.objectFit = "cover";
      var uploadedImage = "";

      imgBtnContainer.addEventListener("input", (e) => {
        const reader = new FileReader();
        const targetId = e.target.id;
        // console.log("from input:", targetId);

        reader.addEventListener("load", () => {
          const uploadedImage = reader.result;
          document.getElementById(targetId).style.backgroundImage = `url(${uploadedImage})`;
        });
        reader.readAsDataURL(e.target.files[0]);
      });



      imageButtonContainer.append(imgBtnContainer);
      e.target.append(imageField);
      e.target.append(imageButtonContainer);
    }
    // else if (
    //   typeOfOperation === "IMAGE_INPUT"
    //   //  &&
    //   // decoded.details.action === "template"
    // ) {
    //   let imageField = document.createElement("div");
    //   imageField.className = "imageInput";
    //   imageField.style.minHeight = "100%";
    //   imageField.style.minWidth = "100%";
    //   imageField.style.backgroundColor = "#0000";
    //   imageField.style.borderRadius = "0px";
    //   imageField.style.outline = "0px";
    //   imageField.style.overflow = "overlay";
    //   // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
    //   imageField.style.position = "relative";
    //   // imageField.innerHTML = "Image here";
    //   imageField.onclick = (e) => {
    //     // table_dropdown_focuseddClassMaintain(e);
    //     // imageField.classList.add("focussed");
    //     focuseddClassMaintain(e);
    //     // imageFocuseddClassMaintain(e);
    //     e.preventDefault();
    //     handleClicked("image2", "table2");
    //     // handleClicked("image2");
    //     setSidebar(true);
    //     // // console.log("imageclick test", e.target);
    //     e.stopPropagation();
    //   };

    //   const imageButton = document.createElement("div");
    //   imageButton.className = "addImageButton";
    //   imageButton.innerText = "Choose File";
    //   imageButton.style.display = "none";
    //   // imageButton.onclick = (e) => chooseFileClick(e);

    //   const imgBtn = document.createElement("input");
    //   imgBtn.className = "addImageButtonInput";
    //   imgBtn.type = "file";
    //   imgBtn.style.objectFit = "cover";
    //   var uploadedImage = "";

    //   imgBtn.addEventListener("input", () => {
    //     const reader = new FileReader();

    //     reader.addEventListener("load", () => {
    //       uploadedImage = reader.result;
    //       document.querySelector(
    //         ".focussed"
    //       ).style.backgroundImage = `url(${uploadedImage})`;
    //     });
    //     reader.readAsDataURL(imgBtn.files[0]);
    //     // // console.log("baprebap", document.querySelector(".focussed"));
    //     // document.querySelector(".focussed").innerHTML = null;
    //   });

    //   // if (uploadedImage) {
    //   // // console.log("imageField", imageField, uploadedImage);
    //   // }
    //   // imgBtn.style.width = "100%";
    //   imageButton.append(imgBtn);
    //   e.target.append(imageField);
    //   e.target.append(imageButton);
    //   e.target.style.width = imageField.style.width;
    // } else if (typeOfOperation === "TEXT_FILL") {
    //   let texttField = document.createElement("textarea");
    //   texttField.className = "texttInput";
    //   texttField.placeholder = "input text here";
    //   texttField.style.width = "100%";
    //   texttField.style.height = "100%";
    //   texttField.style.resize = "none";
    //   texttField.style.backgroundColor = "#0000";
    //   texttField.style.borderRadius = "0px";
    //   texttField.style.outline = "0px";
    //   texttField.style.overflow = "overlay";
    //   // texttField.innerText = `${postData.textField.value}`
    //   texttField.style.position = "relative";

    //   e.target.append(texttField);
    // } else if (typeOfOperation === "FORM") {
    //   let texttField = document.createElement("div");
    //   texttField.className = "texttField";
    //   texttField.style.width = "100%";
    //   texttField.style.height = "30vh";
    //   texttField.style.position = "relative";
    //   e.target.append(texttField);
    // } 
    else if (typeOfOperation === "SIGN_INPUT") {
      // {
      //   let signField = document.createElement("div");
      //   signField.className = "signInput";
      //   signField.style.width = "100%";
      //   signField.style.height = "100%";
      //   signField.style.backgroundColor = "#0000";
      //   signField.style.borderRadius = "0px";
      //   signField.style.outline = "0px";
      //   signField.style.overflow = "overlay";
      //   signField.innerHTML = "Signature here";
      //   signField.style.position = "absolute";

      //   signField.onclick = (e) => {
      //     // focuseddClassMaintain(e);
      //     if (signField) {
      //       // signField.classList.add("focussed");
      //       handleClicked("signs2", "table2");
      //       setSidebar(true);
      //       e.stopPropagation();
      //     } else {
      //       setSidebar(false);
      //     }
      //   };
      //   e.target.append(signField);
      //   // document.getElementsByClassName("dropp").item(0).append(signField);
      // }
      let signField = document.createElement("div");
      const targetTable = e.target.parentElement.parentElement
      console.log("TARGET TABLE ", targetTable);
      const signId = `s${(targetTable.querySelectorAll(".signInput").length + 1)}`
      signField.className = "signInput";
      signField.style.width = "100%";
      signField.style.height = "100%";
      signField.style.backgroundColor = "#0000";
      signField.style.borderRadius = "0px";
      signField.style.outline = "0px";
      signField.style.overflow = "overlay";
      signField.innerHTML = "signature here";
      signField.style.position = "absolute";
      signField.style.top = 0;
      signField.style.left = 0;
      signField.id = `${targetTable.id + signId}`;

      // signField.onchange = (event) => {
      //   event.preventDefault();
      //   setPostData({
      //     ...postData,
      //     signField: {
      //       value: event.target.value,
      //       xcoordinate: getOffset(holderDIV).left,
      //       ycoordinate: getOffset(holderDIV).top,
      //     },
      //   });
      // };

      signField.onclick = (e) => {
        focuseddClassMaintain(e);
        // if (actionName != "template") {
        // signField.classList.add("focussed");
        // handleClicked("signs2");
        // setSidebar(true);
        handleClicked("signs2", "table2");
        setSidebar(true);
        e.stopPropagation();
        // } else {
        //   setSidebar(false);
        // }
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

        reader.addEventListener("load", () => {
          uploadedImage = reader.result;
          const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
          document.querySelector(".focussed").innerHTML = signImage;
        });
        reader.readAsDataURL(signBtn.files[0]);
      });

      imageSignButton.append(signBtn);

      // const para = document.createElement("p");
      // para.innerHTML = "Place your signature here";
      // signField.append(para);
      e.target.append(signField);
      e.target.append(imageSignButton);
    }
    else if (typeOfOperation === "DATE_INPUT") {
      let dateField = document.createElement("div");
      const targetTable = e.target.parentElement.parentElement
      const dateId = targetTable.querySelectorAll(".dateInput").length + 1
      dateField.className = "dateInput";
      dateField.style.width = "100%";
      dateField.style.height = "100%";
      dateField.style.backgroundColor = "#0000";
      dateField.style.borderRadius = "0px";
      dateField.style.outline = "0px";
      dateField.style.overflow = "overlay";
      dateField.style.position = "relative";
      dateField.id = `${targetTable.id}d${dateId}`;

      setStartDate(new Date());
      setMethod("select");

      function dateClick() {
        document.getElementById("date_picker").click();
        setRightSideDateMenu(false);
      }
      dateField.onclick = (e) => {
        focuseddClassMaintain(e);
        handleClicked("calendar2");
        setRightSideDateMenu(false);
        if (e.target.innerText != "mm/dd/yyyy") {
          if (e.target.innerText.includes("/")) {
            const setDate = new Date(e.target.innerText);
            setMethod("first");
            setStartDate(setDate);
          } else {
            if (e.target.innerText.includes("-")) {
              setMethod("fourth");
            } else {
              setMethod("second");
            }
            const setDate = new Date(e.target.innerText);
            setStartDate(setDate);
          }
        }
        setSidebar(true);
        setTimeout(dateClick, 0);
        e.stopPropagation();
      };
      dateField.innerText = "mm/dd/yyyy";

      // dateField.append(para)
      e.target.append(dateField);
      //// console.log(para);
    }
    // }
  };

  const createIconMenu = () => {
    const iconDiv = document.createElement("div");
    iconDiv.className = "icon_div";
    iconDiv.style.textAlign = "right";
    iconDiv.style.position = "absolute";
    iconDiv.style.top = "0px";
    iconDiv.style.right = "0px";
    iconDiv.style.zIndex = "2";
    iconDiv.style.padding = "0px 5px";
    iconDiv.style.marginTop = "0px";
    iconDiv.style.width = "25px";
    iconDiv.style.borderBottomLeftRadius = "2px";
    iconDiv.style.backgroundColor = "#00d3b0";
    iconDiv.style.display = "none";
    iconDiv.innerHTML =
      '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H4C3.44772 7 3 6.55228 3 6Z" fill="currentColor"></path><path d="M3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z" fill="currentColor"></path><path d="M3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H10.2625L7.61456 15.6479L4.96662 13H4C3.44772 13 3 12.5523 3 12Z" fill="currentColor"></path></svg>';
    iconDiv.style.cursor = "pointer";
    iconDiv.onclick = habdleTableUpdateBtn;
    return iconDiv;
  };

  function habdleTableUpdateBtn(e) {
    table_dropdown_focuseddClassMaintain(e);
    const editableTable = findEditableTable();
    const focussedDiv = document.querySelector(".focussedd");
    const icon_div = document.querySelector(".icon_div");
    const cells_menu = document.querySelector(".cells_menu");
    var notes = null;
    for (var i = 0; i < cells_menu.childNodes.length; i++) {
      if (cells_menu.childNodes[i].className == "table_menu_update") {
        notes = cells_menu.childNodes[i];
        break;
      }
    }
    // // console.log("onmouse leave", notes, cells_menu.childNodes.length);
    if (!notes) {
      focussedDiv.style.border = "none";
      editableTable.parentElement.classList.add("over_flow_maintainer");
      const tableMenuParentDiv = document.createElement("div");

      const insertRabove = document.createElement("div");
      insertRabove.style.cursor = "pointer";
      insertRabove.innerHTML = "<strong> + </strong> Insert Row Above";
      insertRabove.onclick = (e) => {
        handleAddRow(e, "above");
      };
      const insertRbelow = document.createElement("div");
      insertRbelow.style.cursor = "pointer";

      insertRbelow.innerHTML = "<strong> + </strong> Insert Row Below";
      insertRbelow.onclick = (e) => {
        handleAddRow(e, "below");
      };
      const insertColToLeft = document.createElement("div");
      insertColToLeft.style.cursor = "pointer";

      insertColToLeft.innerHTML = "<strong> + </strong> Insert Col to Left";
      insertColToLeft.onclick = (e) => {
        handleAddColumn(e, "left");
      };
      const insertColToRight = document.createElement("div");
      insertColToRight.style.cursor = "pointer";

      insertColToRight.innerHTML = "<strong> + </strong> Insert Col to Right";
      insertColToRight.onclick = (e) => {
        handleAddColumn(e, "right");
      };

      const hrParentDiv = document.createElement("div");
      const hrElement = document.createElement("hr");
      hrParentDiv.appendChild(hrElement);

      const hrParentDivMid = document.createElement("div");
      const hrElementMid = document.createElement("hr");
      hrParentDivMid.appendChild(hrElementMid);

      const deleteRow = document.createElement("div");
      deleteRow.style.cursor = "pointer";

      deleteRow.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Row</span>';
      deleteRow.onclick = handleDeleteRow;

      const deleteColumn = document.createElement("div");
      deleteColumn.style.cursor = "pointer";

      deleteColumn.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Column</span>';
      deleteColumn.onclick = handleDeleteCol;

      const deleteTable = document.createElement("div");
      deleteTable.innerHTML =
        '<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z" fill="currentColor"></path><path d="M9 9H11V17H9V9Z" fill="currentColor"></path><path d="M13 9H15V17H13V9Z" fill="currentColor"></path></svg> <span class="remove-svg-margin">Delete Table</span>';
      deleteTable.onclick = removeTable;

      const hrParentDivBottom = document.createElement("div");
      const hrElementBottom = document.createElement("hr");
      hrParentDivBottom.appendChild(hrElementBottom);

      tableMenuParentDiv.prepend(
        hrParentDiv,
        insertRabove,
        insertRbelow,
        insertColToLeft,
        insertColToRight,
        hrParentDivMid,
        deleteRow,
        deleteColumn,
        deleteTable,
        hrParentDivBottom
      );

      tableMenuParentDiv.className = "table_menu_update";
      tableMenuParentDiv.style.backgroundColor = "#fff";
      tableMenuParentDiv.style.borderRadius = "10px";
      tableMenuParentDiv.style.boxShadow = "0px 1px 10px";
      tableMenuParentDiv.style.width = "185px";
      tableMenuParentDiv.style.position = "absolute";
      tableMenuParentDiv.style.right = "15px";
      tableMenuParentDiv.style.top = "15px";
      tableMenuParentDiv.style.padding = "10px 15px";
      tableMenuParentDiv.style.textAlign = "left";
      tableMenuParentDiv.style.zIndex = 99999;
      cells_menu.appendChild(tableMenuParentDiv);
    } else {
      cells_menu.children[1].remove();
      editableTable.parentElement.classList.remove("over_flow_maintainer");
      focussedDiv.style.border = "2px solid orange";
    }
    e.stopPropagation();
  }

  //

  function makeTable() {
    const focussedDiv = document.querySelector(".focussedd");
    const dropArea = focussedDiv.parentElement
    const tableID = dropArea.querySelectorAll('table').length
    var table = document.createElement("table");
    table.style.border = "2";
    table.id = `T${(tableID + 1)}`;
    table.style.height = "100%"
    table.style.width = "100%"
    table.className = "droppable";
    var row = document.getElementById("rows").value;
    var col = document.getElementById("cols").value;

    var tableDiv = document.querySelector(".focussed");
    tableDiv.style.overflow = 'visible'

    // * This removes the placholder on the table element
    if (tableDiv.children[0].classList.contains('placeholder') && tableDiv.children.length === 1)
      tableDiv.removeChild(tableDiv.children[0])


    for (var rowIndex = 0; rowIndex < row; rowIndex++) {
      var tr = document.createElement("tr");

      for (var colIndex = 0; colIndex < col; colIndex++) {
        var td = document.createElement("td");
        td.className = "dropp";
        if (rowIndex === 0) {
          const resizer = document.createElement('div');
          resizer.classList.add('td-resizer');
          resizer.addEventListener("mousedown", (e) => {
            let x = 0;
            let w = 0;
          })
          createResizableColumn(td, resizer)
          td.appendChild(resizer);
        }
        tr.appendChild(td);
      }
      const rowResizeCell = tr.firstElementChild
      const resizer = document.createElement('div');
      resizer.classList.add('row-resizer');
      resizer.addEventListener("mousedown", (e) => {
        let x = 0;
        let w = 0;


      })
      rowResizeCell.appendChild(resizer)
      createResizableRow(rowResizeCell, resizer)
      table.appendChild(tr);

      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          // // console.log("Observing: ",entry.target);
          const width = entry.contentRect.width;
          const height = entry.contentRect.height;
          const table = entry.target
          const holderDIV = table.parentElement.parentElement

          setColRowSize(table, width, height, holderDIV)
          //  // console.log("called setcolrowsize");
        })
      })
      resizeObserver.observe(table)

      tableDiv.appendChild(table);
      setColRowSize(table);
      var tablee = document.querySelector(".focussed").firstElementChild;
      var cells = tablee.getElementsByTagName("td");

      for (var i = 0; i < cells.length; i++) {

        // cells[i].onmouseleave = function (e) {
        //   e.preventDefault();
        //   var notes = null;
        //   for (var i = 0; i < e.target.childNodes.length; i++) {
        //     if (e.target.childNodes[i].className == "table_menu_update") {
        //       notes = e.target.childNodes[i];
        //       break;
        //     }
        //   }
        //   if (notes) e.target.removeChild(notes);
        //   e.target.classList.remove("cells_menu");
        //   const editableTable = findEditableTable();
        //   editableTable.parentElement.classList.remove("over_flow_maintainer");
        //   focussedDiv.style.border = "2px solid orange";
        // };
        cells[i].ondragover = function (e) {
          e.preventDefault();
          // if (e.target.hasChildNodes()) {
          //   while (e.target.firstChild) {
          //     e.target.removeChild(e.target.firstChild);
          //   }
          // }
          e.target.classList.add("table_drag");
          if (e.target.childNodes.length < 2) {
            if (e.target.tagName.toLowerCase() == "td") {
              e.target.style.border = "3px solid blue";
            };
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        cells[i].ondragleave = (e) => {
          e.preventDefault();
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
          if (
            e.target.childNodes.length < 2 &&
            !e.target.classList.contains("imageInput")
          ) {
            if (e.target.tagName.toLowerCase() == "td") {
              e.target.style.border = "1px solid black";
            };
          }
        };

        // // console.log("cells[i]", cells[i].classList.contains("dropp"));

        cells[i].ondrop = handleDropp;
        document.getElementById("rows").value = "";
        document.getElementById("cols").value = "";
      }

      document.getElementById("rows").value = "";
      document.getElementById("cols").value = "";
    }

    // tableDiv?.parentElement?.prepend(iconDiv);
    setIsCreateTableBtnDisabled(true);
  }

  const setColRowSize = (table, width = null, height = null) => {
    const col_resizers = table.querySelectorAll('.td-resizer');
    const row_resizers = table.querySelectorAll('.row-resizer');
    for (const resizer of col_resizers) {
      if (height) {
        resizer.style.height = `${height}px`
        // // console.log("set height: ",height);
      } else {
        resizer.style.height = `${table.offsetHeight}px`

      }
    }
    for (const resizer of row_resizers) {
      if (width) {
        resizer.style.width = `${width}px`
        // // console.log("set witdh: ",width);
      } else {
        resizer.style.width = `${table.offsetWidth}px`
      }
    }

  }
  const createResizableRow = (row, resizer) => {
    // Track the current position of the mouse
    let y = 0;
    let h = 0;

    const mouseDownHandler = function (e) {
      const holderDiv = row.parentElement.parentElement.parentElement.parentElement
      holderDiv.removeAttribute('draggable');
      // Get the current mouse position
      y = e.clientY;

      // Calculate the current height of the row
      h = row.clientHeight;

      // Attach listeners for document's events
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // Determine how far the mouse has been moved
      const dy = e.clientY - y;

      // Update the height of the row
      row.style.height = `${h + dy}px`;
    };

    // When the user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  };

  const createResizableColumn = (col, resizer) => {
    // Track the current position of mouse
    let x = 0;
    let w = 0;

    const mouseDownHandler = function (e) {
      const holderDiv = col.parentElement.parentElement.parentElement.parentElement
      holderDiv.removeAttribute('draggable');
      // Get the current mouse position
      x = e.clientX;

      // Calculate the current width of column
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      // Attach listeners for document's events
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {

      // Determine how far the mouse has been moved
      const dx = e.clientX - x;

      // Update the width of column
      col.style.width = `${w + dx}px`;
    };

    // When user releases the mouse, remove the existing event listeners
    const mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  };

  const hadleTableUpdateSave = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    let updatedTable;
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      focusseddDiv?.firstElementChild?.firstElementChild?.remove();
      const trNum = focusseddDiv?.firstElementChild?.firstElementChild?.children;
      let isHeaderRow = true
      for (let i = 0; i < trNum.length; i++) {
        if (trNum[i].querySelector('.target-el') && isHeaderRow) {
          trNum[i].remove()
          isHeaderRow = false;
        }
        if (!isHeaderRow) {
          trNum[i].querySelectorAll('td').forEach(td => {
            if (td.querySelector('.target-el')) {
              td.remove();
            }
          })

        }
      }
      var tablee = focusseddDiv?.firstElementChild?.firstElementChild;
      var cells = tablee.getElementsByTagName("td");
      // // console.log("cells", tablee, cells);
      for (let i = 0; i < cells.length; i++) {
        // // console.log("cells", cells[i]);
        cells[i].onmouseover = function (e) {

          // // console.log("mouseOver", e.target);
        };
        cells[i].ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            if (e.target.tagName.toLowerCase() == "td") {
              e.target.style.border = "3px solid blue";
            };
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        cells[i].ondragleave = (e) => {
          e.preventDefault();
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
          if (
            e.target.childNodes.length < 2 &&
            !e.target.classList.contains("imageInput")
          ) {
            if (e.target.tagName.toLowerCase() == "td") {
              e.target.style.border = "1px solid black";
            };
          }
        };
        cells[i].ondrop = handleDropp;
      }
      e.target?.parentElement.remove();
      const updatedTable = tablee;
      const col_resizers = updatedTable.querySelectorAll('.td-resizer');
      const row_resizers = updatedTable.querySelectorAll('.row-resizer');
      for (const resizer of col_resizers) {
        resizer.style.height = `${updatedTable.offsetHeight}px`
      }
      for (const resizer of row_resizers) {
        resizer.style.width = `${updatedTable.offsetWidth}px`
      }
      setIsDisableTableRightMenu(false);
      e.stopPropagation();
    }
  };


  const addTableButtons = (focusseddDiv, table) => {
    if (focusseddDiv?.firstElementChild?.classList.contains("tableInput")) {
      var editDiv = document.createElement("div");
      editDiv.className = "row_col_add_div";
      var addRowBtn = document.createElement("BUTTON");
      addRowBtn.onclick = handleAddRowBelow;

      var addColBtn = document.createElement("BUTTON");
      addColBtn.onclick = addColumn;
      addRowBtn.className = "btn btn-primary me-3 my-3 target-el";
      addRowBtn.innerText = "Add Row";
      addColBtn.innerText = "Add Col";
      addColBtn.className = "btn btn-primary my-3 target-el";
      editDiv.appendChild(addRowBtn);
      editDiv.appendChild(addColBtn);
      editDiv.style.display = "flex";
      // editDiv.style.justifyContent = ""
      focusseddDiv?.firstElementChild?.prepend(editDiv);
      if (focusseddDiv?.firstElementChild?.children[1]) {
        const numOfTr =
          focusseddDiv?.firstElementChild?.children[1]?.rows?.length;
        const numOfTd =
          focusseddDiv?.firstElementChild?.children[1].querySelectorAll(
            "td"
          ).length;
        // const numOfROW = numOfTr;
        const numOfCol = numOfTd / numOfTr;
        var tr = document.createElement("tr");

        for (let i = 0; i < numOfCol; i++) {
          var td = document.createElement("td");
          td.className = "dropp";
          td.style.height = "50px";
          // if (rowIndex == 0 && colIndex != numOfCol) {
          const colDeleteBtn = document.createElement("button");
          colDeleteBtn.className = "btn btn-warning target-el";
          colDeleteBtn.style.marginLeft = "5px";
          const deleteIcon = `<img src="${deleteSVG}"/>`
          colDeleteBtn.innerHTML = deleteIcon
          colDeleteBtn.onclick = (e) => {
            e.stopPropagation();
            const index = Array.from(
              e.target.parentElement.parentElement.parentElement.children
            ).indexOf(e.target.parentElement.parentElement);

            const allTableRows = Array.from(document.querySelectorAll('table tr'));
            const tableRow = table.querySelector("tr");
            allTableRows.forEach(row => {
              const cells = Array.from(row.children);
              if (index >= 0 && index < cells.length) {
                cells[index].remove();
              }
            });
            if (tableRow.children.length === 0) {
              table.innerHTML = ''
            }

          };
          td.style.border = "none";
          td.appendChild(colDeleteBtn);
          tr.appendChild(td);
        }
        focusseddDiv?.firstElementChild?.children[1].prepend(tr);

        for (let rowIndex = 1; rowIndex < numOfTr + 1; rowIndex++) {
          for (let colIndex = 0; colIndex < numOfCol + 2; colIndex++) {
            // if (colIndex == numOfCol && rowIndex != 0) {
            var td = document.createElement("td");
            const rowDeleteBtn = document.createElement("button");
            rowDeleteBtn.className = "btn btn-warning target-el";
            rowDeleteBtn.style.marginLeft = "5px";
            const deleteIcon = `<img src="${deleteSVG}"/>`
            rowDeleteBtn.innerHTML = deleteIcon;
            rowDeleteBtn.onclick = (e) => {
              e.stopPropagation()
              let targetTableRow;;
              if (e.target.tagName.toLowerCase() === "img") {
                targetTableRow = e.target.parentElement.parentElement.parentElement
              } else if (e.target.tagName.toLowerCase() === "button") {
                targetTableRow = e.target.parentElement.parentElement
              }
              targetTableRow.remove()
              if (table.rows.length === 1) {
                table.innerHTML = ''
              }

            };
            td.style.border = "none";
            td.style.backgroundColor = "#fff";
            // td.style.background = "#fff";
            td.appendChild(rowDeleteBtn);
            // }
          }
          // // console.log("child element check", focusseddDiv?.firstElementChild);
          focusseddDiv?.firstElementChild?.children[1].childNodes[
            rowIndex
          ].appendChild(td);
        }
        // focusseddDiv?.firstElementChild?.firstElementChild.appendChild(tr);
      }
      var saveDiv = document.createElement("div");
      saveDiv.className = "table_update_save_div";
      var saveBtn = document.createElement("BUTTON");
      saveBtn.className = "btn btn-primary my-3";
      saveBtn.innerText = "Save Changes";
      saveBtn.onclick = hadleTableUpdateSave;
      saveDiv.appendChild(saveBtn);
      focusseddDiv?.firstElementChild?.appendChild(saveDiv);
    }
  }


  const updateTable = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");
    const currentTable = focusseddDiv.querySelector('table');
    focusseddDiv.querySelector('.tableInput').style.backgroundColor = 'white !important'
    focusseddDiv.style.overflow = 'visible';
    focusseddDiv.style.borderWidth = "0px";
    focusseddDiv.querySelector('.tableInput').style.backgroundColor = "#fff";
    // console.log(focusseddDiv.style.border)
    focusseddDiv.classList.remove('.dotted_border')
    const isUpdating = document.querySelector(".table_update_save_div"); // check if user is already editing
    if (isUpdating) return; //do nothing if user is editing
    addTableButtons(focusseddDiv, currentTable)
    setIsDisableTableRightMenu(true);
  };

  const handleAddRowBelow = (e) => {
    const focusseddDiv = document.querySelector(".focussedd");

    let findTArgetElement = focusseddDiv;
    const editableTable = findTArgetElement?.children[0].querySelector('table');
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = numOfTd / numOfTr;
    for (var rowIndex = 0; rowIndex < 1; rowIndex++) {
      var tr = document.createElement("tr");
      for (var colIndex = 1; colIndex < numOfCol; colIndex++) {
        // // console.log("numOfCol", numOfTr, numOfTd, numOfCol);
        var td = document.createElement("td");
        td.className = "dropp";

        td.ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (!e.target.hasChildNodes()) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        td.ondragleave = (e) => {
          e.preventDefault();
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
          if (
            e.target.childNodes.length < 2 &&
            !e.target.classList.contains("imageInput")
          ) {
            if (e.target.tagName.toLowerCase() == "td") {
              e.target.style.border = "1px solid black";
            };
          }
        };

        td.ondrop = handleDropp;
        if (colIndex === 1) {
          const resizer = document.createElement('div');
          resizer.classList.add('row-resizer');
          resizer.addEventListener("mousedown", (e) => {
            let x = 0;
            let w = 0;


          })
          td.appendChild(resizer);
          createResizableRow(td, resizer);
        }
        tr.appendChild(td);
      }
      const buttonTd = document.createElement("td");
      const rowDeleteBtn = document.createElement("button");
      rowDeleteBtn.className = "btn btn-warning target-el";
      rowDeleteBtn.style.marginLeft = "5px";
      const deleteIcon = `<img src="${deleteSVG}"/>`
      rowDeleteBtn.innerHTML = deleteIcon;
      rowDeleteBtn.onclick = (e) => {
        e.target?.parentElement?.parentElement?.remove();
        e.stopPropagation();
      };
      buttonTd.style.border = 'none';
      buttonTd.style.backgroundColor = '#fff';
      buttonTd.appendChild(rowDeleteBtn);
      tr.appendChild(buttonTd);
      editableTable.appendChild(tr);

    }
    e.stopPropagation();
    // }
  };

  const handleAddRow = (e, direction) => {
    const focussedDiv = document.querySelector(".focussedd");

    const editableTable = findEditableTable();
    const numOfTr = editableTable?.rows?.length;
    const numOfTd = editableTable.querySelectorAll("td").length;
    const numOfCol = numOfTd / numOfTr;
    for (var rowIndex = 0; rowIndex < 1; rowIndex++) {
      var tr = document.createElement("tr");
      for (var colIndex = 0; colIndex < numOfCol; colIndex++) {
        // // console.log("numOfCol", numOfTr, numOfTd, numOfCol);
        var td = document.createElement("td");
        td.className = "dropp";
        const iconMenu = createIconMenu();
        td.appendChild(iconMenu);
        // td.style.height = "50px";
        // if (colIndex == numOfCol - 1) {
        //   const rowDeleteBtn = document.createElement("button");
        //   rowDeleteBtn.className = "btn btn-warning";
        //   rowDeleteBtn.style.marginLeft = "5px";
        //   rowDeleteBtn.innerText = "Del Row";
        //   rowDeleteBtn.onclick = (e) => {
        //     e.target?.parentElement?.parentElement?.remove();
        //     e.stopPropagation();
        //   };
        //   td.style.border = "none";
        //   // td.style.background = "#fff";
        //   td.appendChild(rowDeleteBtn);
        // }
        td.onmouseover = function (e) {
          e.preventDefault();
          if (e.target.classList.contains("dropp"))
            e.target.classList.add("cells_menu");
        };
        td.onmouseleave = function (e) {
          e.preventDefault();
          var notes = null;
          for (var i = 0; i < e.target.childNodes.length; i++) {
            if (e.target.childNodes[i].className == "table_menu_update") {
              notes = e.target.childNodes[i];
              break;
            }
          }
          if (notes) e.target.removeChild(notes);

          e.target.classList.remove("cells_menu");
          const editableTable = findEditableTable();
          editableTable.parentElement.classList.remove("over_flow_maintainer");
          focussedDiv.style.border = "2px solid orange";
        };
        td.ondragover = function (e) {
          e.preventDefault();
          e.target.classList.add("table_drag");
          if (e.target.childNodes.length < 2) {
            e.target.style.border = "3px solid blue";
          }
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };
        td.ondragleave = (e) => {
          e.preventDefault();
          if (e.target.classList.contains("imageInput")) {
            e.target.style.border = "none";
          }
        };

        // // console.log("td", td.classList.contains("dropp"));
        td.ondrop = handleDropp;
        e.target.parentElement.prepend(td);
        tr.prepend(td);
      }
      // editableTable.prepend(tr);
      const AllTrOfEditableTable = editableTable.querySelectorAll("tr");
      let targetTr = null;
      for (let i = 0; i < AllTrOfEditableTable.length; i++) {
        if (
          AllTrOfEditableTable[i] ==
          e.target.parentElement.parentElement.parentElement
        ) {
          targetTr = i;
          // break;
        }
      }
      if (direction == "above") {
        editableTable.querySelectorAll("tr")[targetTr].before(tr);
      } else {
        editableTable.querySelectorAll("tr")[targetTr].after(tr);
      }
    }
    e.stopPropagation();
  };


  const addColumn = () => {
    const focusseddDiv = document.querySelector(".focussedd");

    let findTArgetElement = focusseddDiv;
    const editableTable = findTArgetElement.querySelector('table');

    const targetTR = editableTable.querySelectorAll('tr')
    targetTR.forEach((tr, i) => {
      if (i > 0) {
        const td = document.createElement('td')
        if (i == 1) {
          const resizer = document.createElement('div');
          resizer.classList.add('td-resizer');
          resizer.addEventListener("mousedown", (e) => {
            let x = 0;
            let w = 0;


          })
          td.appendChild(resizer);
          createResizableColumn(td, resizer)
        }
        tr.lastElementChild.insertAdjacentElement('beforebegin', td)
      } else {
        const td = document.createElement("td");
        td.className = "dropp";
        td.style.height = "50px";
        const colDeleteBtn = document.createElement("button");
        const deleteIcon = `<img src="${deleteSVG}"/>`
        colDeleteBtn.innerHTML = deleteIcon
        colDeleteBtn.className = "btn btn-warning target-el";
        colDeleteBtn.style.marginLeft = "5px";

        colDeleteBtn.onclick = (e) => {
          const index = Array.from(
            e.target.parentElement.parentElement.children
          ).indexOf(e.target.parentElement);
          const allTableTr =
            focusseddDiv?.firstElementChild?.children[1].querySelectorAll(
              "tr"
            );
          for (let i = 0; i < allTableTr.length; i++) {
            focusseddDiv?.firstElementChild?.children[1].querySelectorAll("tr")[i].childNodes[index].remove();
          }
          e.stopPropagation();
        };
        td.style.border = "none";
        td.appendChild(colDeleteBtn);
        tr.appendChild(td);
      }
    })
  }
  const handleAddColumn = (e, direction) => {
    const focussedDiv = document.querySelector(".focussedd");

    const editableTable = findEditableTable();
    const numOfTr = editableTable?.rows?.length;
    const numOfTdElement = editableTable.querySelectorAll("td");
    const numOfTd = numOfTdElement.length;
    const numOfCol = numOfTd / numOfTr;

    // // console.log("numOfTr", numOfTr, "numOfTd", numOfTd, "numOfCol", numOfCol);
    const AllTrOfEditableTable = editableTable.querySelectorAll("tr");

    const index = Array.from(
      e.target.parentElement.parentElement.parentElement.children
    ).indexOf(e.target.parentElement.parentElement);
    for (let i = 0; i < AllTrOfEditableTable.length; i++) {
      var td = document.createElement("td");
      td.className = "dropp";
      td.style.height = "50px";
      const iconMenu = createIconMenu();
      td.appendChild(iconMenu);
      td.onmouseover = function (e) {
        e.preventDefault();
        if (e.target.classList.contains("dropp"))
          e.target.classList.add("cells_menu");
      };
      td.onmouseleave = function (e) {
        e.preventDefault();
        var notes = null;
        for (var i = 0; i < e.target.childNodes.length; i++) {
          if (e.target.childNodes[i].className == "table_menu_update") {
            notes = e.target.childNodes[i];
            break;
          }
        }
        if (notes) e.target.removeChild(notes);

        e.target.classList.remove("cells_menu");
        const editableTable = findEditableTable();
        editableTable.parentElement.classList.remove("over_flow_maintainer");
        focussedDiv.style.border = "2px solid orange";
      };
      td.ondragover = function (e) {
        e.preventDefault();
        e.target.classList.add("table_drag");
        if (e.target.childNodes.length < 2) {
          e.target.style.border = "3px solid blue";
        }
        if (e.target.classList.contains("imageInput")) {
          e.target.style.border = "none";
        }
      };
      td.ondragleave = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("imageInput")) {
          e.target.style.border = "none";
        }
      };

      // // console.log("td", td.classList.contains("dropp"));
      td.ondrop = handleDropp;
      AllTrOfEditableTable[i].insertBefore(
        td,
        direction == "left"
          ? AllTrOfEditableTable[i].childNodes[index]
          : AllTrOfEditableTable[i].childNodes[index].nextSibling
      );
    }

    e.stopPropagation();
    // }
  };
  const handleDeleteRow = (e) => {
    const editableTable = findEditableTable();
    const AllTrOfEditableTable = editableTable.querySelectorAll("tr");
    let targetTr = null;
    for (let i = 0; i < AllTrOfEditableTable.length; i++) {
      if (
        AllTrOfEditableTable[i] ==
        e.target.parentElement.parentElement.parentElement.parentElement
      ) {
        targetTr = i;
      }
    }
    AllTrOfEditableTable[targetTr].remove();
    e.stopPropagation();
  };
  const handleDeleteCol = (e) => {
    const editableTable = findEditableTable();
    const index = Array.from(
      e.target.parentElement.parentElement.parentElement.parentElement.children
    ).indexOf(e.target.parentElement.parentElement.parentElement);

    const AllTrOfEditableTable = editableTable.querySelectorAll("tr");
    for (let i = 0; i < AllTrOfEditableTable.length; i++) {
      AllTrOfEditableTable[i].childNodes[index].remove();
    }
    e.stopPropagation();
  };
  const findEditableTable = () => {
    const focusseddDiv = document.querySelector(".focussedd");
    let findTArgetElement = focusseddDiv;
    while (1) {
      if (findTArgetElement?.classList.contains("tableInput")) {
        break;
      } else {
        findTArgetElement = findTArgetElement?.firstChild;
      }
    }
    const editableTable = findTArgetElement?.children[0];
    return editableTable;
  };
  function removeTable(e) {
    const focusseddElmnt = document.querySelector(".focussedd");

    var child = focusseddElmnt.lastElementChild;
    // while (child) {
    //   if (focusseddElmnt.classList.contains("holderDIV")) {
    //     focusseddElmnt.removeChild(child);
    //     child = focusseddElmnt.lastElementChild;
    //   }
    // }

    // if (focusseddElmnt.classList.contains("dropp")) {
    //   focusseddElmnt.children[1].firstChild.remove();
    //   focusseddElmnt.children[0].remove();
    // }
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
      // focusseddElmnt.children[1].firstChild.remove();
      // focusseddElmnt.children[0].remove();
      // setIsCreateTableBtnDisabled(false);
      // // focusseddElmnt.style.border = "1px solid black";
      // focusseddElmnt.firstChild.classList.add("focussed");
    }
    e.stopPropagation();
  }
  // // console.log("isCreateTableBtnDisabled", isCreateTableBtnDisabled);

  const handleBorderSizeChange = (e) => {
    setTableBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${tableBorderColor}px`;
  };

  const handleBorderColorChange = (e) => {
    setTableBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${tableBorderColor}`;
  };
  const handleRangeBlur = (e) => {
    e.target.focus();
  };

  const removeTableElements = () => {
    const targetEl = document.querySelector(".focussedd");
    if (targetEl.tagName.toLocaleLowerCase() === 'td') {
      const targets = targetEl.children
      for (let i = 0; i < targets.length; i++) {
        if (!targets[i].classList.contains('td-resizer') && !targets[i].classList.contains('row-resizer')) {
          targets[i].remove()
        }
      }
    } else {
      targetEl.remove()
      setSidebar(true)
    }
  }

  return (
    <>
      <div>
        <h6 className="pt-4">Table Size</h6>
        <Form.Label>Enter Number of rows</Form.Label>
        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="rows"
          className="shadow bg-white rounded mb-4"
          // defaultValue={numOfRow}
          disabled={isDisableTableRightMenu}
        />

        <Form.Label>Enter Number of columns</Form.Label>

        <Form.Control
          type="number"
          placeholder=""
          min="1"
          id="cols"
          className="shadow bg-white rounded mb-4"
          // defaultValue={numOfColumn}
          disabled={isDisableTableRightMenu}
        />
      </div>

      <div className="d-flex mt-2 justify-content-center pt-5">
        {/* {!numOfColumn && !numOfRow ? ( */}

        <Button
          variant="secondary"
          className="px-5 me-3"
          onClick={makeTable}
          disabled={isCreateTableBtnDisabled}
        >
          Create Table
        </Button>
        <Button
          variant="success"
          className="px-5"
          // data-bs-toggle="modal"
          // data-bs-target="#tableUpdateModal"
          onClick={updateTable}
          disabled={isDisableTableRightMenu}
        >
          Configure Table
        </Button>
      </div>

      {/* <div className='dropdown pt-4'>
        <h6>User permissions</h6>
        <select className='shadow bg-white rounded w-100 h-75'>
          <option value="Nothing Selected" selected="selected">Nothing Selected</option>
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else">Something else</option>
        </select>
      </div> */}

      <div className="mt-2 text-center pt-5">
        <Button
          variant="primary"
          className={decoded.details.action === "template" ? "px-5 remove_button" : "px-5 remove_button disable_button"}
          onClick={() => removeTableElements()}
        >
          Remove Table
        </Button>
      </div>

      <hr />
      <Row className="pt-4 mt-2">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h6 style={{ marginRight: "10rem" }}>Border</h6>
          <label className="switch">
            <input type="checkbox" onClick={() => setShowSlider(!showSlider)} />
            <span className="slider round"></span>
          </label>
        </div>
        {showSlider && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#abab",
              gap: "10px",
              height: "40px",
              width: "90%",
            }}
          >
            <input
              type="color"
              value={tableBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={tableBorderSize}
              onChange={handleBorderSizeChange}
              onBlur={handleRangeBlur}
              id="range"
              className="range-color"
            />
          </div>
        )}
      </Row>
    </>
  );
};

export default TableRightSidebar;