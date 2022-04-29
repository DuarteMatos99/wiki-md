import { React, useState, useEffect } from "react";
import "../styles/pages/displaynotepage.css";
import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import MarkdownWikiMD from "../components/MarkdownWikiMD";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Loader from "../components/Loader"
import useLoader from "../hooks/useLoader";

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function DisplayNotePage() {
    const [note, setNotes] = useState([]);
    const { displayLoader, setDisplayLoader } = useLoader();
    const id_from_url = window.location.pathname.split("/")[2];

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
    const tags = note?.tags?.split(",").filter(String);
    return (
        <div>
            <Navbar />
            <Loader />
            {!displayLoader &&
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
                <Separator></Separator>
                <MarkdownWikiMD>{note.content}</MarkdownWikiMD>
                <p>{note.createdBy?.username}</p>
            </div>
            }
        </div>
    );
}

export default DisplayNotePage;
