import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assuming App is your root component
import './main.css'
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
