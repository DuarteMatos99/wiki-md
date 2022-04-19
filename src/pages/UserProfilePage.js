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
                setUserProfile(output);
                console.log(output);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="profilePage">
                <div>
                    <div className="image">
                        <img
                            src={userProfile.image}
                            alt="Failed to load"
                            width="200"
                            height="200"
                        ></img>
                    </div>
                    <div className="nameDisplay">
                        <div>
                            <div className="name">
                                <h2>{userProfile.name}</h2>
                            </div>
                            {userProfile.permLevel == 1 ? (
                            <div className="nameCheckmark">
                                <CheckCircleIcon />
                            </div>) : (
                                <div></div>
                            )}
                            
                        </div>
                        {`@${userProfile.username}`}
                    </div>
                </div>
                <div className="clearFloat"></div>
                <PanelsList profileId={window.location.pathname.split("/")[2]}/>
            </div>
        </div>
    );
}

export default UserProfilePage;
