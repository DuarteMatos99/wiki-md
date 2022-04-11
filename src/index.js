import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    rootElement
);
