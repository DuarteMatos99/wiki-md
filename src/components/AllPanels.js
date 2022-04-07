import { React, useState, useEffect } from "react";
import Panel from "./Panel";
import "../styles/components/allpanels.css";
import Button from "@mui/material/Button";

function AllPanels() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ENDPOINT}/note/getLatestFive`)
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
            })
            .catch((err) => console.error(err));
    }, []);

    function handleClick(e) {
        const data = { page: 4, itemsPerPage: 5 };

        //POST request with body equal on data in JSON format
        fetch(`${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
                console.log("Success:", data);
            })
            //Then with the error genereted...
            .catch((error) => {
                console.error("Error:", error);
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
                onClick={handleClick}
            >
                See More
            </Button>
        </div>
    );
}

export default AllPanels;
