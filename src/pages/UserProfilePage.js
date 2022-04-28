import { React, useState, useEffect } from "react";
import "../styles/pages/userprofilepage.css";
import Navbar from "../components/Navbar";
import PanelsList from "../components/PanelsList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function UserProfilePage() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [userProfile, setUserProfile] =  useState({});

    useEffect(() => {
        // Update the document title using the browser API
        fetch(`${process.env.REACT_APP_ENDPOINT}/user/getUserById?id=${window.location.pathname.split("/")[2]}`)
            .then((result) => result.json())
            .then((output) => {
                console.log(output);
                setUserProfile(output);
            })
            .catch((err) => console.error(err));
    }, []);

    function permissionTitle(perm) {
        let title = ""
        if(perm == 0) {
            title = "User";
        } else if(perm == 1) {
            title = "Admin"
        } else if(perm == 2) {
            title = "Owner";
        }
        return title;
    }

    return (
        <div>
            <Navbar />
            <div className="profilePage">
                <div class="user-card">
                    <div className="image">
                        <img
                            src={userProfile.user?.image}
                            alt="Failed to load"
                            width="200"
                            height="200"
                        ></img>
                    </div>
                    <div className="nameDisplay">
                        <div>
                            <div className="name">
                                <h2>{userProfile.user?.name}</h2>
                            </div>
                            {userProfile.permLevel == 1 ? (
                            <div className="nameCheckmark">
                                <CheckCircleIcon />
                            </div>) : (
                                <div></div>
                            )}
                            
                        </div>
                        {`@${userProfile.user?.username}`}
                    </div>
                </div>
                <div class="user-card-stat">
                    <p>Member since {userProfile.created_at}</p>
                    <p>Created {userProfile.count_cards} cards</p>
                    <p>{permissionTitle(userProfile.user?.permLevel)}</p>
                </div>
                <div className="clearFloat"></div>
                <PanelsList profileId={window.location.pathname.split("/")[2]}/>
            </div>
        </div>
    );
}

export default UserProfilePage;
