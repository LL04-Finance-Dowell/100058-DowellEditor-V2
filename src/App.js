import React from "react";
import { Routes,Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ThankYouPage from "./utils/redirectPages/ThankYouPage";

function App() {
  return (
    <div className="app">
      <Routes>  
              <Route path="/100058-DowellEditor-V2/status" element={<ThankYouPage />} />
              <Route exact path="/100058-DowellEditor-V2/" element={<HomePage />} />
       </Routes>
    </div>
  );
}

export default App;
