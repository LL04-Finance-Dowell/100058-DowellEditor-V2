import React, { useState } from 'react';
import copyInput from '../CopyInput';

// Regular JavaScript function to create a text input field
function createImageInputField(id, element, document_map_required, p, holderDIV, focuseddClassMaintain, handleClicked, setSidebar) {

  const imageField = document.createElement("div");
  imageField.className = "imageInput";
  imageField.id = id;
  imageField.style = {
    width: "100%",
    height: "100%",
    backgroundColor: "#0000",
    borderRadius: "0px",
    outline: "0px",
    overflow: "overlay",
    position: "relative",
  };

  const required_map_document = document_map_required?.filter(
    (item) => element.id === item.content
  );

  if (imageField?.parentElement?.classList.contains("holderDIV") && required_map_document?.length > 0) {
    imageField?.parentElement?.classList.add("element_updated");
  }

  if (element.required) {
    isAnyRequiredElementEdited = true;
  }

  imageField.addEventListener("input", (e) => {
    // setIsFinializeDisabled(false);
  });

  holderDIV.appendChild(imageField);

  document
    .getElementsByClassName("midSection_container")[p - 1]
    ?.appendChild(holderDIV);

  imageField.onclick = (e) => {
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput("image2");
    }
    handleClicked("image2");
    setSidebar(true);
  };

  const createImageButton = (text, type, eventListener) => {
    const button = document.createElement("div");
    button.className = type;
    button.innerText = text;
    button.style.display = "none";
    button.addEventListener("click", eventListener);
    return button;
  };

  const imgBtn = document.createElement("input");
  imgBtn.className = "addImageButtonInput";
  imgBtn.type = "file";
  imgBtn.style.objectFit = "cover";
  var uploadedImage = "";

  imgBtn.addEventListener("input", () => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      uploadedImage = reader.result;
      document.querySelector(".focussed").style.backgroundImage = `url(${uploadedImage})`;
    });
    reader.readAsDataURL(imgBtn.files[0]);
  });

  imageField.style.backgroundImage = element.data.startsWith("url(") ? element.data : "";
  imageField.innerText = element.data;

  const imageButton = createImageButton("Choose File", "addImageButton", () => imgBtn.click());
  imageButton.appendChild(imgBtn);

  holderDIV.appendChild(imageField);
  holderDIV.appendChild(imageButton);

  document.getElementsByClassName("midSection_container")[p - 1]?.appendChild(holderDIV);

}
export default createImageInputField;











// import React, { useState } from "react";
// import copyInput from "../CopyInput";
// import { useStateContext } from "../../../contexts/contextProvider";

// const ImageInputElement = ({ element, measure, documnetMap }) => {
//   const [uploadedImage, setUploadedImage] = useState("");
//   const { focuseddClassMaintain, handleClicked, setSidebar } =
//     useStateContext();

//   const createImageButton = (text, type, eventListener) => {
//     return (
//       <div className={type} onClick={eventListener}>
//         {text}
//       </div>
//     );
//   };

//   const handleImageInputChange = (event) => {
//     const reader = new FileReader();

//     reader.addEventListener("load", () => {
//       setUploadedImage(reader.result);
//       document.querySelector(
//         ".focussed"
//       ).style.backgroundImage = `url(${reader.result})`;
//     });

//     if (event.target.files && event.target.files[0]) {
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   };

//   const handleImageFieldClick = (e) => {
//     focuseddClassMaintain(e);
//     if (e.ctrlKey) {
//       copyInput("image2");
//     }
//     handleClicked("image2");
//     setSidebar(true);
//   };

//   const idMatch = documnetMap?.filter((elmnt) => elmnt === element?.id);
//   const holderDIV = getHolderDIV(measure, pageNo, idMatch);
//   const id = `${element.id}`;

//   return (
//     <div
//       className="holderDIV"
//       style={{
//         position: "absolute",
//         overflow: "visible",
//         display: "flex",
//         cursor: "move",
//         zIndex: 1,
//         backgroundColor: "#0000",
//         borderRadius: "0px",
//         outline: "0px",
//         overflow: "overlay",
//         position: "relative",
//       }}
//     >
//       <div
//         className="imageInput"
//         id={id}
//         style={{
//           width: "100%",
//           height: "100%",
//           backgroundImage: element.data.startsWith("url(") ? element.data : "",
//         }}
//         onClick={handleImageFieldClick}
//       >
//         {element.data}
//       </div>
//       <input
//         className="addImageButtonInput"
//         type="file"
//         style={{ objectFit: "cover", display: "none" }}
//         onChange={handleImageInputChange}
//       />
//       {createImageButton("Choose File", "addImageButton", () => {
//         document.querySelector(".addImageButtonInput").click();
//       })}
//     </div>
//   );
// };

// export default ImageInputElement;
