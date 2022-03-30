import Navbar from "../navbar/Navbar";
import RecentPanels from "../recent-panels/RecentPanels";
import Separator from "../separator/Separator";

function Dashboard() {
    return (
        <div>
            <Navbar />
            <RecentPanels />
            <Separator />
        </div>
    );
}

export default Dashboard;
