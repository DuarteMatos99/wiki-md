import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/components/panelslist.css";
import useTheme from "../hooks/useTheme";


function PanelsList(props) {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const [notes, setNotes] = useState([]);
    const { displayTheme, setDisplayTheme } = useTheme();

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
        <div className="note-card-list-wrapper">
            {notes.map((note) => {
                return (
                    <Link to={"/note/" + note.id}>
                    <div className="note-card">
                        <h2>{note.title}</h2>
                        <div>
                        {note.tags.split(",").slice(0,note.tags.split(",").length-1).map((tag) => {
                            return <p className="tag">{`#${tag}`}</p>;
                        })}
                        </div>
                        {note.createdAt}
                    </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default PanelsList;
