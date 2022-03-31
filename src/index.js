import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import CreateNotePage from "./pages/CreateNotePage";
import DisplayNotePage from "./pages/DisplayNotePage";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/create-note" element={<CreateNotePage />} />
            <Route path="/note/:id" element={<DisplayNotePage />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
