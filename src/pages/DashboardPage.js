import Navbar from "../components/Navbar";
import RecentPanels from "../components/RecentPanels";
import Separator from "../components/Separator";
import AllPanels from "../components/AllPanels";

function DashboardPage() {
    return (
        <div>
            <Navbar />
            <RecentPanels />
            <Separator />
            <AllPanels />
        </div>
    );
}

export default DashboardPage;
