import React from "react";
import Topbar from "./layouts/Topbar";
import { Footer } from "./layouts/Footer";
import HomePage from "../pages/HomePage";

const Main_layout = ({ isLoggedIn, onLogin }) => {
  return (
    <>
      <Topbar isLoggedIn={isLoggedIn} onLogin={onLogin} />
      <HomePage />
      <Footer />
    </>
  );
};

export default Main_layout;