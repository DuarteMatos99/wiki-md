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
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom"; 

function DashboardPage() {
    const navigate = useNavigate();

    const { displayAlert, setDisplayAlert } = useAlert();
    const { displayTheme, setDisplayTheme } = useTheme();

    let dashboardIcon = <EditIcon/>
    let dashboardOptionList = [{ name: "Create New Note",
                                icon: <AddIcon/>,
                                linkTo: "../create-note",
                                onClickFunc: navigateToCreatePage}]

    function navigateToCreatePage() {
        navigate(`../create-note`);
    }

    return (
        <div className={displayTheme ? 'dashboard-page-black' : 'dashboard-page-white'}>
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
