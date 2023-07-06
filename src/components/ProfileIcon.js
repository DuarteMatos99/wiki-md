import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../styles/components/profileicon.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";

export default function ProfileIcon() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <div>
            <AccountCircleRoundedIcon
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="avatar"
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={"/profile/" + userInfo.id}>
                    <a>My account</a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => localStorage.removeItem("user")}>
                    <a href="/login">Logout</a>
                </MenuItem>
            </Menu>
        </div>
    );
}
