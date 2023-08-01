import React, { useState } from "react";

const ImageInputElement = ({ element, measure, documnetMap }) => {
  const [uploadedImage, setUploadedImage] = useState("");

  const createImageButton = (text, type, eventListener) => {
    return (
      <div className={type} onClick={eventListener}>
        {text}
      </div>
    );
  };

  const handleImageInputChange = (event) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setUploadedImage(reader.result);
      document.querySelector(".focussed").style.backgroundImage = `url(${reader.result})`;
    });

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageFieldClick = (e) => {
    focuseddClassMaintain(e);
    if (e.ctrlKey) {
      copyInput("image2");
    }
    handleClicked("image2");
    setSidebar(true);
  };

  const idMatch = documnetMap?.filter((elmnt) => elmnt === element?.id);
  const holderDIV = getHolderDIV(measure, pageNo, idMatch);
  const id = `${element.id}`;

  return (
    <div
      className="holderDIV"
      style={{
        position: "absolute",
        overflow: "visible",
        display: "flex",
        cursor: "move",
        zIndex: 1,
        backgroundColor: "#0000",
        borderRadius: "0px",
        outline: "0px",
        overflow: "overlay",
        position: "relative",
      }}
    >
      <div
        className="imageInput"
        id={id}
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: element.data.startsWith("url(") ? element.data : "",
        }}
        onClick={handleImageFieldClick}
      >
        {element.data}
      </div>
      <input
        className="addImageButtonInput"
        type="file"
        style={{ objectFit: "cover", display: "none" }}
        onChange={handleImageInputChange}
      />
      {createImageButton("Choose File", "addImageButton", () => {
        document.querySelector(".addImageButtonInput").click();
      })}
    </div>
  );
};

export default ImageInputElement;
