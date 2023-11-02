import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LeftMenu from "../leftMenu/LeftMenu";
import MidSection from "../midSection/MidSection.js";
import RightMenu from "../rightMenu/RightMenu";

import "./EditSection.css";
import { useStateContext } from "../../contexts/contextProvider";
export const editSec_midSec_ref = document.querySelector(".editSec_midSec");

const EditSection = () => {
  const {
    isClicked,
    sidebar,
    newToken,
    setNewToken,
    isFinializeDisabled,
    isLoading,
    setIsLoading,
    data,
    setIsMenuVisible,
    questionAndAnswerGroupedData,
    allowHighlight
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const { authorized, process_id } = decoded?.details;

  const newPageButton = document.querySelector(".new-page-btn");
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;

  const [prevSelectedElement, setPrevSelectedElement] = useState(null);
  const [prevSelElmAns, setPrevSelElmAns] = useState([])

  const selectedElement = document.querySelector('.focussedd div')?.id;

  useEffect(() => {
    const borderStyles = "2px solid red";

    if (!selectedElement || !allowHighlight) return;

    const questions = new Set();
    const answers = new Set();

    const updateAnsElmBorder = (items, border) => {
      items.forEach(item => {
        if (!item) return;
        // if (!answers.has(item)) return;
        const element = document.getElementById(item);
        element.style.border = border;
      });
    };

    const data = [...questionAndAnswerGroupedData].map(elm => {
      questions.add(elm.question);
      elm?.answers?.forEach(ans => answers.add(ans));
      return elm;
    });

    const element = document.getElementById(selectedElement);
    if (!element) return;
    element.style.border = borderStyles;

    if (prevSelectedElement && prevSelectedElement !== selectedElement) {
      const prevElement = document.getElementById(prevSelectedElement);
      if (!prevElement) return;
      prevElement.style.border = "none";
      updateAnsElmBorder(prevSelElmAns, "none");
    }

    setPrevSelectedElement(selectedElement);
    const result = data.find(item => item?.question === selectedElement);
    console.log("result?.answers -1", result?.answers)
    setPrevSelElmAns(result?.answers || []);

    if (questions.has(selectedElement)) {
      console.log("result?.answers -2", result?.answers)
      updateAnsElmBorder(result?.answers, borderStyles);
    }
  }, [questionAndAnswerGroupedData, selectedElement]);
  // }, [prevSelElmAns, prevSelectedElement, questionAndAnswerGroupedData, selectedElement]);


  useEffect(() => {
    console.log("prevSelElmAns", prevSelElmAns)
    if (!selectedElement) return;
    const elements = [
      ...document.querySelectorAll(".textInput"),
      ...document.querySelectorAll(".imageInput"),
      ...document.querySelectorAll(`.dateInput`),
      ...document.querySelectorAll(`.signInput`),
      ...document.querySelectorAll(`.tableInput`),
      ...document.querySelectorAll(`.containerInput`),
      ...document.querySelectorAll(`.iframeInput`),
      ...document.querySelectorAll(`.scaleInput`),
      ...document.querySelectorAll(`.newScaleInput`),
      ...document.querySelectorAll(`.cameraInput`),
      ...document.querySelectorAll(`.buttonInput`),
      ...document.querySelectorAll(`.dropdownInput`),
      ...document.querySelectorAll(`.emailButton`),
    ];

    elements.forEach(element => {
      if (prevSelElmAns.indexOf(element.id) === -1 && element.id !== selectedElement && !allowHighlight) {
        element.style.border = "none"
        if (selectedElement) {
          document.getElementById(selectedElement).style.border = "1ps solid red"
        }
      }
      else {
        if (selectedElement) {
          document.getElementById(selectedElement).style.border = "1ps solid red"
        }
        return
      }
    })

  }, [prevSelElmAns, selectedElement])
  const left_menu_size = document.getElementsByClassName('left_menu_wrapper')[0]?.getBoundingClientRect()
  // console.log("left_menu_size", left_menu_size);
  return (
    <div className="editSec">
      <Container fluid>
        <Row>
          <Col
            lg={1}
            className={`${actionName == "document" && "document_left_col"}`}
          >
            {actionName == "template" && (
              <div
                style={
                  actionName == "document"
                    ? { background: "#e3eeff" }
                    : { background: "#1c2b48" }
                }
                className="left_menu_wrapper scrollbar"
              >
                <LeftMenu />
              </div>
            )}
          </Col>
          <Col
            // style={{marginTop:window.innerWidth< && left_menu_size?.height}} 
            lg={sidebar ? 8 : 11} as="div" className="editSec_midSec">
            <MidSection />
          </Col>

          {/* <div style={{overflowY:"scroll"}}>s */}
          <Col
            style={sidebar ? { display: "block", 
            // height:`${window.innerHeight}px`
            } : { display: "none" }}
            lg={sidebar ? 3 : 0}
            as="div"
            className="editSec_rightMenu"
          >
            <RightMenu />
          </Col>
          {/* </div> */}
        </Row>
      </Container>
    </div>
  );
};
export default EditSection;
