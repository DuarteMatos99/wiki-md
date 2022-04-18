import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../styles/components/profileicon.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function ProfileIcon() {
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
                    <a href="/profile">My account</a>
                </MenuItem>
                <MenuItem onClick={() => localStorage.removeItem("user")}>
                    <a href="/login">Logout</a>
                </MenuItem>
            </Menu>
        </div>
    );
}
