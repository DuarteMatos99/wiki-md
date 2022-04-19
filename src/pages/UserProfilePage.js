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
        fetch(`${process.env.REACT_APP_ENDPOINT}/user/getUserById?id=${userInfo.id}`)
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
                            <div className="nameCheckmark">
                                <CheckCircleIcon />
                            </div>
                        </div>
                        {`@${userProfile.username}`}
                    </div>
                </div>
                <div className="clearFloat"></div>
                <PanelsList />
            </div>
        </div>
    );
}

export default UserProfilePage;
