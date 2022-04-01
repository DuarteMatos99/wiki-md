import Navbar from "../components/Navbar";
import RecentPanels from "../components/RecentPanels";
import Separator from "../components/Separator";
import AllPanels from "../components/AllPanels";
import NewNoteDial from "../components/NewNoteDial";


function DashboardPage() {

    return (
        <div>
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
            <NewNoteDial />
        </div>
    );
}

export default DashboardPage;
