import { React, useState, useEffect } from "react";
import Panel from "./Panel";
import "../styles/components/allpanels.css";
import Button from "@mui/material/Button";
import axios from "axios";

function AllPanels() {
    const [notes, setNotes] = useState([]);
    const [page, setCounter] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page}&itemsPerPage=5`)
            .then((result) => result.json())
            .then((output) => {
                setCounter(page+1)
                setNotes(output);
            })
            .catch((err) => console.error(err));
    }, []);

    function getNotesByPage(e) {
        setNotes(notes.concat(e));
        console.log(notes);
    }

    const update = () => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page}&itemsPerPage=5`)
             .then((res)=> {
                console.log(`${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page}&itemsPerPage=5`);
                setCounter(page+1);
                getNotesByPage(res.data);
             });
    }    

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
                            creator={note.createdBy}
                        />
                    );
                })}
            </div>
            <Button
                id="seeMoreButton"
                variant="contained"
                onClick={update}>
                See More
            </Button>
        </div>
    );
}

export default AllPanels;
