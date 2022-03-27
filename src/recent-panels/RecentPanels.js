import { React, useState, useEffect } from "react";
import Panel from "../panels/Panel";
import "../styles/recentpanels.css";

function RecentPanels() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch("http://46.189.210.75:9091/note")
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
        </div>
    );
}

export default RecentPanels;
