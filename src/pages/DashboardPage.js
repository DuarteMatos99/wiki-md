import { React } from "react";
import Navbar from "../components/Navbar";
import RecentPanels from "../components/RecentPanels";
import Separator from "../components/Separator";
import AllPanels from "../components/AllPanels";
import NewNoteDial from "../components/NewNoteDial";
import Notification from "../components/Notification";
import useAlert from "../hooks/useAlert";
import "../styles/pages/dashboardpage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

function DashboardPage() {
    const { displayAlert, setDisplayAlert } = useAlert();
    let dashboardIcon = <EditIcon/>
    let dashboardOptionList = [{ name: "Create New Note",
                                icon: <AddIcon/>,
                                linkTo: "../create-note"}]

    return (
        <div className="dashboard-page">
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
            <NewNoteDial icon={dashboardIcon} optionList={dashboardOptionList}/>
            {displayAlert.open === true && <Notification />}
        </div>
    );
}

export default DashboardPage;
