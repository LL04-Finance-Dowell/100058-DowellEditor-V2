import React from "react";
import { Routes,Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ThankYouPage from "./utils/redirectPages/ThankYouPage";

function App() {
  return (
    <div className="app">
      <Routes>  
              <Route path="/status" element={<ThankYouPage />} />
              <Route exact path="/" element={<HomePage />} />
       </Routes>
    </div>
  );
}

export default App;
