import React from "react";
import "../styles/components/navbar.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <div className="logo">
                    <h4>
                        Wiki<span className="md">MD</span>
                    </h4>
                </div>
            </Link>
            <ul className="nav-links">
                <li>
                    <a>
                        Welcome, <span className="username">Duarte</span>
                    </a>
                </li>
                <li>
                    <Link to="/profile">
                        <AccountCircleRoundedIcon
                            className="avatar"
                            href="/profile"
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
