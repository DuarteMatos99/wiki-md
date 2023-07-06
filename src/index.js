import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { ThemeProvider } from "./context/ThemeProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <AlertProvider>
                <LoaderProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </LoaderProvider>
            </AlertProvider>
        </AuthProvider>
    </React.StrictMode>,
    rootElement
);
