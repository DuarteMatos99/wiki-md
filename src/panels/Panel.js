import React from "react";
import "../styles/panels.css";

function Panel(props) {
    return (
        <div className="panel">
            <div className="background-title">
                {props.title.length > 17 ? (
                    <h2>{`${props.title.slice(0, 17)}...`}</h2>
                ) : (
                    <h2>{props.title}</h2>
                )}
            </div>
            <p>date</p>
        </div>
    );
}

export default Panel;
