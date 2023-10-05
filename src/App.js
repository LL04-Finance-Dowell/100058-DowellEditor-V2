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
// social media
// eyJhbGciOiJIUzI1NiJ9.eyJwcm9kdWN0X25hbWUiOiJTb2NpYWwgTWVkaWEgQXV0b21hdGlvbiIsImRldGFpbHMiOnsiY2x1c3RlciI6InNvY2lhbG1lZGlhIiwiZGF0YWJhc2UiOiJzb2NpYWxtZWRpYSIsImNvbGxlY3Rpb24iOiJzdGVwM19kYXRhIiwiZG9jdW1lbnQiOiJzdGVwM19kYXRhIiwidGVhbV9tZW1iZXJfSUQiOiIzNDU2Nzg5Nzc5OSIsImZ1bmN0aW9uX0lEIjoiQUJDREUiLCJmaWVsZCI6InVzZXJfaWQ6IHJlcXVlc3Quc2Vzc2lvblsndXNlcl9pZCddIiwiZmxhZyI6ImVkaXRpbmciLCJuYW1lIjoiVGVzdGluZyBRIGFuZCBBIiwiY29tbWFuZCI6InVwZGF0ZSIsInVwZGF0ZV9maWVsZCI6eyJvcmRlcl9ub3MiOjIxfX19.SGC-GQmU1-UkCmiKrPowj1_0PyxTwekwUyc0zWEIvxo
// http://localhost:3000/?token=eyJhbGciOiJIUzI1NiJ9.eyJwcm9kdWN0X25hbWUiOiJTb2NpYWwgTWVkaWEgQXV0b21hdGlvbiIsImRldGFpbHMiOnsiY2x1c3RlciI6InNvY2lhbG1lZGlhIiwiZGF0YWJhc2UiOiJzb2NpYWxtZWRpYSIsImNvbGxlY3Rpb24iOiJzdGVwM19kYXRhIiwiZG9jdW1lbnQiOiJzdGVwM19kYXRhIiwidGVhbV9tZW1iZXJfSUQiOiIzNDU2Nzg5Nzc5OSIsImZ1bmN0aW9uX0lEIjoiQUJDREUiLCJmaWVsZCI6InVzZXJfaWQ6IHJlcXVlc3Quc2Vzc2lvblsndXNlcl9pZCddIiwiZmxhZyI6ImVkaXRpbmciLCJuYW1lIjoiVGVzdGluZyBRIGFuZCBBIiwiY29tbWFuZCI6InVwZGF0ZSIsInVwZGF0ZV9maWVsZCI6eyJvcmRlcl9ub3MiOjIxfX19.SGC-GQmU1-UkCmiKrPowj1_0PyxTwekwUyc0zWEIvxo

// workflowai
// http://localhost:3000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9kdWN0X25hbWUiOiJ3b3JrZmxvd2FpIiwiZGV0YWlscyI6eyJfaWQiOiI2NDhjMGRjODJhMmI0NzZlMmMzYjdiMWYiLCJmaWVsZCI6InRlbXBsYXRlX25hbWUiLCJhY3Rpb24iOiJ0ZW1wbGF0ZSIsImNsdXN0ZXIiOiJEb2N1bWVudHMiLCJkYXRhYmFzZSI6IkRvY3VtZW50YXRpb24iLCJjb2xsZWN0aW9uIjoiVGVtcGxhdGVSZXBvcnRzIiwiZG9jdW1lbnQiOiJ0ZW1wbGF0ZXJlcG9ydHMiLCJ0ZWFtX21lbWJlcl9JRCI6IjIyNjg5MDQ0NDMzIiwiZnVuY3Rpb25fSUQiOiJBQkNERSIsImNvbW1hbmQiOiJ1cGRhdGUiLCJmbGFnIjoiZWRpdGluZyIsInVwZGF0ZV9maWVsZCI6eyJ0ZW1wbGF0ZV9uYW1lIjoiIiwiY29udGVudCI6IiIsInBhZ2UiOiIifX19.NFLaziXpkvd0g4dycfm14-0M8zQy_yd0D2BbewUwy-Q