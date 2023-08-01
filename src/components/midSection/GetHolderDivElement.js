// import { getResizer } from "./GetResizerElement";
// import { dragElementOverPage } from "./DragElementOverPage";
// import { getHolderMenu } from "./GetHolderMenu";

// export function getHolderDIV(measure, i, idMatch, decoded, resizing) {
//   const holderDIV = document.createElement("div");

//   holderDIV.style.position = "absolute";
//   holderDIV.style.overflow = "visible";
//   holderDIV.style.display = "flex";
//   holderDIV.style.cursor = "move";
//   holderDIV.style.zIndex = 1;
//   holderDIV.className = "holderDIV";
//   holderDIV.setAttribute("id", "holderId");
//   holderDIV.setAttribute("draggable", true);
//   holderDIV.setAttribute("data-idD", "INPUT_HOLDER");
//   // holderDIV.setAttribute("data-map_id", idMatch);
//   holderDIV.style.display = "flex";
//   holderDIV.style.flexDirection = "column";
//   // holderDIV.style.border = "2px dotted red";
//   holderDIV.tabIndex = "1";
//   // //console.log("measure", measure);
//   holderDIV.style.width = measure.width;
//   holderDIV.style.height = measure.height;
//   holderDIV.style.left = measure.left;
//   holderDIV.style.top = measure.top;
//   holderDIV.style.border = measure.border;

//   holderDIV.classList.add(`page_${i}`);

//   if (idMatch?.length > 0) {
//     holderDIV.classList.add(`enable_pointer_event`);
//     holderDIV.style.border = "1px solid green !important";
//   } else if (idMatch?.length < 1 && actionName == "document") {
//     holderDIV.classList.add(`dotted_border`);
//     holderDIV.classList.add(`disable_pointer_event`);
//   } else {
//     holderDIV.classList.add(`dotted_border`);
//   }

//   holderDIV.addEventListener("dragstart", (event) => {
//     console.log("dragStart fun called");
//   });
//   holderDIV.ondragstart = (e) => {
//     console.log("dragStart fun called");
//   };

//   // const resizerTL = <GetResizerElement attr1="top" attr2="left" />
//   const resizerTL = getResizer("top", "left", decoded);
//   console.log("mubeen resizertL", resizerTL)
//   const resizerTR = getResizer("top", "right", decoded);
//   // const resizerTR = <GetResizerElement attr1="top" attr2="right" />

//   console.log("mubeen resizerTR", resizerTR)
//   const resizerBL = getResizer("bottom", "left", decoded);
//   // const resizerBL = <GetResizerElement attr1="bottom" attr2="left" />
//   console.log("mubeen resizerBL", resizerBL)
//   const resizerBR = getResizer("bottom", "right", decoded);
//   // const resizerBR = <GetResizerElement attr1="bottom" attr2="right" />
//   console.log("mubeen resizerBR", resizerBR)

//   const holderMenu = getHolderMenu(measure.auth_user);
  
//   // const holderMenu = getHolderMenu(measure.auth_user);

//   holderDIV.onmousedown = holderDIV.addEventListener(
//     "mousedown",
//     (event) => {
//       dragElementOverPage(event, resizing);
//     },
//     false
//   );

//   holderDIV.onresize = (evntt) => {};

//   holderDIV.addEventListener("focus", (e) => {
//     holderDIV.classList.add("zIndex-two");
//     holderDIV.style.border = "2px solid orange";

//     holderDIV.append(resizerTL, resizerTR, resizerBL, resizerBR);
//   });

//   holderDIV.addEventListener("focusout", (e) => {
//     holderDIV.classList.remove("zIndex-two");

//     holderDIV.style.border = "3px dotted gray";

//     holderMenu.remove();
//     resizerTL.remove();
//     resizerTR.remove();
//     resizerBL.remove();
//     resizerBR.remove();
//   });

//   return holderDIV;
//   }