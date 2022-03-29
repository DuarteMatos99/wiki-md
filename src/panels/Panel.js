import React from "react";
import "../styles/panels.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import pic from "../avatar.png";

function Panel(props) {
    return (
        <div className="panel">
            {props.title.length > 22 ? (
                <h4>{`${props.title.slice(0, 22)}...`}</h4>
            ) : (
                <h4>{props.title}</h4>
            )}

            <div className="creator">
                <img src={pic} className="avatar" />
                <p>{props.creator}</p>
            </div>

            <div className="arrow">
                <ArrowForwardRoundedIcon />
            </div>
        </div>
    );
}

export default Panel;
