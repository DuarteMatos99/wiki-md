import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./profile/Profile";
import CreateNote from "./create-note/createNote";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-note" element={<CreateNote />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
