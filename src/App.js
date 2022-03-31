import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./navbar/Navbar";
import UserPage from "./user-profile/UserPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/user-profile" element={<UserPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
