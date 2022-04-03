import { useState } from "react";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import CreateNotePage from "./pages/CreateNotePage";
import DisplayNotePage from "./pages/DisplayNotePage";
import { AlertContext } from "./helper/Context";

function App() {
    const [alertOpen, setAlertOpen] = useState(false);
    return (
        <AlertContext.Provider value={{ alertOpen, setAlertOpen }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/create-note" element={<CreateNotePage />} />
                    <Route path="/note/:id" element={<DisplayNotePage />} />
                </Routes>
            </BrowserRouter>
        </AlertContext.Provider>
    );
}

export default App;
