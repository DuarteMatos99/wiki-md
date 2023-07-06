import React, { useState } from "react";
import "../styles/components/navbar.css";
import { Link } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import appTheme from "../utils/Colors";
import ProfileIcon from "../components/ProfileIcon";
import Switch from '@mui/material/Switch';
import useTheme from "../hooks/useTheme";
import Theme from "../components/Theme";

const theme = appTheme();

function Navbar() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const { displayTheme, setDisplayTheme } = useTheme();
    // const [displayTheme, setDisplayTheme] = useState(false); 

    function onChangeSwitch(event) {
        localStorage.setItem("theme", JSON.stringify(!JSON.parse(localStorage.getItem("theme"))));
        console.log(displayTheme);
    }

    return (
        <nav className={displayTheme ? 'nav-black' : 'nav-white'}>
            <Link to="/">
                <div className="logo">
                    <h4>
                        Wiki<span className="md">MD</span>
                    </h4>
                </div>
            </Link>

            {userInfo?.username ? (
                <ul className="nav-links">
                    <li>
                        <Theme/>
                    </li>
                    <li>
                        <a>
                            Welcome,{" "}
                            <span className="username">
                                {userInfo?.username}
                            </span>
                        </a>
                    </li>
                    <li>
                        <ProfileIcon />
                    </li>
                </ul>
            ) : (
                <ul className="nav-links">
                    <ThemeProvider theme={theme}>
                        <li>
                            <Button
                                className="nav-button"
                                variant="contained"
                                href="/create-account"
                            >
                                Sign up
                            </Button>
                        </li>
                        <li>
                            <Button
                                className="nav-button"
                                variant="outlined"
                                href="/login"
                            >
                                Login
                            </Button>
                        </li>
                    </ThemeProvider>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
