import { React, useState, useEffect } from "react";
import Panel from "./Panel";
import "../styles/components/allpanels.css";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from "axios";
import useTheme from "../hooks/useTheme";

function AllPanels() {
    const [notes, setNotes] = useState([]);
    const [page, setCounter] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const { displayTheme, setDisplayTheme } = useTheme();

    useEffect(() => {
        if(searchTerm == '') {
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${0}&itemsPerPage=4&filter=${searchTerm}`
            )
                .then((result) => result.json())
                .then((output) => {
                    setNotes(output);
                    setCounter(0);
                })
                .catch((err) => console.error(err));
        } else {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm)
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${0}&itemsPerPage=4&filter=${searchTerm}`
            )
                .then((result) => result.json())
                .then((output) => {
                    setNotes(output);
                    setCounter(0);
                })
                .catch((err) => console.error(err));
          }, 800)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [searchTerm]);

    const handleClick = () => {
        axios.get(
            `${process.env.REACT_APP_ENDPOINT}/note/getNotesByPage?page=${page+1}&itemsPerPage=4&filter=${searchTerm}`
        )
        .then((res) => {
            setNotes(notes.concat(res.data));
            setCounter(page + 1);
        });
    };

    return (
        <div className={displayTheme ? "all-files-black" : "all-files"}>
            <div>
                <div className="all-files-title-wrapper">
                    <div>
                        <h3 className="title">All Files</h3>
                    </div>
                </div>
                <div className="all-files-search-wrapper">
                    <TextField
                    fullWidth
                    id="standard-search"
                    label="Search"
                    type="search"
                    variant="standard"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="panels-area">
                {notes.map((note) => {
                    return (
                        <Panel
                            noteId={note.id}
                            title={note.title}
                            key={note.id}
                            creatorId={note.createdBy.id}
                            creatorImage={note.createdBy.image}
                            creator={note.createdBy.username}
                            createdAt={note.createdAt}
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
