import React from "react";
import "../styles/panels.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function Panel(props) {
    return (
        <div className="panel">
            {props.title.length > 22 ? (
                <h4>{`${props.title.slice(0, 22)}...`}</h4>
            ) : (
                <h4>{props.title}</h4>
            )}

            <div className="creator">
                <img src="https://i.imgur.com/bQvuv1v.jpg" className="avatar" />
                <p>{props.creator}</p>
            </div>

            <div className="arrow">
                <ArrowForwardRoundedIcon />
            </div>
        </div>
    );
}

export default Panel;
