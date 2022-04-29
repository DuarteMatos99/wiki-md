import { React, useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import "../styles/pages/displaynotepage.css";
import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import MarkdownWikiMD from "../components/MarkdownWikiMD";
import useLoader from "../hooks/useLoader";
import RequireLoader from "../components/RequireLoader";

function DisplayNotePage() {
    const [note, setNotes] = useState([]);
    const { setDisplayLoader } = useLoader();

    const id_from_url = window.location.pathname.split("/")[2];
    const tags = note?.tags?.split(",").filter(String);

    useEffect(() => {
        setDisplayLoader(true);
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNoteById?id=${id_from_url}`
        )
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
                setDisplayLoader(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <RequireLoader>
                <div className="display-note-page">
                    <h1 className="display-note-page-title">{note.title}</h1>
                    <IconButton href={`../edit-note/${id_from_url}`}>
                        <EditIcon />
                    </IconButton>
                    <div>
                        {tags?.map((tag) => {
                            return <a className="display-note-tag">{tag}</a>;
                        })}
                    </div>
                    <Separator />
                    <MarkdownWikiMD>{note.content}</MarkdownWikiMD>
                    <p>{note.createdBy?.username}</p>
                </div>
            </RequireLoader>
        </div>
    );
}

export default DisplayNotePage;
