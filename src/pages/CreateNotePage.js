import React from "react";
import { useNavigate } from "react-router-dom";
import { maxWidth } from "@mui/system";
import { Button } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import CodeIcon from "@mui/icons-material/Code";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {useEffect} from 'react';
import RequireLoader from "../components/RequireLoader";
import useLoader from "../hooks/useLoader";
import Loader from "../components/Loader";
import ReactDOM from 'react-dom';
import { useContext } from "react";
import useTheme from "../hooks/useTheme";

import "../styles/pages/createnotepage.css";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
import useAlert from "../hooks/useAlert";
import MarkdownWikiMD from "../components/MarkdownWikiMD.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#30e3ca"
      }
    },
    // input label when focused
    "& label.Mui-focused": {
      color: "#30e3ca"
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: "#30e3ca"
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#30e3ca"
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#30e3ca"
      }
    }
  }
});

const CreateNotePage = () => {
  let navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const classes = useStyles();

  const { displayTheme, setDisplayTheme } = useTheme();
  const { displayAlert, setDisplayAlert } = useAlert();
  const [noteInfo, setNoteInfo] = React.useState({
    title: "",
    tags: "",
    content: "",
  });
  const [open, setOpen] = React.useState(false);
  const [noteId, setNoteId] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [replaceTag, setReplaceTag] = React.useState(false);
  const [drawerState, setDrawerState] = React.useState(false);
  const [uploadFileName, setUploadFileName] = React.useState(" Upload Image");
  const [imageBase64, setImage] = React.useState("image");
  const { displayLoader, setDisplayLoader } = useLoader();

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

  // Request to create note after page load
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "",
      createdBy: userInfo.id,
    }),
  };

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
        tmp += "> " + line + "\n";
      });
    setNoteInfo({
      ...noteInfo,
      content: noteInfo.content.replace(window.getSelection(), tmp),
    });
  }

  function addHashtag(event) {
    setNoteInfo({
      ...noteInfo,
      content: noteInfo.content.replace(
        window.getSelection().toString(),
        "# " + window.getSelection().toString()
      ),
    });
  }

  const getTagsToOptions = () => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/tag`).then((res) => {
          setOptions(res.data);
        });
      }
    })();

    return () => {
      active = false;
    };
  };

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
          createdBy: userInfo.id,
        }),
      };
      fetch(`${process.env.REACT_APP_ENDPOINT}/note`, requestOptions).then(
        (response) => {
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
        }
      );
    }
  }

  function onAutoCompleteChange(event) {
    let tagExists = false;
    options.map((tag) => {
      if (
        String(tag.name).toLowerCase() === String(event.target).toLowerCase()
      ) {
        tagExists = true;
      }
    });
    if (!tagExists) {
      if (setReplaceTag) {
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
    getTagsToOptions();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  

  return (
    <div className={displayTheme ? "create-note-page-wrapper-black" : "create-note-page-wrapper-white"}>
      <Navbar />
      <Loader/>
      <div className="create-note-page">
        <h1>Create Note</h1>
        <div className="new-note-form">
          <div className="note-input-wrapper">
            <TextField
              className={classes.root}
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
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={(event, value) => onAsyncChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.root}
                onChange={onAutoCompleteChange}
                label="Tags"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
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
                className={classes.root}
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
            anchor="top"
            open={drawerState}
            onClose={toggleDrawer(drawerState, false)}
          >
          <div className={displayTheme? "close-create-note-drawer-wrapper-black" : "close-create-note-drawer-wrapper"}>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={toggleDrawer(drawerState, false)}
            >
            <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
            
            <div>
                <div className={displayTheme ? "create-note-markdown-textfield-black" : "create-note-markdown-textfield"}>
                <TextField className={classes.root} fullWidth
                value={noteInfo.content}
                multiline
                id="fullWidth"
                onChange={onContentChange}
                onPaste={uploadNotePicture}/>
                </div>
                <div className={displayTheme ? "create-note-markdown-display-black" : "create-note-markdown-display"}>
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
};

export default CreateNotePage;
