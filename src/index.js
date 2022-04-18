import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </AuthProvider>
    </React.StrictMode>,
    rootElement
);
