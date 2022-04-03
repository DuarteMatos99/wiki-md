import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/createnotepage.css";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import Notification from "../components/Notification";
import { AlertContext } from "../helper/Context";

function CreateNotePage() {
    let navigate = useNavigate();

    const { alertOpen, setAlertOpen } = useContext(AlertContext);
    const [alertInfo, setAlertInfo] = React.useState({
        message: "",
        severityColor: "",
    });
    const note = { title: "", content: "" };

    function onTitleChange(event) {
        note.title = event.target.value;
    }

    function onContentChange(event) {
        note.content = event.target.value;
    }

    function onButtonPress(event) {
        if (note.title === "" || note.content === "") {
            console.log(note);
            setAlertInfo({
                message: "Title and Content cannot be empty",
                severityColor: "error",
            });
            setAlertOpen(true);
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: note.title,
                    content: note.content,
                    createdBy: "9f2ce7fc-7608-4475-8952-590a63199fbe",
                }),
            };
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/note`,
                requestOptions
            ).then((response) => {
                if (response.status == 200) {
                    setAlertOpen(true);
                    navigate("/");
                } else {
                    setAlertOpen(true);
                }
            });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="create-note-page">
                <h1>Create Note</h1>
                <div className="new-note-form">
                    <div className="note-input-wrapper">
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            onChange={onTitleChange}
                        />
                    </div>
                    <br />
                    <div className="note-input-wrapper">
                        <Box sx={{ width: maxWidth, maxWidth: "100%" }}>
                            <TextField
                                fullWidth
                                label="Content"
                                multiline
                                rows={10}
                                id="fullWidth"
                                onChange={onContentChange}
                            />
                        </Box>
                    </div>
                    <Button
                        id="submit-note-button"
                        variant="contained"
                        onClick={onButtonPress}
                    >
                        Submit
                    </Button>
                </div>
                {alertOpen === true && <Notification info={alertInfo} />}
            </div>
        </div>
    );
}

export default CreateNotePage;
