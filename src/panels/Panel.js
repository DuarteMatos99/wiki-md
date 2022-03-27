import React from "react";
import "../styles/panels.css";

function Panel(props) {
    return (
        <div className="panel">
            <h2>{props.title}</h2>
            <p>date</p>
        </div>
    );
}

export default Panel;
