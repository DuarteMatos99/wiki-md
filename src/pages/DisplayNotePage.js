import { React, useState, useEffect } from "react";
import "../styles/pages/displaynotepage.css";
import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import MarkdownWikiMD from "../components/MarkdownWikiMD";

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

    const tags = note?.tags?.split(",").filter(String);

    return (
        <div>
            <Navbar />
            <div className="display-note-page">
                <h1 className="display-note-page-title">{note.title}</h1>
                <div>
                    {tags?.map((tag) => {
                        return <a className="display-note-tag">{tag}</a>;
                    })}
                </div>
                <Separator></Separator>
                <MarkdownWikiMD>{note.content}</MarkdownWikiMD>
                <p>{note.createdBy}</p>
            </div>
        </div>
    );
}

export default DisplayNotePage;
