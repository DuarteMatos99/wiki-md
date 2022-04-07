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
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

function CreateNotePage() {
    let navigate = useNavigate();

    const { alertOpen, setAlertOpen } = useContext(AlertContext);
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
        value.map(e => {
            tagStr = tagStr + e.name + ",";
        })
        console.log(tagStr);
        setNoteInfo({ ...noteInfo, tags: tagStr });
    }

    function onButtonPress(event) {
        if (noteInfo.title === "" || noteInfo.content === "") {
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
                    title: noteInfo.title,
                    tags: noteInfo.tags,
                    content: noteInfo.content,
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

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
          await sleep(1e3); // For demo purposes.
    
          if (active) {
            axios.get(`${process.env.REACT_APP_ENDPOINT}/tag`)
             .then((res)=> {
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
                        onOpen={() => {setOpen(true);}}
                        onClose={() => {setOpen(false);}}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        options={options}
                        loading={loading}
                        onChange={(event, value) => onAsyncChange(value)}
                        renderInput={(params) => (
                            <TextField  {...params} label="Asynchronous" InputProps={{...params.InputProps,
                                endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                                ),
                            }}
                            />
                        )}
                    />

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

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
  ];

export default CreateNotePage;
