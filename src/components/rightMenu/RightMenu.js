import React, { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/contextProvider";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./RightMenu.css";
import AlignRightSide from "./AlignRightSide";
import CalendarRightSidebar from "./CalendarRightSidebar";
import ImageRightSidebar from "./ImageRightSidebar";
import SignsRightSidebar from "./SignsRightSidebar";
import TableRightSidebar from "./TableRightSidebar";
import DropDownRightSide from "./DropDownRightSide";
import IframeRightSidebar from "./IframeRightSidebar";
import ScaleRightSide from "./ScaleRightSide";
import ButtonRightSide from "./ButtonRightSide";
import NewScaleRightSide from "./NewScaleRightSide";
import "react-toastify/dist/ReactToastify.css";
import ContainerRigntSideBar from "./ContainerRightSidebar";
import EmailRightSideBar from "./EmailRightSideBar";
import CameraRightSide from "./CameraRightSide";

const RightMenu = () => {
  const {
    isClicked,
    setIsClicked,
    setSidebar,
    isFinializeDisabled,
    newToken,
    setNewToken,
    data,
    setData,
    title,
    setTitle,
    setFetchedData,
    setIsLoading,
    setItem,
    setIsDataRetrieved,
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);

  const [findIsClicked, setFindIsClicked] = useState("")
  const [rightMenuTop, setRightMEnuTop] = useState("70%")
  const [rightMenuLeft, setRightMEnuLeft] = useState("50%")
  const [windInnerWidth, setWindInnerWidth] = useState(window.innerWidth)
  const [windInnerHeight, setWindInnerHeight] = useState(window.innerHeight)

  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;
  const authorized = decoded?.details?.authorized;
  const process_id = decoded?.details?.process_id;
  const document_id = decoded?.details?._id;

  useEffect(()=>{
    if (window.innerWidth > 992) {
      setRightMEnuTop("0")
      setRightMEnuLeft("0")
    }
    setWindInnerWidth(window.innerWidth)
    setWindInnerHeight(window.innerHeight)
  },[window.innerWidth, window.innerHeight])

  useEffect(() => {
    if (isClicked.align2) {
      setIsClicked({
        ...isClicked,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.camera2) {
      setIsClicked({
        ...isClicked,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
      });
    }
    if (isClicked.image2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.table2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        signs2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.signs2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        calendar2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.calendar2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.dropdown2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        calendar2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.iframe2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        scale2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.scale2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        iframe2: false,
        button2: false,
        container2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.newScale2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        iframe2: false,
        button2: false,
        container2: false,
        email2: false,
        scale2: false,
        camera2: false,
      });
    }
    if (isClicked.button2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        iframe2: false,
        scale2: false,
        container2: false,
        email2: false,
        newScale2: false,
        newScale2: false,
      });
    }
    if (isClicked.container2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        iframe2: false,
        scale2: false,
        email2: false,
        newScale2: false,
        camera2: false,
      });
    }
    if (isClicked.email2) {
      setIsClicked({
        ...isClicked,
        align2: false,
        textfill2: false,
        image2: false,
        table2: false,
        signs2: false,
        dropdown2: false,
        calendar2: false,
        iframe2: false,
        scale2: false,
        button2: false,
        container2: false,
        newScale2: false,
        camera2: false,
      });
    }
  }, [
    isClicked.align2,
    isClicked.image2,
    isClicked.table2,
    isClicked.signs2,
    isClicked.calendar2,
    isClicked.dropdown2,
    isClicked.iframe2,
    isClicked.scale2,
    isClicked.button2,
    isClicked.container2,
    isClicked.email2,
    isClicked.camera2,
  ]);

  // function rightMenuDragStart(ev) {
  //   ev.dataTransfer.setData("text", ev.target.id);
  //   console.log("inside dragstart isClicked", isClicked);
    
  //   if (isClicked.align2) {
  //     setFindIsClicked("align2")
  //     setIsClicked({
  //       ...isClicked,align2:true
  //     });
  //   }else if (isClicked.image2) {
  //     setFindIsClicked("image2")
  //     setIsClicked({
  //       ...isClicked,iamge2:true
  //     });
  //   }else if (isClicked.table2) {
  //     setFindIsClicked("table2")
  //   }else if (isClicked.signs2) {
  //     setFindIsClicked("signs2")
  //   }else if (isClicked.calendar2) {
  //     setFindIsClicked("calendar2")
  //   }else if (isClicked.dropdown2) {
  //     setFindIsClicked("dropdown2")
  //   }
   
  // }

  // function rightMenuDragEnd(ev) {
  //   // alert("drag end")
    
  //   console.log("from rught menu drang end findIsClicked", findIsClicked);
  //   if(findIsClicked == "align2"){
  //     // setIsClicked({
  //     //   ...isClicked,
  //     //   align2: true,
  //     //   textfill2: false,
  //     //   image2: false,
  //     //   table2: false,
  //     //   signs2: false,
  //     //   dropdown2: false,
  //     //   calendar2: false,
  //     //   iframe2: false,
  //     //   scale2: false,
  //     //   button2: false,
  //     //   container2: false,
  //     //   newScale2: false,
  //     //   camera2: false,

  //     // });
  //     setIsClicked({
  //       ...isClicked,align2:true
  //     });
  //   // }
  //   }else if (findIsClicked == "image2") {
  //     // if(findIsClicked == "align2"){
  //       setIsClicked({
  //         ...isClicked,image2:true
  //       });
  //     // }
  //   }
  //   setRightMEnuTop(ev.screenY)
  //   setRightMEnuLeft(ev.screenX)
  //   // console.log("from right menu", ev.screenX, ev.screenY)
  //   // console.log("isClicked from right menu", isClicked);

  // }
  
// useEffect(()=>{
//   setIsClicked({
//     ...isClicked,
//     align2: false,
//     textfill2: false,
//     image2: true,
//     table2: false,
//     signs2: false,
//     dropdown2: false,
//     calendar2: false,
//     iframe2: false,
//     scale2: false,
//     button2: false,
//     container2: false,
//     newScale2: false,
//     camera2: false,
//   })
// },[])


  return (
    <>
      {/* <div className="fixed3" id="rightMenuDragStart" draggable="true" onDragStart={(event) => rightMenuDragStart(event)} onDragEnd={(event) => rightMenuDragEnd(event)} > */}
      {/* <div className="fixed3" id="rightMenuDragStart" draggable="true" onDragStart={(event) => rightMenuDragStart(event)} onDragEnd={(event) => rightMenuDragEnd(event)} > */}
        {isClicked.align2 && <AlignRightSide />}
        {isClicked.image2 && <ImageRightSidebar />}
        {isClicked.table2 && <TableRightSidebar />}
        {isClicked.signs2 && <SignsRightSidebar />}
        {isClicked.calendar2 && <CalendarRightSidebar />}
        {isClicked.dropdown2 && <DropDownRightSide />}
        {isClicked.iframe2 && <IframeRightSidebar />}
        {isClicked.scale2 && <ScaleRightSide />}
        {isClicked.button2 && <ButtonRightSide />}
        {isClicked.container2 && <ContainerRigntSideBar />}
        {isClicked.email2 && <EmailRightSideBar />}
        {isClicked.newScale2 && <NewScaleRightSide />}
        {isClicked.camera2 && <CameraRightSide />}
      {/* </div> */}
    </>
  );
};

export default RightMenu;
