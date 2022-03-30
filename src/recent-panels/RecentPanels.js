import { React, useState, useEffect } from "react";
import Panel from "../panels/Panel";
import Separator from "../separator/Separator"
import "../styles/recentpanels.css";

function RecentPanels() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch(`${process.env.REACT_APP_ENDPOINT}/note`)
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="recent-files">
            <h4 className="title">Recent Files</h4>
            <div className="panels-area">
                {notes.map((note) => {
                    return <Panel title={note.title} key={note.id} />;
                })}
            </div>
            <br></br>
        </div>
    );
}

export default RecentPanels;
