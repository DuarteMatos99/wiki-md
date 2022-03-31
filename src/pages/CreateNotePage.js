import React from "react";
import "../styles/pages/createnotepage.css";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";

function CreateNotePage() {
    return (
        <div>
            <Navbar />
            <div class="create-note-page">
                <h1>Create Note</h1>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                />
                <br />
                <Box sx={{ width: maxWidth, maxWidth: "100%" }}>
                    <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={10}
                        id="fullWidth"
                    />
                </Box>
                <Button variant="contained">Submit</Button>
            </div>
        </div>
    );
}

export default CreateNotePage;
