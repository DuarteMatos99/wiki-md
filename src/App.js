import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import CreateNotePage from "./pages/CreateNotePage";
import DisplayNotePage from "./pages/DisplayNotePage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";

import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/" element={<DashboardPage />} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/create-note" element={<CreateNotePage />} />
                    <Route path="/note/:id" element={<DisplayNotePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
