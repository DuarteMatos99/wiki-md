import React from "react";
import axios from "axios";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import CodeIcon from "@mui/icons-material/Code";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Loader from "../components/Loader";

import "../styles/pages/createnotepage.css";
import Notification from "../components/Notification";
import useAlert from "../hooks/useAlert";
import MarkdownWikiMD from "../components/MarkdownWikiMD.js";
import useLoader from "../hooks/useLoader";
import RequireLoader from "../components/RequireLoader";

function EditNotePage() {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const { setDisplayLoader } = useLoader();
    const { displayAlert, setDisplayAlert } = useAlert();

    const [noteInfo, setNoteInfo] = React.useState({
        content: "",
        tags: [],
        title: "",
    });
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [replaceTag, setReplaceTag] = React.useState(false);
    const [drawerState, setDrawerState] = React.useState(false);
    const [uploadFileName, setUploadFileName] = React.useState(" Upload Image");
    const [imageBase64, setImage] = React.useState("image");
    const loading = open && options.length === 0;

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function addHashtag(event) {
        setNoteInfo({
            ...noteInfo,
            content: noteInfo.content.replace(
                window.getSelection().toString(),
                "# " + window.getSelection().toString()
            ),
        });
    }

    function addCodeBlock(event) {
        setNoteInfo({
            ...noteInfo,
            content: noteInfo.content.replace(
                window.getSelection().toString(),
                "```\n " + window.getSelection().toString() + "\n```"
            ),
        });
    }

    function addBlock(event) {
        let tmp = "";
        window
            .getSelection()
            .toString()
            .split("\n")
            .map((line) => {
                console.log(line);
                tmp += "> " + line + "\n";
            });
        setNoteInfo({
            ...noteInfo,
            content: noteInfo.content.replace(window.getSelection(), tmp),
        });
    }

    const getDataNote = () => {
        setDisplayLoader(true);

        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNoteById?id=${
                window.location.pathname.split("/")[2]
            }`
        )
            .then((result) => result.json())
            .then((output) => {
                const tags = output.tags.split(/[,]/).filter(Boolean);
                setNoteInfo({
                    ...output,
                    tags: tags.map((value) => {
                        return { name: value };
                    }),
                });
                setDisplayLoader(false);
            })
            .catch((err) => console.error(err));
    };

    const getTagsToOptions = () => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
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
    };

    function getDefaultValueTags() {
        return noteInfo.tags.map((index, value) => noteInfo.tags[value]);
    }

    const toggleDrawer = (drawerState, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setDrawerState(open);
    };

    function onTitleChange(event) {
        setNoteInfo({ ...noteInfo, title: event.target.value });
    }

    function onContentChange(event) {
        setNoteInfo({ ...noteInfo, content: event.target.value });
    }

    function onButtonPress(event) {
        if (noteInfo.title === "" || noteInfo.content === "") {
            setDisplayAlert({
                open: true,
                message: "Title and Content cannot be empty",
                severityColor: "error",
            });
        } else {
            let tags_string = "";
            for (let i = 0; i < noteInfo.tags.length; i++) {
                tags_string += `${noteInfo.tags[i].name.trim()},`;
            }
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: noteInfo.title,
                    tags: tags_string,
                    content: noteInfo.content,
                    createdBy: userInfo.id,
                    id: noteInfo.id,
                }),
            };
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/note`,
                requestOptions
            ).then((response) => {
                if (response.status == 200) {
                    setDisplayAlert({
                        open: true,
                        message: "Note updated",
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
            if (replaceTag) {
                setOptions(options.pop());
            }
            // TODO add logic to not allow spaces in tags
            setOptions(options.concat([{ name: event.target.value }]));
            setReplaceTag(true);
        }
    }

    function uploadNotePicture(event) {
        setUploadFileName(" " + String(event.clipboardData.files[0]).replace("C:\\fakepath\\", ""));
        const file = event.clipboardData.files[0];
        const base64 = convertBase64(file);
        base64.then(function(value) {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              image: value,
            }),
          };
          setDisplayLoader(true);
          fetch(`${process.env.REACT_APP_ENDPOINT}/image/saveImage`, requestOptions)
          .then((result) => result.json())
          .then((output) => {
            setNoteInfo({
              ...noteInfo,
              content: noteInfo.content + `![](${output.id})`
            });
            setDisplayLoader(false);
          })
          .catch((err) => console.error(err));
        })
    }

    React.useEffect(() => {
        getDataNote();
    }, []);

    React.useEffect(() => {
        getTagsToOptions();
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <div>
            <Navbar />
            <Loader/>
            <div className="create-note-page">
                <h1>Edit Note</h1>
                <div className="new-note-form">
                    <div className="note-input-wrapper">
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            value={noteInfo.title}
                            onChange={onTitleChange}
                        />
                    </div>

                    <br />

                    <RequireLoader>
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
                            defaultValue={getDefaultValueTags()}
                            loading={loading}
                            onChange={(event, value) =>
                                setNoteInfo({ ...noteInfo, tags: value })
                            }
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
                    </RequireLoader>

                    <br />

                    <div className="note-input-wrapper">
                        <Box sx={{ width: maxWidth, maxWidth: "100%" }}>
                            <TextField
                                value={noteInfo.content}
                                fullWidth
                                label="Content"
                                multiline
                                rows={12}
                                id="fullWidth"
                                onChange={onContentChange}
                                onPaste={uploadNotePicture}
                            />
                        </Box>
                    </div>
                    <IconButton onClick={addHashtag} aria-label="hashtag">
                        <TagIcon />
                    </IconButton>

                    <IconButton onClick={addCodeBlock} aria-label="hashtag">
                        <CodeIcon />
                    </IconButton>

                    <IconButton onClick={addBlock} aria-label="hashtag">
                        <ArrowRightIcon />
                    </IconButton>

                    <IconButton
                        onClick={toggleDrawer(drawerState, true)}
                        aria-label="preview"
                    >
                        <VisibilityIcon />
                    </IconButton>

                    <Drawer
                        id="create-note-drawer"
                        anchor="a"
                        open={drawerState}
                        onClose={toggleDrawer(drawerState, false)}
                        >
                        <div class="close-create-note-drawer-wrapper">
                            <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={toggleDrawer(drawerState, false)}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                            <div>
                                <div class="create-note-markdown-textfield">
                                <TextField fullWidth
                                value={noteInfo.content}
                                multiline
                                id="fullWidth"
                                onChange={onContentChange}
                                onPaste={uploadNotePicture}/>
                                </div>
                                <div class="create-note-markdown-display">
                                <MarkdownWikiMD id="markdown-display">{noteInfo.content}</MarkdownWikiMD>
                            </div>
                        </div> 
                    </Drawer>

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

export default EditNotePage;
