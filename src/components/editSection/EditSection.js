import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
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
  } = useStateContext();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const { authorized, process_id } = decoded?.details;

  const newPageButton = document.querySelector(".new-page-btn");
  const actionName = decoded?.details?.action;
  const docMap = decoded?.details?.document_map;

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
          <Col lg={sidebar ? 8 : 11} as="div" className="editSec_midSec">
            <MidSection />
          </Col>

          <Col
            style={sidebar ? { display: "block" } : { display: "none" }}
            lg={sidebar ? 3 : 0}
            as="div"
            className="editSec_rightMenu"
          >
            <RightMenu />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EditSection;
