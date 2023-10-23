import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useStateContext } from '../../contexts/contextProvider'

const ProgressLoader = () => {
 const { progress, setProgress } = useStateContext()
  return (
    <div>
      <LoadingBar
        height={4}
        color='blue'
        progress={progress}
        loaderSpeed={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <button style={{ visibility:"hidden"}} id='progress-100' onClick={() => setProgress(100)}>Complete</button>
      <br />
    </div>
  )
}

export default ProgressLoader