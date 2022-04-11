import { React, useContext } from "react";
import Navbar from "../components/Navbar";
import RecentPanels from "../components/RecentPanels";
import Separator from "../components/Separator";
import AllPanels from "../components/AllPanels";
import NewNoteDial from "../components/NewNoteDial";
import Notification from "../components/Notification";
import { AlertContext } from "../helper/Context";
import "../styles/pages/dashboardpage.css";

function DashboardPage() {
    const { alertOpen, setAlertOpen } = useContext(AlertContext);
    return (
        <div className="dashboard-page">
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
            <NewNoteDial />
            {alertOpen === true && (
                <Notification
                    info={{ message: "Note created", severityColor: "success" }}
                />
            )}
        </div>
    );
}

export default DashboardPage;
