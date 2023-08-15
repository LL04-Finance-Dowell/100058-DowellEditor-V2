/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-loop-func */
/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./MidSection.css";
import { useStateContext } from "../../contexts/contextProvider";
import Spinner from "../../utils/spinner/Spinner.jsx";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { table_dropdown_focuseddClassMaintain } from "../../utils/focusClassMaintain/focusClass";
import { Print } from "react-easy-print";
import RightContextMenu from "../contextMenu/RightContextMenu";
import { getResizer } from "./GetResizerElement";
import { dragElementOverPage } from "./DragElementOverPage";
import { getHolderMenu } from "./GetHolderMenu";
import copyInput from "./CopyInput";
import createTextInputField  from "./midSectionElements/TextInputElement.jsx";
import createImageInputField from "./midSectionElements/ImageInputElement.jsx";
import createDateInputField from "./midSectionElements/DateInputElement.jsx";
import createSignInputField from "./midSectionElements/SignInputElement.jsx";
import createIframeInputField from "./midSectionElements/IframeInputElement.jsx";
import createButtonInputField from "./midSectionElements/ButtonInputElement.jsx";
import createFormInputField from "./midSectionElements/FormInputElement.jsx";
import createScaleInputField from "./midSectionElements/ScaleInputElement.jsx";
import createCameraInputField from "./midSectionElements/CameraInputElement.jsx";
import createDropDownInputField from "./midSectionElements/DropDownInputElement.jsx";
import createNewScaleInputField from "./midSectionElements/NewScaleInputElement.jsx";
import createContainerInputField from "./midSectionElements/ContainerInputElement.jsx";

// tHIS IS FOR A TEST COMMIT

const dummyData = {
  normal: {
    is_error: false,
    data: [
      [
        {
          _id: "61e50b063623fc65b472e6eb",
          title: "Livinglab did not create wonderful applications.",
          paragraph:
            "When you\u2019re programming in Python, , your data will be structured as a float.\r\n\r\nThis is important we will focus on two of these data types: strings and numbers.",
          source:
            "https://careerkarma.com/blog/python-string-to-int/#:~:text=To%20convert%20a%20string%20to,as%20an%20int%20%2C%20or%20integer.",
          subject: "Livinglab",
          dowelltime: "32941222",
          edited: 0,
          eventId: "FB1010000000016424005125815918",
        },
      ],
    ],
    sampling_status: false,
    sampling_status_text: "Not expected",
  },
};

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

// const MidSection = ({showSidebar}) => {
const MidSection = React.forwardRef((props, ref) => {
  const {
    sidebar,
    dropdownName,
    setDropdownName,
    isDropped,
    isClicked,
    setIsClicked,
    setSidebar,
    handleClicked,
    startDate,
    dropdownOptions,
    item,
    setItem,
    isLoading,
    setIsLoading,
    fetchedData,
    setFetchedData,
    rightSideDatemenu,
    setRightSideDateMenu,
    setStartDate,
    setRightSideDropDown,
    setMethod,
    deletePages,
    setIsFinializeDisabled,
    newToken,
    data,
    setData,
    isDataRetrieved,
    setIsDataRetrieved,
    scaleId,
    setScaleId,
    scaleData,
    setScaleData,
    title,
    setTitle,
    isMenuVisible,
    setIsMenuVisible,
    handleDropp,
    focuseddClassMaintain,
    buttonLink,
    setButtonPurpose,
  } = useStateContext();

  const [focusedElement, setFocusedElement] = useState(null);
  const [allPages, setAllPages] = useState([]);
  const [searchParams] = useSearchParams();
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;
  const flag_editing = decoded?.details?.flag;
  const documnentsMap = decoded?.details?.document_map;
  const divList = documnentsMap?.map?.((item) => item.page);
  var documnetMap = documnentsMap?.map?.((item) => item.content);
  const document_map_required = documnentsMap?.filter((item) => item.required);
  console.log("document_map_required", document_map_required);
  console.log("decode", decoded);
  console.log("data", data);

  const documentsMap = documnentsMap;
  if (documnentsMap?.length > 0) {
    const documentsMap = documnentsMap;
  } else {
    console.log("There's no document map");
  }

  console.log(documnetMap);

  const editorRef = useRef(null);
  const cutItemRef = useRef(null);
  const [selectedText, setSelectedText] = useState('');
  const handleCutInputRef = useRef(null);
  const copyItemRef = useRef(null);

  const boldCommand = () => {
    if (!editorRef.current) return;

    const strongElement = document.createElement("strong");
    strongElement.innerText = selectedText;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(strongElement);
    setSelectedText(selection.toString());
  };

  const midSectionRef = useRef([]);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      const holderDIV = document.getElementsByClassName("holderDIV");
      const holderr = document.getElementsByClassName("holder-menu");
      const resizerr = document.getElementsByClassName("resizeBtn");

      if (event?.target?.id === midSectionRef?.current?.id) {
        // holderDIV.classList.remove('focussedd')
        if (document.querySelector(".focussedd")) {
          document.querySelector(".focussedd").classList.remove("focussedd");
        }
        if (document.querySelector(".focussed")) {
          document.querySelector(".focussed").classList.remove("focussed");
        }
        setIsMenuVisible(false);
        setSidebar(false);
        setIsClicked(false);
        setRightSideDateMenu(false);
        setIsClicked({
          ...isClicked,
          align2: false,
          textfill2: false,
          image2: false,
          table2: false,
          signs2: false,
          calendar2: false,
          dropdown2: false,
          scale2: false,
          container2: false,
          iframe2: false,
          button2: false,
          email2: false,
          newScale2: false,
          camera2: false,
        });

        const divsArray = document.getElementsByClassName(
          "enable_pointer_event"
        );
      }
    });
  }, []);

  const [postData, setPostData] = useState({});

  const getPostData = async () => {
    var decoded = jwt_decode(token);
    //console.log(decoded);
    const response = await Axios.post(
      "https://100058.pythonanywhere.com/api/get-data-from-collection/",
      {
        document_id: decoded.details._id,
        action: decoded.details.action,
      }
    )
      .then((res) => {
        const loadedData = JSON.parse(res.data.content);
        const pageData = res.data.page;
        setItem(pageData);

        setData(loadedData[0][0]);
        setIsDataRetrieved(true);

        setIsLoading(false);
        setFetchedData(loadedData[0][0]);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (data !== undefined) {
      onPost();
    } else {
    }
  }, [isDataRetrieved]);

  let resizing = false;
  let contentFile = [];

  const defaultWidth = "100px";
  const defaultHeight = "100px";
  const defaultTop = "0px";
  const defaultLeft = "0px";

  const [cutItem_value, setCutItem_value] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();

    const midSec = document.getElementById("midSection_container");

    const midsectionRect = midSec.getBoundingClientRect();
    let clientX = e.clientX - midsectionRect.left;
    let clientY = e.clientY - midsectionRect.top;

    setContextMenu({ show: true, x: clientX, y: clientY });

    let midSec2 = null;

    if (!midSec2) {
      let targetParent = midSec;
      while (1) {
        if (
          targetParent.classList.contains("containerInput") ||
          targetParent.classList.contains("midSection_container")
        ) {
          targetParent = targetParent;
          break;
        } else {
          targetParent = targetParent.parentElement;
          midSec2 = targetParent;
        }
      }
    }
    setCutItem_value(e.target);
    cutItemRef.current = e.target;
    console.log("target.parentElement", e.target);
  };

  const handlePaste = () => {
    const midSec = document.getElementById("midSection_container");
    // const element = JSON.parse(sessionStorage.getItem("cutItem"));
    // console.log("sessionStorage.getItem", JSON.parse(sessionStorage.getItem("cutItem")))
    const element = JSON.parse(handleCutInputRef.current)
    const curr_user = document.getElementById("current-user");
    const copyData = sessionStorage.getItem("copyItem");

    const measure = {
      width: element.width,
      height: element.height,
      left: element.left,
      top: element.topp,
    };

    const holderDIV = getHolderDIV(measure);
    if (handleCutInputRef.current) {
      console.log("getting cutItem");

      if (element.type === "DATE_INPUT") {
        const measure = {
          width: element.width,
          height: element.height,
          left: element.left,
          top: element.topp,
        };
        const holderDIV = getHolderDIV(measure);
        const id = `${element.id}`;

        let dateField = document.createElement("div");
        dateField.className = "dateInput";
        dateField.id = id;
        dateField.style.width = "100%";
        dateField.style.height = "100%";
        dateField.style.backgroundColor = "#dedede";
        dateField.style.borderRadius = "0px";
        dateField.style.outline = "0px";
        dateField.style.overflow = "overlay";
        dateField.style.position = "relative";

        function dateClick() {
          document.getElementById("date_picker")?.click();
        }

        dateField.onclick = (e) => {
          if (e.ctrlKey) {
            copyInput("calendar2");
          }
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
        };
        dateField.innerText = `${element.data}`;

        holderDIV.append(dateField);

        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "TEXT_INPUT") {
        let inputField = document.createElement("div");

        inputField.setAttribute("contenteditable", true);
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

        const txt = document.getElementsByClassName("textInput");
        if (txt.length) {
          const h = txt.length;
          inputField.id = `t${h + 1}`;
        } else {
          inputField.id = "t1";
        }

        if (inputField.innerHTML[0]) {
          const editTextField = {
            editTextField: {
              value: inputField.innerHTML,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        }

        if (inputField.value !== "") {
        }

        inputField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("align2");
          }
          handleClicked("align2", "container2");
          setSidebar(true);
        };
        inputField.innerText = `${element.data}`;

        holderDIV.append(inputField);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "IMAGE_INPUT") {
        let imageField = document.createElement("div");
        imageField.className = "imageInput";
        imageField.id = "inputImg";
        imageField.style.width = "100%";
        imageField.style.height = "100%";
        imageField.style.backgroundColor = "#0000";
        imageField.style.borderRadius = "0px";
        imageField.style.outline = "0px";
        imageField.style.overflow = "overlay";
        imageField.innerText = "Choose Image";

        imageField.style.position = "relative";

        const img = document.getElementsByClassName("imageInput");
        if (img.length) {
          const h = img.length;
          imageField.id = `i${h + 1}`;
        } else {
          imageField.id = "i1";
        }

        imageField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);

          if (e.ctrlKey) {
            copyInput("image2");
          }

          handleClicked("image2", "container2");

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
        imageField.outerHTML = `${element.data2}`;
        console.log("element data getting", `${element.data}`);

        // imgBtn.style.width = "100%";
        imageButton.append(imgBtn);
        holderDIV.append(imageField);
        holderDIV.append(imageButton);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "IFRAME_INPUT") {
        let iframeField = document.createElement("div");
        iframeField.className = "iframeInput";
        iframeField.style.width = "100%";
        iframeField.style.height = "100%";
        iframeField.style.backgroundColor = "#dedede";
        iframeField.style.borderRadius = "0px";
        iframeField.style.outline = "0px";
        iframeField.style.overflow = "overlay";
        // iframeField.innerHTML = "iframe";
        iframeField.style.position = "absolute";
        iframeField.innerText = "iFrame here";

        const iframes = document.getElementsByClassName("iframeInput");
        if (iframes.length) {
          const i = iframes.length;
          iframeField.id = `ifr${i + 1}`;
        } else {
          iframeField.id = "ifr1";
        }

        iframeField.onclick = (e) => {
          // focuseddClassMaintain(e);
          e.stopPropagation();
          if (e.ctrlKey) {
            copyInput("iframe2");
          }
          table_dropdown_focuseddClassMaintain(e);
          // tableField.classList.add("focussed");
          handleClicked("iframe2", "container2");
          setSidebar(true);
        };
        iframeField.innerHTML = `${element.data}`;

        holderDIV.append(iframeField);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "SCALE_INPUT") {
        setIsLoading(true);

        let scaleField = document.createElement("div");
        scaleField.className = "scaleInput";
        scaleField.style.width = "100%";
        scaleField.style.height = "100%";
        scaleField.style.backgroundColor = "#dedede";
        scaleField.style.borderRadius = "0px";
        scaleField.style.outline = "0px";
        scaleField.style.overflow = "overlay";
        // scaleField.innerHTML = 'iframe';
        scaleField.style.position = "absolute";
        // scaleField.innerText = "scale here";

        const scales = document.getElementsByClassName("scaleInput");
        if (scales.length) {
          const s = scales.length;
          scaleField.id = `scl${s + 1}`;
        } else {
          scaleField.id = "scl1";
        }

        let scale = document.createElement("iframe");
        scale.style.width = "90%";
        scale.style.height = "90%";
        const scaleIdHolder = document.createElement("div");
        scaleIdHolder.className = "scaleId_holder";
        scaleIdHolder.style.display = "none";

        const labelHolder = document.createElement("div");
        labelHolder.className = "label_holder";
        labelHolder.style.display = "none";

        scaleField.addEventListener("resize", () => {
          scale.style.width = scaleField.clientWidth + "px";
          scale.style.height = scaleField.clientHeight + "px";
        });

        scaleField.append(scale);
        Axios.post(
          "https://100035.pythonanywhere.com/api/nps_settings_create/",
          {
            username: "nake",
            orientation: "horizontal",
            scalecolor: "#8f1e1e",
            roundcolor: "#938585",
            fontcolor: "#000000",
            fomat: "numbers",
            time: "00",
            name: `${title}_scale`,
            left: "good",
            right: "best",
            center: "neutral",
          }
        )
          .then((res) => {
            setIsLoading(false);
            console.log(res.data, "scaleData");
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(res.scale_urls, "stateScale");
            if (id.length) {
              console.log(id, "id");
              // setScaleId(id);
              scaleIdHolder.innerHTML = id;
            }
            scale.src = res.data.scale_urls;
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });

        scaleField.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("scale2");
          }
          handleClicked("scale2");
          setSidebar(true);
        };

        scaleField.innerHTML = `${element.data}`;

        holderDIV.append(scaleField);
        holderDIV.append(scaleIdHolder);
        holderDIV.append(labelHolder);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "NEW_SCALE_INPUT") {
        setIsLoading(true);

        let scaleField = document.createElement("div");
        scaleField.className = "scaleInput";
        scaleField.style.width = "100%";
        scaleField.style.height = "100%";
        scaleField.style.backgroundColor = "#dedede";
        scaleField.style.borderRadius = "0px";
        scaleField.style.outline = "0px";
        scaleField.style.overflow = "overlay";
        // scaleField.innerHTML = 'iframe';
        scaleField.style.position = "absolute";
        // scaleField.innerText = "scale here";

        const scales = document.getElementsByClassName("newScaleInput");
        if (scales.length) {
          const s = scales.length;
          scaleField.id = `scl${s + 1}`;
        } else {
          scaleField.id = "scl1";
        }

        let scale = document.createElement("iframe");
        scale.style.width = "90%";
        scale.style.height = "90%";
        const scaleIdHolder = document.createElement("div");
        scaleIdHolder.className = "scaleId_holder";
        scaleIdHolder.style.display = "none";

        const labelHolder = document.createElement("div");
        labelHolder.className = "label_holder";
        labelHolder.style.display = "none";

        scaleField.addEventListener("resize", () => {
          scale.style.width = scaleField.clientWidth + "px";
          scale.style.height = scaleField.clientHeight + "px";
        });

        scaleField.append(scale);

        scaleField.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("newScale2");
          }
          handleClicked("newScale2");
          setSidebar(true);
        };

        scaleField.innerHTML = `${element.data}`;

        holderDIV.append(scaleField);
        holderDIV.append(scaleIdHolder);
        holderDIV.append(labelHolder);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "SIGN_INPUT") {
        let signField = document.createElement("div");
        signField.className = "signInput";
        signField.style.width = "100%";
        signField.style.height = "100%";
        signField.style.backgroundColor = "#0000";
        signField.style.borderRadius = "0px";
        signField.style.outline = "0px";
        signField.style.overflow = "overlay";
        // signField.innerHTML = 'Place your signature here';
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
          // if (actionName = "template") {
          // signField.classList.add("focussed");
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

          reader.addEventListener("load", () => {
            uploadedImage = reader.result;
            const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
            document.querySelector(".focussed").innerHTML = signImage;
          });
          reader.readAsDataURL(signBtn.files[0]);
        });

        imageSignButton.append(signBtn);

        signField.innerText = `${element.data}`;
        holderDIV.append(signField);
        holderDIV.append(imageSignButton);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "DROPDOWN_INPUT") {
        let dropdownField = document.createElement("div");
        dropdownField.className = "dropdownInput";
        dropdownField.style.width = "100%";
        dropdownField.style.height = "100%";
        dropdownField.style.backgroundColor = "#0000";
        dropdownField.style.borderRadius = "0px";
        dropdownField.style.outline = "0px";
        dropdownField.style.border = "1px solid gray";
        dropdownField.style.overflow = "overlay";
        // dropdownField.innerHTML = `<select><option>${postData.dropdownField.value}</option></select>`;
        dropdownField.style.position = "absolute";

        const selectElement = document.createElement("select");
        selectElement.className = "select-element";
        selectElement.style.width = "500";
        selectElement.style.height = "auto";
        selectElement.onclick = () => {
          selectElement.parentElement.click();
        };

        dropdownField.onchange = (event) => {
          event.preventDefault();
          setPostData({
            ...postData,
            dropdownField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          });
        };

        if (dropdownField) {
          const dropdownField = {
            dropdownField: {
              // value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        }

        dropdownField.onclick = (e) => {
          e.stopPropagation();
          // focuseddClassMaintain(e);
          table_dropdown_focuseddClassMaintain(e);
          // dropdownField.classList.add("focussed");
          if (e.ctrlKey) {
            copyInput("dropdown2");
          }
          handleClicked("dropdown2", "container2");
          setRightSideDropDown(false);
          setSidebar(true);
        };

        const para = document.createElement("p");
        para.innerHTML = " Dropdown Name";
        para.className = "dropdownName";
        para.onclick = () => {
          para.parentElement.click();
        };

        dropdownField.innerHTML = `${element.data2}`;

        // dropdownField.innerText = `${element.data}`
        dropdownField.append(para);
        dropdownField.append(selectElement);
        holderDIV.append(dropdownField);
        cutItem_value.append(holderDIV);
        sessionStorage.clear();
      } else if (element.type === "CONTAINER_INPUT") {
        let containerField = document.createElement("div");
        containerField.className = "containerInput";
        containerField.id = "containerInput";
        containerField.style.width = "100%";
        containerField.style.height = "100%";
        containerField.style.backgroundColor = "#0000";
        containerField.style.borderRadius = "0px";
        containerField.style.outline = "0px";
        containerField.style.overflow = "overlay";
        containerField.style.position = "absolute";

        containerField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("container2");
          }
          handleClicked("container2");
          setSidebar(true);
          console.log("container field clicked");
        };
        containerField.ondragover = (e) => {
          console.log("console from container dragover", e.target);
          if (e.ctrlKey) {
            copyInput("container2");
          }
        };
        containerField.ondrop = (event) => {
          const container = event.target;
          const containerRect = container.getBoundingClientRect();
          const typeOfOperationContainer =
            event.dataTransfer.getData("text/plain");

          const measureContainer = {
            width: "200px",
            height: "80px",
            left: event.clientX - containerRect.left + "px",
            top: event.clientY - containerRect.top + "px",
            auth_user: curr_user,
          };

          const holderDIVContainer = getHolderDIV(measureContainer);
          if (typeOfOperationContainer === "DATE_INPUT") {
            let dateFieldContainer = document.createElement("div");
            dateFieldContainer.className = "dateInput";
            dateFieldContainer.style.width = "100%";
            dateFieldContainer.style.height = "100%";
            dateFieldContainer.style.backgroundColor = "#0000";
            dateFieldContainer.style.borderRadius = "0px";
            dateFieldContainer.style.outline = "0px";
            dateFieldContainer.style.overflow = "overlay";
            dateFieldContainer.style.position = "relative";

            dateFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                calenderField: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };
            setStartDate(new Date());
            setMethod("select");
            function dateClick() {
              document.getElementById("date_picker").click();
              setRightSideDateMenu(false);
            }
            dateFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("calendar2");
              }
              handleClicked("calendar2", "container2");
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
            };
            dateFieldContainer.innerText = "mm/dd/yyyy";

            holderDIVContainer.append(dateFieldContainer);
          } else if (typeOfOperationContainer === "IMAGE_INPUT") {
            let imageFieldContainer = document.createElement("div");
            imageFieldContainer.className = "imageInput";
            imageFieldContainer.style.width = "100%";
            imageFieldContainer.style.height = "100%";
            imageFieldContainer.style.backgroundColor = "#0000";
            imageFieldContainer.style.borderRadius = "0px";
            imageFieldContainer.style.outline = "0px";
            imageFieldContainer.style.overflow = "overlay";
            imageFieldContainer.innerText = "Choose Image";
            imageFieldContainer.style.position = "relative";

            imageFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("image2");
              }
              handleClicked("image2");
              setSidebar(true);
            };

            const imageButtonContainer = document.createElement("div");
            imageButtonContainer.className = "addImageButton";
            imageButtonContainer.innerText = "Choose File";
            imageButtonContainer.style.display = "none";

            const imgBtnContainer = document.createElement("input");
            imgBtnContainer.className = "addImageButtonInput";
            imgBtnContainer.type = "file";
            imgBtnContainer.style.objectFit = "cover";
            var uploadedImage = "";

            imgBtnContainer.addEventListener("input", () => {
              const reader = new FileReader();

              reader.addEventListener("load", () => {
                uploadedImage = reader.result;
                document.querySelector(
                  ".focussed"
                ).style.backgroundImage = `url(${uploadedImage})`;
              });
              reader.readAsDataURL(imgBtnContainer.files[0]);
            });

            imageButtonContainer.append(imgBtnContainer);
            holderDIVContainer.append(imageFieldContainer);
            holderDIVContainer.append(imageButtonContainer);
          } else if (typeOfOperationContainer === "DROPDOWN_INPUT") {
            let dropdownFieldContainer = document.createElement("div");
            dropdownFieldContainer.className = "dropdownInput";
            dropdownFieldContainer.style.width = "100%";
            dropdownFieldContainer.style.height = "100%";
            dropdownFieldContainer.style.backgroundColor = "#0000";
            dropdownFieldContainer.style.borderRadius = "0px";
            dropdownFieldContainer.style.outline = "0px";
            dropdownFieldContainer.style.overflow = "overlay";
            dropdownFieldContainer.style.position = "absolute";

            const selectElement = document.createElement("select");
            selectElement.className = "select-element";
            selectElement.style.width = "500";
            selectElement.style.height = "auto";
            selectElement.onclick = () => {
              selectElement.parentElement.click();
            };

            dropdownFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                dropdownFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            dropdownFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("dropdown2");
              }
              handleClicked("dropdown2");
              setRightSideDropDown(false);
              setSidebar(true);
            };

            const para = document.createElement("p");
            para.innerHTML = " Dropdown Name";
            para.className = "dropdownName";
            para.onclick = () => {
              para.parentElement.click();
            };
            dropdownFieldContainer.append(para);
            dropdownFieldContainer.append(selectElement);
            holderDIVContainer.append(dropdownFieldContainer);
          } else if (typeOfOperationContainer === "TEXT_INPUT") {
            let inputFieldContainer = document.createElement("div");

            inputFieldContainer.setAttribute("contenteditable", true);
            inputFieldContainer.className = "textInput";
            inputFieldContainer.innerHTML = "Enter text here";
            inputFieldContainer.style.width = "100%";
            inputFieldContainer.style.height = "100%";
            inputFieldContainer.style.resize = "none";
            inputFieldContainer.style.backgroundColor = "#0000";
            inputFieldContainer.style.borderRadius = "0px";
            inputFieldContainer.style.outline = "0px";
            inputFieldContainer.style.overflow = "overlay";
            inputFieldContainer.style.position = "relative";
            inputFieldContainer.style.cursor = "text";
            if (inputFieldContainer.innerHTML[0]) {
              const editTextField = {
                editTextField: {
                  value: inputFieldContainer.innerHTML,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              };
            }

            if (inputFieldContainer.value !== "") {
            }

            inputFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("align2");
              }
              handleClicked("align2");
              setSidebar(true);
            };
            holderDIVContainer.append(inputFieldContainer);
          } else if (typeOfOperationContainer === "SIGN_INPUT") {
            let signFieldContainer = document.createElement("div");
            signFieldContainer.className = "signInput";
            signFieldContainer.style.width = "100%";
            signFieldContainer.style.height = "100%";
            signFieldContainer.style.backgroundColor = "#0000";
            signFieldContainer.style.borderRadius = "0px";
            signFieldContainer.style.outline = "0px";
            signFieldContainer.style.overflow = "overlay";
            signFieldContainer.innerText = "Signature here";
            signFieldContainer.style.position = "absolute";

            signFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                signFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            signFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("signs2");
              }
              handleClicked("signs2");
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

              reader.addEventListener("load", () => {
                uploadedImage = reader.result;
                const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                document.querySelector(".focussed").innerHTML = signImage;
              });
              reader.readAsDataURL(signBtn.files[0]);
            });

            imageSignButton.append(signBtn);
            holderDIVContainer.append(signFieldContainer);
            holderDIVContainer.append(imageSignButton);
          } else if (typeOfOperationContainer === "IFRAME_INPUT") {
            let iframeFieldContainer = document.createElement("div");
            iframeFieldContainer.className = "iframeInput";
            iframeFieldContainer.style.width = "100%";
            iframeFieldContainer.style.height = "100%";
            iframeFieldContainer.style.backgroundColor = "#dedede";
            iframeFieldContainer.style.borderRadius = "0px";
            iframeFieldContainer.style.outline = "0px";
            iframeFieldContainer.style.overflow = "overlay";
            iframeFieldContainer.style.position = "absolute";
            iframeFieldContainer.innerText = "iFrame here";

            iframeFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("iframe2");
              }
              handleClicked("iframe2");
              setSidebar(true);
            };

            holderDIVContainer.append(iframeFieldContainer);
          } else if (typeOfOperationContainer === "SCALE_INPUT") {
            setIsLoading(true);

            let scaleFieldContainer = document.createElement("div");
            scaleFieldContainer.className = "scaleInput";
            scaleFieldContainer.style.width = "100%";
            scaleFieldContainer.style.height = "100%";
            scaleFieldContainer.style.backgroundColor = "#dedede";
            scaleFieldContainer.style.borderRadius = "0px";
            scaleFieldContainer.style.outline = "0px";
            scaleFieldContainer.style.overflow = "overlay";
            // scaleFieldContainer.innerHTML = 'iframe';
            scaleFieldContainer.style.position = "absolute";
            // scaleFieldContainer.innerText = "scale here";

            let scale = document.createElement("iframe");
            scaleFieldContainer.append(scale);
            Axios.post(
              "https://100035.pythonanywhere.com/api/nps_settings_create/",
              {
                username: "nake",
                orientation: "horizontal",
                scalecolor: "#8f1e1e",
                roundcolor: "#938585",
                fontcolor: "#000000",
                fomat: "numbers",
                time: "00",
                name: `${title}_scale`,
                left: "good",
                right: "best",
                center: "neutral",
              }
            )
              .then((res) => {
                setIsLoading(false);
                console.log(res.data, "scaleData");
                setScaleData(res.data);
                const success = res.data.success;
                var successObj = JSON.parse(success);
                const id = successObj.inserted_id;
                console.log(res.scale_urls, "stateScale");
                if (id.length) {
                  console.log(id, "id");
                  setScaleId(id);
                }
                scale.src = res.data.scale_urls;
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });

            scaleFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("scale2");
              }
              handleClicked("scale2");
              setSidebar(true);
            };

            holderDIVContainer.append(scaleFieldContainer);
          } else if (typeOfOperationContainer === "TABLE_INPUT") {
            let tableFieldContainer = document.createElement("div");
            tableFieldContainer.className = "tableInput";
            tableFieldContainer.style.width = "100%";
            tableFieldContainer.style.height = "100%";
            tableFieldContainer.style.backgroundColor = "#dedede";
            tableFieldContainer.style.borderRadius = "0px";
            tableFieldContainer.style.outline = "0px";
            tableFieldContainer.style.overflow = "overlay";
            tableFieldContainer.style.position = "absolute";

            tableFieldContainer.onchange = (event) => {
              event.preventDefault();

              setPostData({
                ...postData,
                tableFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            tableFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("table2");
              }
              handleClicked("table2");
              setSidebar(true);
            };
            holderDIVContainer.append(tableFieldContainer);
          } else if (typeOfOperationContainer == "BUTTON_INPUT") {
            let buttonField = document.createElement("button");
            buttonField.className = "buttonInput";
            buttonField.style.width = "100%";
            buttonField.style.height = "100%";
            buttonField.style.backgroundColor = "#0000";
            buttonField.style.borderRadius = "0px";
            buttonField.style.outline = "0px";
            buttonField.style.overflow = "overlay";
            buttonField.style.position = "absolute";
            buttonField.textContent = "Button";

            buttonField.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("button2");
              }
              handleClicked("button2", "container2");
              setSidebar(true);
            };

            const linkHolder = document.createElement("div");
            linkHolder.className = "link_holder";
            linkHolder.style.display = "none";

            const purposeHolder = document.createElement("div");
            purposeHolder.className = "purpose_holder";
            purposeHolder.style.display = "none";

            holderDIVContainer.append(buttonField);
            holderDIVContainer.append(linkHolder);
            holderDIVContainer.append(purposeHolder);
          }
          if (typeOfOperationContainer !== "CONTAINER_INPUT")
            containerField.append(holderDIVContainer);
        };
        containerField.innerHTML = `${element.data}`;

        holderDIV.append(containerField);
        cutItem_value.append(containerField);
        sessionStorage.clear();
      } else if (element.type === "BUTTON_INPUT") {
        let buttonField = document.createElement("button");
        buttonField.className = "buttonInput";
        buttonField.style.width = "100%";
        buttonField.style.height = "100%";
        buttonField.style.backgroundColor = "#0000";
        buttonField.style.borderRadius = "0px";
        buttonField.style.outline = "0px";
        buttonField.style.overflow = "overlay";
        buttonField.style.position = "absolute";
        buttonField.textContent = "Button";

        buttonField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("button2");
          }
          handleClicked("button2", "container2");
          setSidebar(true);
        };

        const linkHolder = document.createElement("div");
        linkHolder.className = "link_holder";
        linkHolder.style.display = "none";

        const purposeHolder = document.createElement("div");
        purposeHolder.className = "purpose_holder";
        purposeHolder.style.display = "none";

        holderDIV.append(buttonField);
        holderDIV.append(linkHolder);
        holderDIV.append(purposeHolder);
      }

      console.log("data", element, "cutItem_value", cutItem_value);
    }
  };

  const handleCutInput = () => {
    // const cutItem = document.querySelector(".focussedd");
    // const cutEle = cutItem.cloneNode(true);
    let cutEle = null;

    const cutItem = document.querySelector(".focussedd");
    if (cutItem) {
      cutEle = cutItem.cloneNode(true);
      // Rest of the code for cloning and manipulation
    } else {
      // Handle the case when the element with class "focussedd" is not found
      console.error("Element with class 'focussedd' not found.");
    }

    function getPosition(el) {
      console.log("element check", el);
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

    let tempPosn = getPosition(cutEle);
    const find_class_name = cutEle.firstElementChild?.className.split(" ")[0];
    let type = "";
    // console.log("containerChildClassName", containerChildClassName);
    switch (find_class_name) {
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
      case "containerInput":
        type = "CONTAINER_INPUT";
        break;
      case "newScaleInput":
        type = "NEW_SCALE_INPUT";
        break;
      case "cameraInput":
        type = "CAMERA_INPUT";
        break;
      default:
        type = "";
    }

    elem = {
      width: cutEle.style.width,
      height: cutEle.style.height,
      top: cutEle.style.top,
      topp: cutEle.style.top,
      left: cutEle.style.left,
      type: type,
      data: cutEle.firstChild.innerHTML,
      data2: cutEle.firstChild.outerHTML,
      // id: `d${h + 1}`,
    };

    sessionStorage.setItem('cutItem', JSON.stringify(elem));
    console.log('session', sessionStorage.getItem("cutItem"));
    handleCutInputRef.current = JSON.stringify(elem)
    cutItem.remove();
    // console.log(sessionStorage);
  };

  const contextMenuClose = () => setContextMenu(initialContextMenu);
  document.addEventListener("click", () => {
    setContextMenu(initialContextMenu);
  });

  // handle copy input from context menu

  const handleCopyInput = () => {
    const copyItem = document.querySelector(".focussedd");
    const copyEle = copyItem.cloneNode(true);

    function getPosition(el) {
      console.log("element check", el);
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

    let tempPosn = getPosition(copyEle);
    const find_class_name = copyEle.firstElementChild?.className.split(" ")[0];
    let type = "";
    switch (find_class_name) {
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
      case "containerInput":
        type = "CONTAINER_INPUT";
        break;
      case "newScaleInput":
        type = "NEW_SCALE_INPUT";
        break;
      case "cameraInput":
        type = "CAMERA_INPUT";
        break;
      default:
        type = "";
    }

    elem = {
      width: copyEle.style.width,
      height: copyEle.style.height,
      top: copyEle.style.top,
      topp: copyEle.style.top,
      left: copyEle.style.left,
      type: type,
      data: copyEle.firstChild.innerHTML,
      // id: `d${h + 1}`,
    };
    sessionStorage.setItem("copyItem", JSON.stringify(elem));
    copyItemRef.current = copyItem;
    // cutItem.remove();
  };

  // Remove Input
  const handleRemoveInput = () => {
    const selectInput = document.querySelector(".focussedd");
    selectInput.remove();
  };

  function getHolderDIV(measure, i, idMatch) {
    const holderDIV = document.createElement("div");

    holderDIV.style.position = "absolute";
    holderDIV.style.overflow = "visible";
    holderDIV.style.display = "flex";
    holderDIV.style.cursor = "move";
    holderDIV.style.zIndex = 1;
    holderDIV.className = "holderDIV";
    holderDIV.setAttribute("id", "holderId");
    holderDIV.setAttribute("draggable", true);
    holderDIV.setAttribute("data-idD", "INPUT_HOLDER");
    // holderDIV.setAttribute("data-map_id", idMatch);
    holderDIV.style.display = "flex";
    holderDIV.style.flexDirection = "column";
    // holderDIV.style.border = "2px dotted red";
    holderDIV.tabIndex = "1";
    // //console.log("measure", measure);
    holderDIV.style.width = measure.width;
    holderDIV.style.height = measure.height;
    holderDIV.style.left = measure.left;
    holderDIV.style.top = measure.top;
    holderDIV.style.border = measure.border;

    holderDIV.classList.add(`page_${i}`);

    if (idMatch?.length > 0) {
      holderDIV.classList.add(`enable_pointer_event`);
      holderDIV.style.border = "1px solid green !important";
    } else if (idMatch?.length < 1 && actionName == "document") {
      holderDIV.classList.add(`dotted_border`);
      holderDIV.classList.add(`disable_pointer_event`);
    } else {
      holderDIV.classList.add(`dotted_border`);
    }

    holderDIV.addEventListener("dragstart", (event) => {
      console.log("dragStart fun called");
    });
    holderDIV.ondragstart = (e) => {
      console.log("dragStart fun called");
    };

    // const resizerTL = <GetResizerElement attr1="top" attr2="left" />
    const resizerTL = getResizer("top", "left", decoded);
    console.log("mubeen resizertL", resizerTL)
    const resizerTR = getResizer("top", "right", decoded);
    // const resizerTR = <GetResizerElement attr1="top" attr2="right" />

    console.log("mubeen resizerTR", resizerTR)
    const resizerBL = getResizer("bottom", "left", decoded);
    // const resizerBL = <GetResizerElement attr1="bottom" attr2="left" />
    console.log("mubeen resizerBL", resizerBL)
    const resizerBR = getResizer("bottom", "right", decoded);
    // const resizerBR = <GetResizerElement attr1="bottom" attr2="right" />
    console.log("mubeen resizerBR", resizerBR)

    const holderMenu = getHolderMenu(measure.auth_user);
    
    // const holderMenu = getHolderMenu(measure.auth_user);

    holderDIV.onmousedown = holderDIV.addEventListener(
      "mousedown",
      (event) => {
        dragElementOverPage(event, resizing);
      },
      false
    );

    holderDIV.onresize = (evntt) => {};

    holderDIV.addEventListener("focus", (e) => {
      holderDIV.classList.add("zIndex-two");
      holderDIV.style.border = "2px solid orange";

      holderDIV.append(resizerTL, resizerTR, resizerBL, resizerBR);
    });

    holderDIV.addEventListener("focusout", (e) => {
      holderDIV.classList.remove("zIndex-two");

      holderDIV.style.border = "3px dotted gray";

      holderMenu.remove();
      resizerTL.remove();
      resizerTR.remove();
      resizerBL.remove();
      resizerBR.remove();
    });

    return holderDIV;
  }

  // dragging test

  let dragged = null;

  const source = document.querySelector(".focussedd");

  if (source) {
    source.addEventListener("dragstart", (event) => {
      dragged = event.target;
      console.log("dragged", dragged);
    });
  }

  const onPost = () => {
    const curr_user = document.getElementById("curr_user");
    const midSec = document.getElementsByClassName("midSection_container");

    let pageNo = 0;
    let isAnyRequiredElementEdited = false;

    console.log("getting text input value", item)
    for (let p = 1; p <= item?.length; p++) {
      pageNo++;
      fetchedData[p]?.forEach((element) => {
        console.log("element mubeen",element)
        if (element.type === "TEXT_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.borderWidths,
            auth_user: curr_user,
          };
          console.log("getting text input value", measure.border);

          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          // console.log("element", element);

          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          console.log("texteleemnt");

          createTextInputField(id, element, document_map_required, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar)
        }
        if (element.type === "IMAGE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.borderWidth,
            auth_user: curr_user,
          };
          console.log("element", element);
          const idMatch = documnetMap?.filter((elmnt) => elmnt === element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          
          createImageInputField(id, element, document_map_required, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar)
       }
        if (element.type === "DATE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.calBorder,
            auth_user: curr_user,
          };
          console.log("date data and value", measure.border);
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          console.log("getting cal element", element.calBorder);
          const id = `${element.id}`;

          createDateInputField(id, element, document_map_required, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, setRightSideDateMenu)
        }
        if (element.type === "SIGN_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.signBorder,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);

          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;

          createSignInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar)
        }
        if (element.type === "TABLE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.tableBorder,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;

          let tableField = document.createElement("div");
          tableField.className = "tableInput";
          tableField.id = id;
          tableField.style.width = "100%";
          tableField.style.height = "100%";
          tableField.style.backgroundColor = "#0000";
          tableField.style.borderRadius = "0px";
          tableField.style.outline = "0px";
          tableField.style.overflow = "overlay";

          tableField.style.position = "absolute";
          tableField.oninput = (e) => {};
          tableField.onclick = (e) => {
            table_dropdown_focuseddClassMaintain(e);

            if (e.ctrlKey) {
              copyInput("table2");
            }
            handleClicked("table2");
            setSidebar(true);
          };

          const tabb = document.createElement("table");

          const tableData = element?.data;

          for (let i = 0; i < tableData.length; i++) {
            const tabbTR = document.createElement("tr");
            const tableTRData = tableData[i]["tr"];
            for (let j = 0; j < tableTRData.length; j++) {
              const tableTDData = tableTRData[j]["td"];

              var cells = document.createElement("td");
              cells.className = "dropp";
              cells.ondragover = function (e) {
                e.preventDefault();
                e.target.classList.add("table_drag");
                if (!e.target.hasChildNodes()) {
                  e.target.style.border = "3px solid blue";
                }
                if (e.target.classList.contains("imageInput")) {
                  e.target.style.border = "none";
                }
              };
              cells.ondragleave = (e) => {
                e.preventDefault();
                if (
                  !e.target.hasChildNodes() &&
                  !e.target.classList.contains("imageInput")
                ) {
                  e.target.style.border = "1px solid black";
                }
                if (e.target.classList.contains("imageInput")) {
                  e.target.style.border = "none";
                }
              };

              //  tableTDData.
              const cellsDiv = document.createElement("div");
              const dataType = tableTDData.type;
              cellsDiv.className =
                (dataType == "DATE_INPUT" && "dateInput") ||
                (dataType == "TEXT_INPUT" && "textInput") ||
                (dataType == "IMAGE_INPUT" && "imageInput") ||
                (dataType == "SIGN_INPUT" && "signInput");
              if (dataType == "DATE_INPUT") {
                setStartDate(new Date());
                setMethod("select");

                function dateClick() {
                  document.getElementById("date_picker").click();
                  setRightSideDateMenu(false);
                }
                cellsDiv.onclick = (e) => {
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
              }
              if (dataType == "TEXT_INPUT") {
                cellsDiv.onclick = (e) => {
                  focuseddClassMaintain(e);
                  // handleClicked("align2");
                  // setSidebar(true);
                  handleClicked("align2", "table2");
                  setSidebar(true);
                  e.stopPropagation();
                };
              }
              if (dataType == "IMAGE_INPUT") {
                cellsDiv.onclick = (e) => {
                  focuseddClassMaintain(e);
                  // handleClicked("image2");
                  // setSidebar(true);
                  handleClicked("image2", "table2");
                  setSidebar(true);
                  // console.log("imageclick test", e.target);
                  e.stopPropagation();
                };
              }
              if (dataType == "SIGN_INPUT") {
                cellsDiv.onclick = (e) => {
                  focuseddClassMaintain(e);
                  handleClicked("signs2", "table2");
                  setSidebar(true);
                  e.stopPropagation();
                };
              }
              cellsDiv.setAttribute("contenteditable", true);
              cellsDiv.style.width = "100%";
              cellsDiv.style.height = "100%";
              cellsDiv.style.backgroundColor = "#0000";
              cellsDiv.style.borderRadius = "0px";
              cellsDiv.style.outline = "0px";
              cellsDiv.style.overflow = "overlay";

              if (dataType == "IMAGE_INPUT") {
                const imageButton = document.createElement("div");
                imageButton.className = "addImageButton";
                imageButton.innerText = "Choose File";
                imageButton.style.display = "none";

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

                cellsDiv.style.backgroundImage = `${tableTDData.data}`;

                imageButton.append(imgBtn);
                if (dataType) {
                  cells.appendChild(cellsDiv);
                  cells.appendChild(imgBtn);
                }
              } else {
                cellsDiv.innerHTML = `${tableTDData.data}`;
                if (dataType) {
                  cells.appendChild(cellsDiv);
                }
              }

              cells.ondrop = handleDropp;
              tabbTR.appendChild(cells);
            }
            tabb.appendChild(tabbTR);
          }
          tableField.append(tabb);

          holderDIV.append(tableField);

          document
            .getElementsByClassName("midSection_container")
            [p - 1] // ?.item(0)
            ?.append(holderDIV);
        }
        if (element.type === "IFRAME_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.iframeBorder,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;

          createIframeInputField(id, element, p, holderDIV, table_dropdown_focuseddClassMaintain, handleClicked, setSidebar)
        }

        if (element.type === "BUTTON_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.buttonBorder,
            auth_user: curr_user,
          };

          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo);
          const id = `${element.id}`;
          const finalizeButton = document.getElementById("finalize-button");
          const rejectButton = document.getElementById("reject-button");

          createButtonInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, finalizeButton, rejectButton, decoded, document_map_required)
        }
        if (element.type === "FORM") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            borderWidth: element.borderWidth + "px",
            auth_user: curr_user,
          };

          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo);
          const id = `${element.id}`;

          createFormInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar)
        }

        if (element.type === "SCALE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.scaleBorder,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;

          createScaleInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded)
        }

        if (element.type === "CAMERA_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          const videoLinkHolder = `${element?.raw_data?.videoLinkHolder}`;
          const imageLinkHolder = `${element?.raw_data?.imageLinkHolder}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          createCameraInputField(id, p, holderDIV, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, videoLinkHolder, imageLinkHolder)

          // let cameraField = document.createElement("div");
          // cameraField.className = "cameraInput";
          // cameraField.id = id;
          // cameraField.style.width = "100%";
          // cameraField.style.height = "100%";
          // cameraField.style.borderRadius = "0px";
          // cameraField.style.outline = "0px";
          // cameraField.style.overflow = "overlay";

          // let videoField = document.createElement("video");
          // const imageLinkHolder1 = document.createElement("h1");
          // const videoLinkHolder1 = document.createElement("h1");
          // if (videoLinkHolder === "video_link") {
          //   videoField.className = "videoInput";
          //   videoField.style.width = "100%";
          //   videoField.style.height = "100%";
          //   videoField.autoplay = true;
          //   videoField.loop = true;
          //   videoField.style.display = "none";
          //   cameraField.append(videoField);

          //   videoLinkHolder1.className = "videoLinkHolder";
          //   videoLinkHolder1.textContent = videoLinkHolder;
          //   videoLinkHolder1.style.display = "none";
          //   cameraField.append(videoLinkHolder1);
          // } else {
          //   videoField.className = "videoInput";
          //   videoField.src = videoLinkHolder;
          //   videoField.style.width = "100%";
          //   videoField.style.height = "100%";
          //   videoField.autoplay = true;
          //   videoField.muted = true;
          //   videoField.loop = true;
          //   cameraField.append(videoField);

          //   videoLinkHolder1.className = "videoLinkHolder";
          //   videoLinkHolder1.textContent = videoLinkHolder;
          //   videoLinkHolder1.style.display = "none";
          //   cameraField.append(videoLinkHolder1);
          // }

          // let imgHolder = document.createElement("img");
          // if (imageLinkHolder === "image_link") {
          //   imgHolder.className = "imageHolder";
          //   imgHolder.style.height = "100%";
          //   imgHolder.style.width = "100%";
          //   imgHolder.alt = "";
          //   imgHolder.style.display = "none";
          //   cameraField.append(imgHolder);

          //   imageLinkHolder1.className = "imageLinkHolder";
          //   imageLinkHolder1.textContent = imageLinkHolder;
          //   imageLinkHolder1.style.display = "none";
          //   cameraField.append(imageLinkHolder1);
          // } else {
          //   imgHolder.className = "imageHolder";
          //   imgHolder.style.height = "100%";
          //   imgHolder.style.width = "100%";
          //   imgHolder.alt = "";
          //   imgHolder.src = imageLinkHolder;
          //   cameraField.append(imgHolder);

          //   imageLinkHolder1.className = "imageLinkHolder";
          //   imageLinkHolder1.textContent = imageLinkHolder;
          //   imageLinkHolder1.style.display = "none";
          //   cameraField.append(imageLinkHolder1);
          // }

          // cameraField.addEventListener("resize", () => {
          //   videoField.style.width = cameraField.clientWidth + "px";
          //   videoField.style.height = cameraField.clientHeight + "px";
          // });

          // cameraField.onclick = (e) => {
          //   e.stopPropagation();
          //   table_dropdown_focuseddClassMaintain(e);
          //   if (e.ctrlKey) {
          //     copyInput("camera2");
          //   }
          //   handleClicked("camera2");
          //   setSidebar(true);
          // };

          // imgHolder.onclick = (e) => {
          //   e.stopPropagation();
          //   table_dropdown_focuseddClassMaintain(e);
          //   if (e.ctrlKey) {
          //     copyInput("camera2");
          //   }
          //   handleClicked("camera2");
          //   setSidebar(true);
          //   console.log("The camera", cameraField);
          // };
          // holderDIV.append(cameraField);

          // document
          //   .getElementsByClassName("midSection_container")
          //   [p - 1] // ?.item(0)
          //   ?.append(holderDIV);
        }
        if (element.type === "NEW_SCALE_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element?.raw_data?.scaleID}`;

          createNewScaleInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded, token);
        }
        // Limon
        if (element.type === "DROPDOWN_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.dropdownBorder,
            auth_user: curr_user,
          };
          // console.log("dropdown border value", measure.border);
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          createDropDownInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded, setRightSideDropDown, setDropdownName);
        }
        // conteiner retrive data
        if (element.type === "CONTAINER_INPUT") {
          const measure = {
            width: element.width + "px",
            height: element.height + "px",
            left: element.left + "px",
            top: element.topp,
            border: element.containerBorder,
            auth_user: curr_user,
          };
          const idMatch = documnetMap?.filter((elmnt) => elmnt == element?.id);
          const holderDIV = getHolderDIV(measure, pageNo, idMatch);
          const id = `${element.id}`;
          // const holderDIV = getHolderDIV(measure, pageNo);

          createContainerInputField(id, element, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar, table_dropdown_focuseddClassMaintain, decoded, setPostData, postData, getHolderDIV, getOffset, setStartDate, setMethod, setRightSideDateMenu, title, curr_user)
        }
      });
    }
  };

  const onParagraphPost = () => {
    const curr_user = document.getElementById("curr_user");

    const measure = {
      width: "300px",
      height: "100px",
      top: "100px",
      auth_user: curr_user,
    };

    const holderDIV = getHolderDIV(measure);

    let paragraphField = document.createElement("div");
    //  inputField.setAttribute('draggable', true);
    paragraphField.setAttribute("contenteditable", true);
    paragraphField.className = "textInput";
    paragraphField.style.width = "100%";
    paragraphField.style.height = "100%";
    paragraphField.style.resize = "none";
    paragraphField.style.zIndex = 3;
    paragraphField.style.backgroundColor = "#0000";
    paragraphField.style.borderRadius = "0px";
    paragraphField.style.outline = "0px";
    paragraphField.style.overflow = "overlay";
    paragraphField.style.position = "relative";
    paragraphField.style.cursor = "text";
    paragraphField.onclick = () => {
      handleClicked("align2");
      setSidebar(true);
      paragraphField.parentElement.focus();
    };

    paragraphField.innerText = `${data.paragraph}`;
    // paragraphField.innerHTML = `${data.normal.data[0][0].paragraph}`;

    holderDIV.append(paragraphField);

    document
      .getElementById("midSection_container")
      // .item(0)
      .append(holderDIV);
  };

  function getOffset(el) {
    const parent = document.getElementById("midSection_container");
    const parentPos = parent.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top - parentPos.top,
      left: rect.left - parentPos.left,
      bottom: rect.bottom - parentPos.top,
      right: rect.right - parentPos.left,
    };
  }

  function getPosition(el) {
    const rect = el[0].getBoundingClientRect();

    return {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  }

  const chooseFileClick = () => {
    const addImageButtonInput = document.getElementsByClassName(
      "addImageButtonInput"
    );
    addImageButtonInput.item(0).click();
  };

  const dragOver = (event) => {
    const isLink = event.dataTransfer.types.includes("text/plain");

    if (isLink) {
      event.preventDefault();
      event.currentTarget.classList.add("drop_zone");
      if (document.querySelector(".focussedd")) {
        document.querySelector(".focussedd").classList.remove("focussedd");
      }
      if (document.querySelector(".focussed")) {
        document.querySelector(".focussed").classList.remove("focussed");
      }
      setSidebar(false);
      setIsClicked(false);
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        button2: false,
        iframe2: false,
        scale2: false,
        container2: false,
        newScale2: false,
      });
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    //console.log("log from on drop", event);
    // document.querySelector('.drop_zone').classList.remove('drop_zone')
    const has_table_drag_class = event.target.classList.contains("table_drag");
    const has_container_drag_class =
      event.target.classList.contains("containerInput");
    const typeOfOperation = event.dataTransfer.getData("text/plain");
    // console.log("typeOfOperation", typeOfOperation);
    const curr_user = document.getElementById("current-user");

    const midSec = document.querySelector(".drop_zone");
    const midsectionRect = midSec.getBoundingClientRect();

    const measure = {
      width: "200px",
      height: "80px",
      left: event.clientX - midsectionRect.left + "px",
      top: event.clientY - midsectionRect.top + "px",
      // border: "2px dotted gray",
      auth_user: curr_user,
    };

    let pageNum = null;
    let holderDIV = null;
    if (event.target.classList.contains("midSection_container")) {
      pageNum = event.target.innerText.split("\n")[0];
      holderDIV = getHolderDIV(measure, pageNum);
    } else {
      holderDIV = getHolderDIV(measure);
    }

    if (!has_table_drag_class && !has_container_drag_class) {
      if (
        typeOfOperation === "TEXT_INPUT" &&
        decoded.details.action === "template"
      ) {
        let inputField = document.createElement("div");
        //  inputField.setAttribute('draggable', true);
        inputField.setAttribute("contenteditable", true);
        inputField.className = "textInput";
        inputField.placeholder = "Enter text here";
        inputField.style.width = "100%";
        inputField.style.height = "100%";
        inputField.style.resize = "none";
        inputField.style.backgroundColor = "#0000";
        inputField.style.borderRadius = "0px";
        inputField.style.outline = "0px";
        inputField.style.overflow = "overlay";
        inputField.style.position = "relative";
        inputField.style.cursor = "text";

        const txt = document.getElementsByClassName("textInput");
        if (txt.length) {
          const h = txt.length;
          inputField.id = `t${h + 1}`;
        } else {
          inputField.id = "t1";
        }

        if (inputField.innerHTML[0]) {
          const editTextField = {
            editTextField: {
              value: inputField.innerHTML,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        }

        if (inputField.value !== "") {
        }

        inputField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("align2");
          }
          handleClicked("align2", "container2");
          setSidebar(true);
        };
        holderDIV.append(inputField);
      } else if (
        typeOfOperation === "IMAGE_INPUT" &&
        decoded.details.action === "template"
      ) {
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
        imageField.innerText = "Choose Image";
        // imageField.innerHTML = `<img src="${postData.imageField.value}" alt="">`;
        imageField.style.position = "relative";

        const img = document.getElementsByClassName("imageInput");
        if (img.length) {
          const h = img.length;
          imageField.id = `i${h + 1}`;
        } else {
          imageField.id = "i1";
        }

        imageField.addEventListener("onclick", () => {
          console.log("imgData clicked");
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
      } else if (typeOfOperation === "TEXT_FILL") {
        let texttField = document.createElement("textarea");
        texttField.className = "texttInput";
        texttField.placeholder = "input text here";
        texttField.style.width = "100%";
        texttField.style.height = "100%";
        texttField.style.resize = "none";
        texttField.style.backgroundColor = "#0000";
        texttField.style.borderRadius = "0px";
        texttField.style.outline = "0px";
        texttField.style.overflow = "overlay";
        // texttField.innerText = `${postData.textField.value}`
        texttField.style.position = "relative";

        texttField.onchange = (event) => {
          event.preventDefault();
          const textField = {
            textField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        };

        holderDIV.append(texttField);
      } else if (
        typeOfOperation === "IFRAME_INPUT" &&
        decoded.details.action === "template"
      ) {
        let iframeField = document.createElement("div");
        iframeField.className = "iframeInput";
        iframeField.style.width = "100%";
        iframeField.style.height = "100%";
        iframeField.style.backgroundColor = "#dedede";
        iframeField.style.borderRadius = "0px";
        iframeField.style.outline = "0px";
        iframeField.style.overflow = "overlay";
        // iframeField.innerHTML = "iframe";
        iframeField.style.position = "absolute";
        iframeField.innerText = "iFrame here";

        const iframes = document.getElementsByClassName("iframeInput");
        if (iframes.length) {
          const i = iframes.length;
          iframeField.id = `ifr${i + 1}`;
        } else {
          iframeField.id = "ifr1";
        }

        iframeField.onclick = (e) => {
          // focuseddClassMaintain(e);
          e.stopPropagation();
          if (e.ctrlKey) {
            copyInput("iframe2");
          }
          table_dropdown_focuseddClassMaintain(e);
          // tableField.classList.add("focussed");
          handleClicked("iframe2", "container2");
          setSidebar(true);
        };

        holderDIV.append(iframeField);
      }

      //Limon
      else if (
        typeOfOperation === "SCALE_INPUT" &&
        decoded.details.action === "template"
      ) {
        setIsLoading(true);

        let scaleField = document.createElement("div");
        scaleField.className = "scaleInput";
        scaleField.style.width = "100%";
        scaleField.style.height = "100%";
        scaleField.style.backgroundColor = "transparent";
        scaleField.style.borderRadius = "0px";
        scaleField.style.outline = "0px";
        scaleField.style.overflow = "overlay";
        // scaleField.innerHTML = 'iframe';
        scaleField.style.position = "absolute";
        // scaleField.innerText = "scale here";

        const scales = document.getElementsByClassName("scaleInput");
        if (scales.length) {
          const s = scales.length;
          scaleField.id = `scl${s + 1}`;
        } else {
          scaleField.id = "scl1";
        }

        let scale = document.createElement("iframe");
        scale.style.width = "100%";
        scale.style.height = "100%";
        scale.style.position = "relative";
        scale.style.zIndex = "-1";

        const scaleIdHolder = document.createElement("div");
        scaleIdHolder.className = "scaleId_holder";
        scaleIdHolder.style.display = "none";

        const labelHolder = document.createElement("div");
        labelHolder.className = "label_holder";
        labelHolder.style.display = "none";

        scaleField.addEventListener("resize", () => {
          scale.style.width = scaleField.clientWidth + "px";
          scale.style.height = scaleField.clientHeight + "px";
        });

        scaleField.append(scale);
        Axios.post(
          "https://100035.pythonanywhere.com/api/nps_settings_create/",
          {
            username: "nake",
            orientation: "horizontal",
            scalecolor: "#8f1e1e",
            roundcolor: "#938585",
            fontcolor: "#000000",
            fomat: "numbers",
            time: "00",
            name: `${title}_scale`,
            left: "good",
            right: "best",
            center: "neutral",
          }
        )
          .then((res) => {
            setIsLoading(false);
            console.log(res.data, "scaleData");
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(res.scale_urls, "stateScale");
            if (id.length) {
              console.log(id, "id");
              // setScaleId(id);
              scaleIdHolder.innerHTML = id;
            }
            scale.src = res.data.scale_urls;
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });

        scaleField.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("scale2");
          }
          handleClicked("scale2");
          setSidebar(true);
        };

        holderDIV.append(scaleField);
        holderDIV.append(scaleIdHolder);
        holderDIV.append(labelHolder);
      } else if (
        typeOfOperation === "NEW_SCALE_INPUT" &&
        decoded.details.action === "template"
      ) {
        let scaleField = document.createElement("div");
        scaleField.className = "newScaleInput";
        scaleField.style.width = "100%";
        scaleField.style.height = "100%";
        scaleField.style.backgroundColor = "#fff";
        scaleField.style.borderRadius = "0px";
        scaleField.style.outline = "0px";
        scaleField.style.overflow = "overlay";
        scaleField.style.position = "absolute";
        // scaleField.innerText = "scale here";

        const tempText = document.createElement("div");
        tempText.className = "tempText";
        tempText.textContent = "New scale";
        tempText.style.fontWeight = "700";
        tempText.style.width = "100%";
        tempText.style.textAlign = "center";
        scaleField.appendChild(tempText);

        const scaleHold = document.createElement("div");
        scaleHold.className = "scool_input";
        scaleHold.style.color = "black";
        scaleHold.style.width = "100%";
        scaleHold.style.height = "90%";
        scaleHold.style.padding = "10px";
        scaleHold.style.display = "none";

        scaleField.append(scaleHold);

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

        const idHolder = document.createElement("h6");
        idHolder.className = "scaleId";
        idHolder.textContent = "scale Id";
        idHolder.style.display = "none";
        childDiv.appendChild(idHolder);
        // childDiv.appendChild( idHolder);

        // childDiv.appendChild(element3);
        scaleHold.append(childDiv);
        const scales = document.getElementsByClassName("newScaleInput");
        if (scales.length) {
          const s = scales.length;
          scaleField.id = `scl${s + 1}`;
        } else {
          scaleField.id = "scl1";
        }

        let scale = document.createElement("div");
        scale.style.width = "90%";
        scale.style.height = "0%";

        console.log(Element);
        scaleField.addEventListener("resize", () => {
          scale.style.width = scaleField.clientWidth + "px";
          scale.style.height = scaleField.clientHeight + "px";
        });

        setIsLoading(false);

        const copyScales = () => {
          // if (typeOfOperation === "IMAGE_INPUT") {
          const element = document.querySelector(".focussedd");
          // console.log(element);
          let counter = 1;
          const copyEle = element.cloneNode(true);
          const copyEleTop =
            parseInt(copyEle.style.top.slice(0, -2)) + 100 + "px";

          // parseInt(holder.style.top.slice(0, -2))
          copyEle.classList.remove("focussedd");
          copyEle.firstChild.classList.remove("focussed");
          // copyEle.classList.add("imageInput")
          console.log(copyEleTop);
          copyEle.onfocus = () => {
            copyEle.style.border = "1px solid rgb(255 191 0)";
          };
          copyEle.onblur = () => {
            copyEle.style.border = "1px dotted black";
          };
          if (copyEle) {
            copyEle.style.top = copyEleTop;
            copyEle.style.border = "1px dotted black";

            copyEle.onmousedown = copyEle.addEventListener(
              "mousedown",
              (event) => {
                dragElementOverPage(event, resizing);
              },
              false
            );

            const resizerTL = getResizer("top", "left", decoded);
            const resizerTR = getResizer("top", "right", decoded);
            const resizerBL = getResizer("bottom", "left", decoded);
            const resizerBR = getResizer("bottom", "right", decoded);
            // parseInt(holder.style.top.slice(0, -2))

            copyEle.addEventListener("focus", function (e) {
              // holderDIV.classList.add("focussedd");
              copyEle.classList.add("zIndex-two");
              copyEle.style.border = "2px solid orange";
              // holderDIV.append(holderMenu);

              copyEle.append(resizerTL, resizerTR, resizerBL, resizerBR);
            });
            copyEle.addEventListener("click", (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              // imageField.classList.add("focussed");
              handleClicked("image2", "container2");
              // copyImage()
              // resizing = true;
              setSidebar(true);
            });
          }
          // console.log(copyEle)
          copyEle.id += counter;
          midSec.appendChild(copyEle);
          console.log("coping", copyEle);
          // }
        };

        scaleField.addEventListener("click", (event) => {
          if (event.ctrlKey) {
            console.log("clicked it");
            copyScales();
            // setSidebar(true)
          } else {
            console.log("Faild to copy");
          }
        });

        scaleField.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          handleClicked("newScale2");
          setSidebar(true);
          console.log(scaleField.id);
        };

        holderDIV.append(scaleField);
      } else if (
        typeOfOperation === "CAMERA_INPUT" &&
        decoded.details.action === "template"
      ) {
        let cameraField = document.createElement("div");
        cameraField.className = "cameraInput";
        cameraField.style.width = "100%";
        cameraField.style.height = "100%";
        cameraField.style.borderRadius = "0px";
        cameraField.style.outline = "0px";
        cameraField.style.overflow = "overlay";

        const camera = document.getElementsByClassName("cameraInput");
        if (camera.length) {
          const h = camera.length;
          cameraField.id = `cam1${h + 1}`;
        } else {
          cameraField.id = "cam1";
        }

        let videoField = document.createElement("video");
        videoField.className = "videoInput";
        videoField.style.width = "100%";
        videoField.style.height = "100%";
        videoField.autoplay = true;
        videoField.loop = true;
        cameraField.append(videoField);

        let cameraImageInput = document.createElement("canvas");
        cameraImageInput.className = "cameraImageInput";
        cameraImageInput.style.display = "none";
        cameraField.append(cameraImageInput);

        const imgHolder = document.createElement("img");
        imgHolder.className = "imageHolder";
        imgHolder.alt = "";
        imgHolder.style.display = "none";
        cameraField.append(imgHolder);

        const imageLinkHolder = document.createElement("h1");
        imageLinkHolder.className = "imageLinkHolder";
        imageLinkHolder.textContent = "image_link";
        imageLinkHolder.style.display = "none";
        cameraField.append(imageLinkHolder);

        const videoLinkHolder = document.createElement("h1");
        videoLinkHolder.className = "videoLinkHolder";
        videoLinkHolder.textContent = "video_link";
        videoLinkHolder.style.display = "none";
        cameraField.append(videoLinkHolder);

        cameraField.addEventListener("resize", () => {
          videoField.style.width = cameraField.clientWidth + "px";
          videoField.style.height = cameraField.clientHeight + "px";
        });

        function openCam() {
          let All_mediaDevices = navigator.mediaDevices;
          if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
            alert("Media not supported.");
            return;
          }
          All_mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
            .then(function (vidStream) {
              var video = videoField;
              if ("srcObject" in video) {
                video.srcObject = vidStream;
              } else {
                video.src = window.URL.createObjectURL(vidStream);
              }
              video.onloadedmetadata = function (e) {
                video.play();
              };
            })
            .catch(function (e) {
              alert(e.name + ": " + e.message);
            });
        }

        openCam();

        cameraField.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("camera2");
          }
          handleClicked("camera2");
          setSidebar(true);
        };

        cameraImageInput.onclick = (e) => {
          e.stopPropagation();
          table_dropdown_focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("camera2");
          }
          handleClicked("camera2");
          setSidebar(true);
        };

        holderDIV.append(cameraField);
      } else if (typeOfOperation === "TEXT_FILL") {
        let texttField = document.createElement("textarea");
        texttField.className = "texttInput";
        texttField.placeholder = "input text here";
        texttField.style.width = "100%";
        texttField.style.height = "100%";
        texttField.style.resize = "none";
        texttField.style.backgroundColor = "#0000";
        texttField.style.borderRadius = "0px";
        texttField.style.outline = "0px";
        texttField.style.overflow = "overlay";

        texttField.style.position = "relative";

        texttField.onchange = (event) => {
          event.preventDefault();
          const textField = {
            textField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        };

        holderDIV.append(texttField);
      } else if (
        typeOfOperation === "TABLE_INPUT" &&
        decoded.details.action === "template"
      ) {
        let tableField = document.createElement("div");
        tableField.className = "tableInput";
        tableField.style.width = "100%";
        tableField.style.height = "100%";
        tableField.style.backgroundColor = "#dedede";
        tableField.style.borderRadius = "0px";
        tableField.style.outline = "0px";
        tableField.style.overflow = "overlay";
        // tableField.innerHTML = 'table';
        tableField.style.position = "absolute";

        tableField.onchange = (event) => {
          event.preventDefault();

          setPostData({
            ...postData,
            tableField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          });
        };

        tableField.onclick = (e) => {
          e.stopPropagation();

          table_dropdown_focuseddClassMaintain(e);

          handleClicked("table2", "container2");
          setSidebar(true);
        };

        holderDIV.append(tableField);
      } else if (
        typeOfOperation === "SIGN_INPUT" &&
        decoded.details.action === "template"
      ) {
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

          reader.addEventListener("load", () => {
            uploadedImage = reader.result;
            const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
            document.querySelector(".focussed").innerHTML = signImage;
          });
          reader.readAsDataURL(signBtn.files[0]);
        });

        imageSignButton.append(signBtn);

        holderDIV.append(signField);
        holderDIV.append(imageSignButton);
      } else if (
        typeOfOperation === "DATE_INPUT" &&
        decoded.details.action === "template"
      ) {
        let dateField = document.createElement("div");
        dateField.className = "dateInput";
        dateField.style.width = "100%";
        dateField.style.height = "100%";
        dateField.style.backgroundColor = "#0000";
        dateField.style.borderRadius = "0px";
        dateField.style.outline = "0px";
        dateField.style.overflow = "overlay";

        dateField.style.position = "relative";

        dateField.onchange = (event) => {
          event.preventDefault();
          setPostData({
            ...postData,
            calenderField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          });
        };
        setStartDate(new Date());
        setMethod("select");

        function dateClick() {
          document.getElementById("date_picker").click();
          setRightSideDateMenu(false);
        }
        dateField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("calendar2");
          }
          handleClicked("calendar2", "container2");
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
        };

        dateField.innerText = "mm/dd/yyyy";

        holderDIV.append(dateField);
      } else if (
        typeOfOperation === "DROPDOWN_INPUT" &&
        decoded.details.action === "template"
      ) {
        let dropdownField = document.createElement("div");
        dropdownField.className = "dropdownInput";
        dropdownField.style.width = "100%";
        dropdownField.style.height = "100%";
        dropdownField.style.backgroundColor = "#0000";
        dropdownField.style.borderRadius = "0px";
        dropdownField.style.outline = "0px";
        dropdownField.style.overflow = "overlay";

        dropdownField.style.position = "absolute";

        const selectElement = document.createElement("select");
        selectElement.className = "select-element";
        selectElement.style.width = "500";
        selectElement.style.height = "auto";
        selectElement.onclick = () => {
          selectElement.parentElement.click();
        };

        dropdownField.onchange = (event) => {
          event.preventDefault();
          setPostData({
            ...postData,
            dropdownField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          });
        };

        if (dropdownField) {
          const dropdownField = {
            dropdownField: {
              value: event.target.value,
              xcoordinate: getOffset(holderDIV).left,
              ycoordinate: getOffset(holderDIV).top,
            },
          };
        }

        dropdownField.onclick = (e) => {
          e.stopPropagation();
          // focuseddClassMaintain(e);
          table_dropdown_focuseddClassMaintain(e);
          // dropdownField.classList.add("focussed");
          if (e.ctrlKey) {
            copyInput("dropdown2");
          }
          handleClicked("dropdown2", "container2");
          setRightSideDropDown(false);
          setSidebar(true);
        };

        const para = document.createElement("p");
        para.innerHTML = " Dropdown Name";
        para.className = "dropdownName";
        para.onclick = () => {
          para.parentElement.click();
        };
        dropdownField.append(para);
        dropdownField.append(selectElement);
        holderDIV.append(dropdownField);
      } else if (
        typeOfOperation === "BUTTON_INPUT" &&
        decoded.details.action === "template"
      ) {
        let buttonField = document.createElement("button");
        buttonField.className = "buttonInput";
        buttonField.style.width = "100%";
        buttonField.style.height = "100%";
        buttonField.style.backgroundColor = "#0000";
        buttonField.style.borderRadius = "0px";
        buttonField.style.outline = "0px";
        buttonField.style.overflow = "overlay";
        buttonField.style.position = "absolute";
        buttonField.textContent = "Button";

        buttonField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("button2");
          }
          handleClicked("button2", "container2");
          setSidebar(true);
        };

        const linkHolder = document.createElement("div");
        linkHolder.className = "link_holder";
        linkHolder.style.display = "none";

        const purposeHolder = document.createElement("div");
        purposeHolder.className = "purpose_holder";
        purposeHolder.style.display = "none";

        holderDIV.append(buttonField);
        holderDIV.append(linkHolder);
        holderDIV.append(purposeHolder);
      } else if (
        typeOfOperation === "CONTAINER_INPUT" &&
        decoded.details.action === "template"
      ) {
        // console.log("typeOfOperation", typeOfOperation);
        let containerField = document.createElement("div");
        containerField.className = "containerInput";
        containerField.id = "containerInput";
        containerField.style.width = "100%";
        containerField.style.height = "100%";
        containerField.style.backgroundColor = "#0000";
        containerField.style.borderRadius = "0px";
        containerField.style.outline = "0px";
        containerField.style.overflow = "overlay";
        containerField.style.position = "absolute";

        containerField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("container2");
          }
          handleClicked("container2");
          setSidebar(true);
          console.log("container field clicked");
        };
        containerField.ondragover = (e) => {
          console.log("console from container dragover", e.target);
          if (e.ctrlKey) {
            copyInput("container2");
          }
        };
        containerField.ondrop = (event) => {
          const container = event.target;
          const containerRect = container.getBoundingClientRect();
          const typeOfOperationContainer =
            event.dataTransfer.getData("text/plain");

          const measureContainer = {
            width: "200px",
            height: "80px",
            left: event.clientX - containerRect.left + "px",
            top: event.clientY - containerRect.top + "px",
            auth_user: curr_user,
          };

          const holderDIVContainer = getHolderDIV(measureContainer);
          if (typeOfOperationContainer === "DATE_INPUT") {
            let dateFieldContainer = document.createElement("div");
            dateFieldContainer.className = "dateInput";
            dateFieldContainer.style.width = "100%";
            dateFieldContainer.style.height = "100%";
            dateFieldContainer.style.backgroundColor = "#0000";
            dateFieldContainer.style.borderRadius = "0px";
            dateFieldContainer.style.outline = "0px";
            dateFieldContainer.style.overflow = "overlay";
            dateFieldContainer.style.position = "relative";

            dateFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                calenderField: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };
            setStartDate(new Date());
            setMethod("select");
            function dateClick() {
              document.getElementById("date_picker").click();
              setRightSideDateMenu(false);
            }
            dateFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("calendar2");
              }
              handleClicked("calendar2", "container2");
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
            };
            dateFieldContainer.innerText = "mm/dd/yyyy";

            holderDIVContainer.append(dateFieldContainer);
          } else if (typeOfOperationContainer === "IMAGE_INPUT") {
            let imageFieldContainer = document.createElement("div");
            imageFieldContainer.className = "imageInput";
            imageFieldContainer.style.width = "100%";
            imageFieldContainer.style.height = "100%";
            imageFieldContainer.style.backgroundColor = "#0000";
            imageFieldContainer.style.borderRadius = "0px";
            imageFieldContainer.style.outline = "0px";
            imageFieldContainer.style.overflow = "overlay";
            imageFieldContainer.innerText = "Choose Image";
            imageFieldContainer.style.position = "relative";

            imageFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("image2");
              }
              handleClicked("image2");
              setSidebar(true);
            };

            const imageButtonContainer = document.createElement("div");
            imageButtonContainer.className = "addImageButton";
            imageButtonContainer.innerText = "Choose File";
            imageButtonContainer.style.display = "none";
            // imageButtonContainer.onclick = (e) => chooseFileClick(e);

            const imgBtnContainer = document.createElement("input");
            imgBtnContainer.className = "addImageButtonInput";
            imgBtnContainer.type = "file";
            imgBtnContainer.style.objectFit = "cover";
            var uploadedImage = "";

            imgBtnContainer.addEventListener("input", () => {
              const reader = new FileReader();

              reader.addEventListener("load", () => {
                uploadedImage = reader.result;
                document.querySelector(
                  ".focussed"
                ).style.backgroundImage = `url(${uploadedImage})`;
              });
              reader.readAsDataURL(imgBtnContainer.files[0]);
            });

            // imgBtnContainer.style.width = "100%";
            imageButtonContainer.append(imgBtnContainer);
            holderDIVContainer.append(imageFieldContainer);
            holderDIVContainer.append(imageButtonContainer);
          } else if (typeOfOperationContainer === "DROPDOWN_INPUT") {
            let dropdownFieldContainer = document.createElement("div");
            dropdownFieldContainer.className = "dropdownInput";
            dropdownFieldContainer.style.width = "100%";
            dropdownFieldContainer.style.height = "100%";
            dropdownFieldContainer.style.backgroundColor = "#0000";
            dropdownFieldContainer.style.borderRadius = "0px";
            dropdownFieldContainer.style.outline = "0px";
            dropdownFieldContainer.style.overflow = "overlay";
            dropdownFieldContainer.style.position = "absolute";

            const selectElement = document.createElement("select");
            selectElement.className = "select-element";
            selectElement.style.width = "500";
            selectElement.style.height = "auto";
            selectElement.onclick = () => {
              selectElement.parentElement.click();
            };

            dropdownFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                dropdownFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            dropdownFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("dropdown2");
              }
              handleClicked("dropdown2");
              setRightSideDropDown(false);
              setSidebar(true);
            };

            const para = document.createElement("p");
            para.innerHTML = " Dropdown Name";
            para.className = "dropdownName";
            para.onclick = () => {
              para.parentElement.click();
            };
            dropdownFieldContainer.append(para);
            dropdownFieldContainer.append(selectElement);
            holderDIVContainer.append(dropdownFieldContainer);
          } else if (typeOfOperationContainer === "TEXT_INPUT") {
            let inputFieldContainer = document.createElement("div");
            //  inputFieldContainer.setAttribute('draggable', true);
            inputFieldContainer.setAttribute("contenteditable", true);
            inputFieldContainer.className = "textInput";
            inputFieldContainer.innerHTML = "Enter text here";
            inputFieldContainer.style.width = "100%";
            inputFieldContainer.style.height = "100%";
            inputFieldContainer.style.resize = "none";
            inputFieldContainer.style.backgroundColor = "#0000";
            inputFieldContainer.style.borderRadius = "0px";
            inputFieldContainer.style.outline = "0px";
            inputFieldContainer.style.overflow = "overlay";
            inputFieldContainer.style.position = "relative";
            inputFieldContainer.style.cursor = "text";
            if (inputFieldContainer.innerHTML[0]) {
              const editTextField = {
                editTextField: {
                  value: inputFieldContainer.innerHTML,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              };
            }

            if (inputFieldContainer.value !== "") {
            }

            inputFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("align2");
              }
              handleClicked("align2");
              setSidebar(true);
            };
            holderDIVContainer.append(inputFieldContainer);
          } else if (typeOfOperationContainer === "SIGN_INPUT") {
            let signFieldContainer = document.createElement("div");
            signFieldContainer.className = "signInput";
            signFieldContainer.style.width = "100%";
            signFieldContainer.style.height = "100%";
            signFieldContainer.style.backgroundColor = "#0000";
            signFieldContainer.style.borderRadius = "0px";
            signFieldContainer.style.outline = "0px";
            signFieldContainer.style.overflow = "overlay";
            signFieldContainer.innerText = "Signature here";
            signFieldContainer.style.position = "absolute";

            signFieldContainer.onchange = (event) => {
              event.preventDefault();
              setPostData({
                ...postData,
                signFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            signFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("signs2");
              }
              handleClicked("signs2");
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

              reader.addEventListener("load", () => {
                uploadedImage = reader.result;
                const signImage = `<img src=${uploadedImage} width="100%" height="100%"/>`;
                document.querySelector(".focussed").innerHTML = signImage;
              });
              reader.readAsDataURL(signBtn.files[0]);
            });

            imageSignButton.append(signBtn);
            holderDIVContainer.append(signFieldContainer);
            holderDIVContainer.append(imageSignButton);
          } else if (typeOfOperationContainer === "IFRAME_INPUT") {
            let iframeFieldContainer = document.createElement("div");
            iframeFieldContainer.className = "iframeInput";
            iframeFieldContainer.style.width = "100%";
            iframeFieldContainer.style.height = "100%";
            iframeFieldContainer.style.backgroundColor = "#dedede";
            iframeFieldContainer.style.borderRadius = "0px";
            iframeFieldContainer.style.outline = "0px";
            iframeFieldContainer.style.overflow = "overlay";
            iframeFieldContainer.style.position = "absolute";
            iframeFieldContainer.innerText = "iFrame here";

            iframeFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("iframe2");
              }
              handleClicked("iframe2");
              setSidebar(true);
            };

            holderDIVContainer.append(iframeFieldContainer);
          } else if (typeOfOperationContainer === "SCALE_INPUT") {
            setIsLoading(true);

            let scaleFieldContainer = document.createElement("div");
            scaleFieldContainer.className = "scaleInput";
            scaleFieldContainer.style.width = "100%";
            scaleFieldContainer.style.height = "100%";
            scaleFieldContainer.style.backgroundColor = "#dedede";
            scaleFieldContainer.style.borderRadius = "0px";
            scaleFieldContainer.style.outline = "0px";
            scaleFieldContainer.style.overflow = "overlay";
            // scaleFieldContainer.innerHTML = 'iframe';
            scaleFieldContainer.style.position = "absolute";
            // scaleFieldContainer.innerText = "scale here";

            let scale = document.createElement("iframe");
            scaleFieldContainer.append(scale);
            Axios.post(
              "https://100035.pythonanywhere.com/api/nps_settings_create/",
              {
                username: "nake",
                orientation: "horizontal",
                scalecolor: "#8f1e1e",
                roundcolor: "#938585",
                fontcolor: "#000000",
                fomat: "numbers",
                time: "00",
                name: `${title}_scale`,
                left: "good",
                right: "best",
                center: "neutral",
              }
            )
              .then((res) => {
                setIsLoading(false);
                console.log(res.data, "scaleData");
                setScaleData(res.data);
                const success = res.data.success;
                var successObj = JSON.parse(success);
                const id = successObj.inserted_id;
                console.log(res.scale_urls, "stateScale");
                if (id.length) {
                  console.log(id, "id");
                  setScaleId(id);
                }
                scale.src = res.data.scale_urls;
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });

            scaleFieldContainer.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("scale2");
              }
              handleClicked("scale2");
              setSidebar(true);
            };

            holderDIVContainer.append(scaleFieldContainer);
          } else if (typeOfOperationContainer === "TABLE_INPUT") {
            let tableFieldContainer = document.createElement("div");
            tableFieldContainer.className = "tableInput";
            tableFieldContainer.style.width = "100%";
            tableFieldContainer.style.height = "100%";
            tableFieldContainer.style.backgroundColor = "#dedede";
            tableFieldContainer.style.borderRadius = "0px";
            tableFieldContainer.style.outline = "0px";
            tableFieldContainer.style.overflow = "overlay";
            tableFieldContainer.style.position = "absolute";
 
            tableFieldContainer.onchange = (event) => {
              event.preventDefault();

              setPostData({
                ...postData,
                tableFieldContainer: {
                  value: event.target.value,
                  xcoordinate: getOffset(holderDIVContainer).left,
                  ycoordinate: getOffset(holderDIVContainer).top,
                },
              });
            };

            tableFieldContainer.onclick = (e) => {
              e.stopPropagation();
              table_dropdown_focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("table2");
              }
              handleClicked("table2");
              setSidebar(true);
            };
            holderDIVContainer.append(tableFieldContainer);
          } else if (typeOfOperationContainer == "BUTTON_INPUT") {
            let buttonField = document.createElement("button");
            buttonField.className = "buttonInput";
            buttonField.style.width = "100%";
            buttonField.style.height = "100%";
            buttonField.style.backgroundColor = "#0000";
            buttonField.style.borderRadius = "0px";
            buttonField.style.outline = "0px";
            buttonField.style.overflow = "overlay";
            buttonField.style.position = "absolute";
            buttonField.textContent = "Button";

            buttonField.onclick = (e) => {
              e.stopPropagation();
              focuseddClassMaintain(e);
              if (e.ctrlKey) {
                copyInput("button2");
              }
              handleClicked("button2", "container2");
              setSidebar(true);
            };

            const linkHolder = document.createElement("div");
            linkHolder.className = "link_holder";
            linkHolder.style.display = "none";

            const purposeHolder = document.createElement("div");
            purposeHolder.className = "purpose_holder";
            purposeHolder.style.display = "none";

            // holderDIVContainer.append(dateFieldContainer);
            holderDIVContainer.append(buttonField);
            holderDIVContainer.append(linkHolder);
            holderDIVContainer.append(purposeHolder);
          }
          if (typeOfOperationContainer !== "CONTAINER_INPUT")
            containerField.append(holderDIVContainer);
        };
        holderDIV.append(containerField);
      } else if (
        typeOfOperation === "FORM" &&
        decoded.details.action === "template"
      ) {
        let buttonField = document.createElement("button");
        console.log("button field");
        buttonField.className = "emailButton";
        buttonField.style.width = "100%";
        buttonField.style.height = "100%";
        // buttonField.style.backgroundColor = "#0000";
        buttonField.style.borderRadius = "0px";
        buttonField.style.outline = "0px";
        buttonField.style.overflow = "overlay";
        buttonField.style.position = "absolute";
        buttonField.type = "submit";
        buttonField.textContent = "Mail";
        buttonField.style.backgroundColor = "#007bff";
        buttonField.style.color = "#fff";
        // buttonField.style.border = "none";
        buttonField.style.padding = "10px 20px";
        buttonField.style.margin = "0 auto";
        buttonField.style.border = "1px solid #0000";

        // add form container to the document
        document.body.appendChild(buttonField);

        buttonField.onclick = (e) => {
          e.stopPropagation();
          focuseddClassMaintain(e);
          if (e.ctrlKey) {
            copyInput("email2");
          }
          handleClicked("email2", "container2");
          setSidebar(true);
        };

        const linkHolder = document.createElement("div");
        linkHolder.className = "link_holder";
        linkHolder.style.display = "none";

        const purposeHolder = document.createElement("div");
        purposeHolder.className = "purpose_holder";
        purposeHolder.style.display = "none";

        holderDIV.append(buttonField);
        holderDIV.append(linkHolder);
        holderDIV.append(purposeHolder);
      }
      if (decoded.details.action === "template") {
        document.querySelector(".drop_zone").append(holderDIV);
      }
    }
  };

  contentFile = [];
  let page = [];

  let elem = {};

  return (
    <>
      {item?.map((currentItem, index) => {
        return (
          <Print>
            <div
              ref={ref}
              key={index}
              className={`midSection print_midsection_${index}`}
            >
              <Container
                as="div"
                ref={midSectionRef}
                className={
                  // !sidebar
                  //   ? "midSection_without_RightMenu_container"
                  "midSection_container print_container"
                }
                // className="midSection_container"
                id="midSection_container"
                onDragOver={dragOver}
                onDrop={onDrop}
                onContextMenu={handleContextMenu}
              >
                {contextMenu.show && (
                  <RightContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    closeContextMenu={contextMenuClose}
                    cutInput={handleCutInput}
                    pasteInput={handlePaste}
                    handleCopy={handleCopyInput}
                    removeInput={handleRemoveInput}
                  />
                )}
                <Row>
                  <Col className="d-flex justify-content-end header_user">
                    <span>{index + 1}</span>
                    {isLoading && <Spinner />}
                  </Col>
                </Row>
              </Container>
            </div>
          </Print>
        );
      })}
      {/* <!-- Modal --> */}
    </>
  );
});

export default MidSection;
