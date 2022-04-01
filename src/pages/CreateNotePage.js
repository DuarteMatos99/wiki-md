import React from "react";
import "../styles/pages/createnotepage.css";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function CreateNotePage() {

    const [open, setOpen] = React.useState(false);
    const note = {"title": "", "content": ""};

    function onTitleChange(event) {
        note.title = event.target.value;
    }

    function onContentChange(event) {
        note.content = event.target.value;
    }

    function onButtonPress(event) {
        if(note.title === "" || note.content === "") {
            setOpen(true);
        }
    }

    return (
        <div>
            <Navbar />
            <div class="create-note-page">
                <h1>Create Note</h1>
                <div class="new-note-form">
                    <div class="note-input-wrapper">
                        <TextField id="outlined-basic" label="Title" variant="outlined" onChange={onTitleChange}/>
                    </div>
                    <br />
                    <div class="note-input-wrapper">
                        <Box sx={{ width: maxWidth, maxWidth: "100%" }}>
                            <TextField fullWidth label="Content" multiline rows={10} id="fullWidth" onChange={onContentChange}/>
                        </Box>
                    </div>
                    <Button id="submit-note-button" variant="contained" onClick={onButtonPress}>Submit</Button>
                </div>
            </div>
            <div class="notification">
            <Box sx={{ width: '100%' }}>
                <Collapse in={open}>
                <Alert severity="error" action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={() => { setOpen(false);}}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                    } 
                    sx={{ mb: 2 }} >
                    You should fill both the title and content fields.
                </Alert>
                </Collapse>
            </Box>
            </div>
        </div>
    );
}

export default CreateNotePage;
