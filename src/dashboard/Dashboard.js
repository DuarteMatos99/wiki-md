import Navbar from "../navbar/Navbar";
import RecentPanels from "../recent-panels/RecentPanels";
import Separator from "../separator/Separator";
import AllPanels from "../all-panels/allPanels";

function Dashboard() {
    return (
        <div>
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
        </div>
    );
}

export default Dashboard;
