import { React, useState, useEffect } from "react";
import "../styles/pages/displaynotepage.css";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const tags = note?.tags?.split(",").filter(String);
    console.log(tags);

    return (
        <div>
            <Navbar />
            <div className="display-note-page">
                <h1>{note.title}</h1>

                {tags?.map((tag) => {
                    return <a className="display-note-tag">{tag}</a>;
                })}

                <ReactMarkdown escapeHtml={false} remarkPlugins={[remarkGfm]}>
                    {note.content}
                </ReactMarkdown>
                <p>{note.createdBy}</p>
            </div>
        </div>
    );
}

export default DisplayNotePage;
