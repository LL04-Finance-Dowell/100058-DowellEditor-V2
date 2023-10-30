import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useStateContext } from '../../contexts/contextProvider'
import { useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProgressLoader = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");


  var decoded = jwt_decode(token);

  const actionName = decoded.details.action 
 const { progress, setProgress } = useStateContext()
  return (
    <div>
      <LoadingBar
        height={4}
        color={actionName == "template" ? "blue" : "green"}
        progress={progress}
        loaderSpeed={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <button style={{ visibility:"hidden"}} id='progress-100' onClick={() => setProgress(100)}>Complete</button>
      <button style={{ visibility:"hidden"}} id='progress-50' onClick={() => setProgress( progress + 50)}>add 50</button>
      <br />
    </div>
  )
}

export default ProgressLoader