import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";
import { LoaderProvider } from "./context/LoaderProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <AlertProvider>
                <LoaderProvider>
                    <App />
                </LoaderProvider>
            </AlertProvider>
        </AuthProvider>
    </React.StrictMode>,
    rootElement
);
