import React from "react";
import { Routes, Route } from "react-router-dom";
import Launches from "./Component/launches/Launches";
import WrappedLaunchView from "./launchView/LaunchView";

function CustomRouter() {
  return (
    <Routes>
      <Route path="/" element={<Launches />} />
      <Route path="/launch/:flight_number" element={<WrappedLaunchView />} />
    </Routes>
  );
}

export default CustomRouter;
