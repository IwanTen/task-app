import { useState, useEffect } from "react";
import "./styles/style.css";
import Project from "./pages/Project";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <Project />
    </div>
  );
};

export default App;
