/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useStateContext } from "../../contexts/contextProvider";
import SelectAnsAndQuestion from "../selectAnsAndQuestion";
import useSelectedAnswer from "../../customHooks/useSelectedAnswers";

const EmailRightSideBar = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  const actionName = decoded?.details?.action;

  const mailBtn = document.querySelector(".focussed");

  const {
    formBorderSize,
    setFormBorderSize,
    formBorderColor,
    setFormBorderColor,
    setConfirmRemove, confirmRemove
  } = useStateContext()
  const [selectedType, setSelectedType] = useState('')
  // const [addedAns, setAddedAns] = useState([])
  const { addedAns, setAddedAns } = useSelectedAnswer()

  const [showSlider, setShowSlider] = useState(false);
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  function removeContainer() {
    if (document.querySelector(".focussedd").classList.contains("dropp")) {
      if (document.querySelector(".focussedd").hasChildNodes()) {
        const childLength =
          document.querySelector(".focussedd").children.length;
        for (let i = 0; i < childLength; i++) {
          document.querySelector(".focussedd").firstElementChild.remove();
        }
      }
    } else {
      document.querySelector(".focussedd").remove();
    }
  }
  const handleBorderSizeChange = (e) => {
    setFormBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${formBorderSize}px`;
  };

  const handleBorderColorChange = (e) => {
    setFormBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${formBorderColor}`;
  };
  const handleRangeBlur = (e) => {
    e.target.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      topic: "EditorMailComponent",
      toName: toName,
      fromName: fromName,
      toEmail: toEmail,
      fromEmail: fromEmail,
      subject: subject,
      email_body: message,
    };
    // Handle validations
    axios
      .post("https://100085.pythonanywhere.com/api/editor-component/", formData)
      .then((response) => {
        console.log(response);
        mailBtn.textContent = "Sent";
        mailBtn.style.backgroundColor = "green";
        toast.success("Email has been sent");
      });
    //alert("Mail sent!");
    console.log(formData);

    setMessage("");
    setSubject("");
    setToEmail("");
    setToName("");
    setFromName("");
    setFromEmail("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          padding: "5%",
          border: "1px solid #000",
          margin: "20px",
        }}
      >
        <form id="myForm">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              name="text"
              placeholder="To Name"
              value={toName}
              // value={emailInfo.name}
              style={{ width: "48%", padding: "5px" }}
              onChange={(e) => setToName(e.target.value)}
              // onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={toEmail}
              // value={emailInfo.email}
              style={{ width: "48%", padding: "5px" }}
              onChange={(e) => setToEmail(e.target.value)}
              // onChange={handleChange}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              name="text"
              placeholder="From Name"
              value={fromName}
              // value={emailInfo.name1}
              style={{ width: "48%", padding: "5px" }}
              onChange={(e) => setFromName(e.target.value)}
              // onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="From Email"
              value={fromEmail}
              // value={emailInfo.email1}
              style={{ width: "48%", padding: "5px" }}
              onChange={(e) => setFromEmail(e.target.value)}
              // onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={subject}
            // value={emailInfo.subject}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            onChange={(e) => setSubject(e.target.value)}
            // onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={message}
            // value={emailInfo.message}
            style={{ marginBottom: "10px", padding: "5px" }}
            onChange={(e) => setMessage(e.target.value)}
            // onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={{
              marginBottom: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              width: "100%",
              visibility: actionName == "document" ? "visible" : "hidden",
            }}
            onClick={handleSubmit}
          >
            Send Email
          </button>
        </form>
        <ToastContainer size={5} />
      </div>
      <hr />
      <Row className="pt-4">
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
              value={formBorderColor}
              onChange={handleBorderColorChange}
              id="color"
              style={{ border: "none", width: "10%", height: "15px" }}
            />
            <input
              type="range"
              min="-10"
              max="20"
              value={formBorderSize}
              onChange={handleBorderSizeChange}
              onBlur={handleRangeBlur}
              id="range"
              className="range-color"
            />
          </div>
        )}
      </Row>
      <hr />
      <SelectAnsAndQuestion
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        setAddedAns={setAddedAns}
        addedAns={addedAns} />
      <hr />
      <div className="d-flex justify-content-center">
        <Button
          variant="primary"
          // onClick={removeContainer}
          onClick={() => setConfirmRemove(!confirmRemove)}
          className="remove_container text-center mt-5"
        >
          Remove Container
        </Button>
      </div>
    </>
  );
};

export default EmailRightSideBar;
