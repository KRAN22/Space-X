import React from "react";
import { Header } from "./Component/Header/Header";
import "./styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import CustomRouter from "./CustomRouter";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <CustomRouter />
      </Router>
    </div>
  );
}

export default App;
