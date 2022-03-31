import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import Profile from "./profile/Profile";
import { Route, Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Dashboard />
        </div>
    );
}

export default App;
