import { React, useState, useEffect } from "react";

function DisplayNotePage() {
    const [note, setNotes] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNoteById?id=${
                window.location.pathname.split("/")[2]
            }`
        )
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
            })
            .catch((err) => console.error(err));
    }, []);

    console.log(note);

    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.id}</p>
            <p>{note.tagUUIDS}</p>
            <p>{note.content}</p>
            <p>{note.createdBy}</p>
        </div>
    );
}

export default DisplayNotePage;
