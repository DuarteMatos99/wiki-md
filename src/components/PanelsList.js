import { React, useState, useEffect } from "react";
import "../styles/components/panelslist.css";

function PanelsList(props) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNotesCreatedBy?id=${props.profileId}`
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
                        <div>
                        {note.tags.split(",").slice(0,note.tags.split(",").length-1).map((tag) => {
                            return <p className="tag">{`#${tag}`}</p>;
                        })}
                        </div>
                        {note.createdAt}
                    </div>
                );
            })}
        </div>
    );
}

export default PanelsList;
