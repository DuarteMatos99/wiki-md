import { React, useState, useEffect } from "react";
import Panel from "./Panel";
import "../styles/components/allpanels.css";
import Button from "@mui/material/Button";
import axios from "axios";

function AllPanels() {
    const [notes, setNotes] = useState([]);
    const [page, setCounter] = useState(0);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page}&itemsPerPage=4`
        )
            .then((result) => result.json())
            .then((output) => {
                setCounter(page + 1);
                setNotes(output);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleClick = () => {
        axios
            .get(
                `${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page}&itemsPerPage=4`
            )
            .then((res) => {
                setCounter(page + 1);
                setNotes(notes.concat(res.data));
            });
    };

    return (
        <div className="all-files">
            <h3 className="title">All Files</h3>
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
            <Button
                id="seeMoreButton"
                variant="contained"
                onClick={handleClick}
            >
                See More
            </Button>
        </div>
    );
}

export default AllPanels;
