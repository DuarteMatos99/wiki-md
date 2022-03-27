import React from "react";
import "../styles/navbar.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <h4>
                    Wiki<span className="md">MD</span>
                </h4>
            </div>
            <ul className="nav-links">
                <li>
                    <a>
                        Welcome, <span className="username">Duarte</span>
                    </a>
                </li>
                <li>
                    <a>
                        <AccountCircleRoundedIcon className="avatar" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
