import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/createnotepage.css";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import Notification from "../components/Notification";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useAlert from "../hooks/useAlert";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function CreateNotePage() {
    let navigate = useNavigate();

    const { displayAlert, setDisplayAlert } = useAlert();
    const [alertInfo, setAlertInfo] = React.useState({
        message: "",
        severityColor: "",
    });
    const [noteInfo, setNoteInfo] = React.useState({
        title: "",
        tags: "",
        content: "",
    });

    function onTitleChange(event) {
        setNoteInfo({ ...noteInfo, title: event.target.value });
    }

    function onContentChange(event) {
        setNoteInfo({ ...noteInfo, content: event.target.value });
    }

    function onAsyncChange(value) {
        var tagStr = "";
        value.map((e) => {
            tagStr = tagStr + e.name + ",";
        });
        setNoteInfo({ ...noteInfo, tags: tagStr });
    }

    function onButtonPress(event) {
        if (noteInfo.title === "" || noteInfo.content === "") {
            setDisplayAlert({
                open: true,
                message: "Title and Content cannot be empty",
                severityColor: "error",
            });
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: noteInfo.title,
                    tags: noteInfo.tags,
                    content: noteInfo.content,
                    createdBy: "452afc04-d5df-4131-b744-93b13a0a772a",
                }),
            };
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/note`,
                requestOptions
            ).then((response) => {
                if (response.status == 200) {
                    setDisplayAlert({
                        open: true,
                        message: "Note created",
                        severityColor: "success",
                    });
                    navigate("/");
                } else {
                    setDisplayAlert({
                        open: true,
                        message: "Something went wrong",
                        severityColor: "error",
                    });
                }
            });
        }
    }

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [replaceTag, setReplaceTag] = React.useState(false);

    function onAutoCompleteChange(event) {
        let tagExists = false;
        options.map((tag) => {
            if (
                String(tag.name).toLowerCase() ===
                String(event.target).toLowerCase()
            ) {
                tagExists = true;
            }
        });
        if (!tagExists) {
            if (setReplaceTag) {
                setOptions(options.pop());
            }
            setOptions(options.concat([{ name: event.target.value }]));
            setReplaceTag(true);
        }
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                axios
                    .get(`${process.env.REACT_APP_ENDPOINT}/tag`)
                    .then((res) => {
                        setOptions(res.data);
                    });
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

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

                    <Autocomplete
                        multiple
                        id="asynchronous-demo"
                        sx={{ width: 300 }}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.name === value.name
                        }
                        getOptionLabel={(option) => option.name}
                        options={options}
                        loading={loading}
                        onChange={(event, value) => onAsyncChange(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={onAutoCompleteChange}
                                label="Tags"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />

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
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
                {displayAlert.open === true && <Notification />}
            </div>
        </div>
    );
}

export default CreateNotePage;
