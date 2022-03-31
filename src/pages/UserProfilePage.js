import React from "react";
import "../styles/pages/userprofilepage.css";
import Navbar from "../components/Navbar";
import ListPanels from "../components/PanelsList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function UserProfilePage() {
    return (
        <div>
            <Navbar />
            <div class="profilePage">
                <div>
                    <div class="image">
                        <img
                            src="https://i.imgur.com/bQvuv1v.jpg"
                            alt="Failed to load"
                            width="200"
                            height="200"
                        ></img>
                    </div>
                    <div class="nameDisplay">
                        <div>
                            <div class="name">
                                <h2>Tiago Alexandre </h2>
                            </div>
                            <div class="nameCheckmark">
                                <CheckCircleIcon />
                            </div>
                        </div>
                        @J1mp
                    </div>
                </div>
                <div class="clearFloat"></div>
                <ListPanels />
            </div>
        </div>
    );
}

export default UserProfilePage;
