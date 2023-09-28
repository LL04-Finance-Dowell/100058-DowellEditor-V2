import React from "react";
import Header from "../components/header/Header";
import EditSection from "../components/editSection/EditSection";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const params =useParams()
  if(params){
    console.log("PARAMS",params);
    console.log =()=>{}
  }
  const homeElem = document.getElementById("homeID");
  return (
    <div className="home" id="homeID">
      <div className="home_header fixed">
        <Header />
      </div>
      <div className="home_leftmenu">
        <EditSection homeElem={homeElem} />
      </div>
    </div>
  );
};

export default HomePage;
