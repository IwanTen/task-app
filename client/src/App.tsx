// import { useState, useEffect } from "react";
import "./styles/style.css";
import { ProjectPage, LandingPage } from "./pages";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <ProjectPage />
    </div>
  );
};

export default App;
