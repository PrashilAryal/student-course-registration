import "./app.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {});
  return (
    <div className="app">
      <div className="app__header">
        <p className="app__header__company">Takeo</p>
        <p className="app__header__system">Student Course Registration</p>
      </div>
      <div className="app__body__menu">
        <NavBar />
      </div>
      <div className="app__body">
        <div className="app__body__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
