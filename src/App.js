import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import CreateNotePage from "./pages/CreateNotePage";
import DisplayNotePage from "./pages/DisplayNotePage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import EditNotePage from "./pages/EditNotePage";

import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/note/:id" element={<DisplayNotePage />} />
                <Route path="/profile/:id" element={<UserProfilePage />} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/create-note" element={<CreateNotePage />} />
                    <Route path="/edit-note/:id" element={<EditNotePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
