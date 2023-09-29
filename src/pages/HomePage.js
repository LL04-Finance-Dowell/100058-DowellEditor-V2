import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import EditSection from "../components/editSection/EditSection";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const HomePage = () => {
  // const params =useParams()
  // if(params){
  //   console.log("PARAMS",params);
  //   console.log =()=>{}
  // }
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("PARAAAAAAAMS", params.getAll());


 

  
  const navigate = useNavigate();
  // const params = [];

  // searchParams.forEach((value, key) => {
  //   params.push(`${key}`);
  // });
  // console.log("PARAAAAAAMS",params)
  //   if(params.includes("status")){
  //     navigate("/status");
  //   }

  const location = useLocation();


  useEffect(() => {
    const params = [];

  searchParams.forEach((value, key) => {
    params.push(`${key}`);
  });
    if(params.includes("status")){
      navigate("/status");
    } 

    console.log("PARAAAAAAMS",params)
    
  }, [location])

  // console.log("PARAAAAAAMS",params)
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
