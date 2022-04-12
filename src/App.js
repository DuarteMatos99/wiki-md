import { useState } from "react";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import CreateNotePage from "./pages/CreateNotePage";
import DisplayNotePage from "./pages/DisplayNotePage";
import LoginPage from "./pages/LoginPage";
import { AlertContext } from "./helper/Context";
import CreateAccountPage from "./pages/CreateAccountPage";

function App() {
    const [alertOpen, setAlertOpen] = useState(false);
    return (
        <AlertContext.Provider value={{ alertOpen, setAlertOpen }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/create-note" element={<CreateNotePage />} />
                    <Route path="/note/:id" element={<DisplayNotePage />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                </Routes>
            </BrowserRouter>
        </AlertContext.Provider>
    );
}

export default App;
