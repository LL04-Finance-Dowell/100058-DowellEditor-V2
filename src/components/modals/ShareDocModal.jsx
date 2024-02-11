import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import "./shareDocModle.css";

const ShareDocModal = ({
  openModal,
  toName,
  setToName,
  toEmail,
  setToEmail,
  // froName,
  // setFroName,
  // froEmail,
  // setFroEmail,
  subject,
  setSubject,
  message,
  setMessage,
  handleShare,
}) => {
  return (
    <section className="modal_sect">
      <div className="modal-content">
        <div>
          <span className="close" onClick={() => openModal(false)}>
            &times;
          </span>
        </div>
        <h2>Share Document</h2>
        <Container fluid>
          <form>
            <Row>
              <Col>
                <label>
                  To Name:
                  <input
                    type="text"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                  />
                </label>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5rem" }}>
              <Col>
                <label>
                  To Email:
                  <input
                    type="email"
                    value={toEmail}
                    onChange={(e) => setToEmail(e.target.value)}
                  />
                </label>
              </Col>
            </Row>

            {/* <Row>
                            <Col>
                                <label>
                                    From Name:
                                    <input type="text" value={froName} onChange={(e) => setFroName(e.target.value)} />
                                </label>
                            </Col>
                        </Row> */}

            {/* <Row>
                            <Col>
                                <label>
                                    From Email:
                                    <input type="email" value={froEmail} onChange={(e) => setFroEmail(e.target.value)} />
                                </label>
                            </Col>
                        </Row> */}

            <Row style={{ marginTop: "0.5rem", width: "50rem" }}>
              <Col>
                <label>
                  Subject:
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </label>
              </Col>
            </Row>

            <Row style={{ marginTop: "0.5rem" }}>
              <Col>
                <label>Message</label>
                <textarea
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message here"
                ></textarea>
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  style={{
                    backgroundColor: "#0e1524ff",
                    marginTop: "0.5rem",
                    color: "white",
                  }}
                  type="button"
                  onClick={handleShare}
                >
                  Share
                </button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </section>
  );
};

export default ShareDocModal;
