import { React } from "react";
import Navbar from "../components/Navbar";
import RecentPanels from "../components/RecentPanels";
import Separator from "../components/Separator";
import AllPanels from "../components/AllPanels";
import NewNoteDial from "../components/NewNoteDial";
import Notification from "../components/Notification";
import useAlert from "../hooks/useAlert";
import "../styles/pages/dashboardpage.css";

function DashboardPage() {
    const { displayAlert, setDisplayAlert } = useAlert();
    return (
        <div className="dashboard-page">
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
            <NewNoteDial />
            {displayAlert.open === true && <Notification />}
        </div>
    );
}

export default DashboardPage;
