import { React, useState, useEffect } from "react";
import Panel from "./Panel";
import "../styles/components/recentpanels.css";

function RecentPanels() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch(`${process.env.REACT_APP_ENDPOINT}/note/getLatestFive`)
            .then((result) => result.json())
            .then((output) => {
                console.log(output);
                setNotes(output);
                console.log(output);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="recent-files">
            <h3 className="title">Recent Files</h3>
            <div className="panels-area">
                {notes.map((note) => {
                    return (
                        <Panel
                            id={note.id}
                            title={note.title}
                            key={note.id}
                            creatorId={note.createdBy.id}
                            creatorImage={note.createdBy.image}
                            creator={note.createdBy.username}
                            tags={note.tags}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RecentPanels;
