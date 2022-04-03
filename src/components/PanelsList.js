import { React, useState, useEffect } from "react";
import "../styles/components/panelslist.css";

function PanelsList() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNotesCreatedBy?id=9f2ce7fc-7608-4475-8952-590a63199fbe`
        )
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
                console.log(output);
            })
            .catch((err) => console.error(err));
    }, []);

    console.log(notes);

    return (
        <div>
            {notes.map((note) => {
                return (
                    <div className="note-card">
                        <h2>{note.title}</h2>
                        {note.createdAt}
                    </div>
                );
            })}
        </div>
    );
}

export default PanelsList;
