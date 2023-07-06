import { React, useState, useEffect } from "react";
import "../styles/pages/displaynotepage.css";
import Navbar from "../components/Navbar";
import Separator from "../components/Separator";
import MarkdownWikiMD from "../components/MarkdownWikiMD";
import useLoader from "../hooks/useLoader";
import RequireLoader from "../components/RequireLoader";
import NewNoteDial from "../components/NewNoteDial";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom"; 
import useTheme from "../hooks/useTheme";


function DisplayNotePage() {
    const navigate = useNavigate();
    const [note, setNotes] = useState([]);
    const { setDisplayLoader } = useLoader();
    const { displayTheme, setDisplayTheme } = useTheme();
    
    const id_from_url = window.location.pathname.split("/")[2];
    const tags = note?.tags?.split(",").filter(String);

    const userData = JSON.parse(localStorage.getItem("user"))
    let dashboardOptionList = [{name: "Edit Note",
                                icon: <EditIcon/>,
                                onClickFunc: navigateToEditPage},
                               {name: "Delete Note",
                                icon: <DeleteIcon/>,
                                linkTo: "",
                                onClickFunc: deleteButtonFunc}]

    function navigateToEditPage() {
        navigate(`../edit-note/${id_from_url}`)
    }

    function deleteButtonFunc() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: note.id,
                deletedBy: userData.id,
                createdBy: note.createdBy.id
            }),
        };
        console.log(requestOptions.body)
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/deleteNote`,
            requestOptions
        ).then((response) => {
            console.log(response);
            if (response.status == 200) {
                navigate("/");
            }
        });
    }

    useEffect(() => {
        setDisplayLoader(true);
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/note/getNoteById?id=${id_from_url}`
        )
            .then((result) => result.json())
            .then((output) => {
                setNotes(output);
                setDisplayLoader(false);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <Navbar />
            <RequireLoader>
                <div className={displayTheme ? "display-note-page-wrapper-dark" : "display-note-page-wrapper-white"}>
                <div className="display-note-page">
                    <h1 className="display-note-page-title">{note.title}</h1>
                    <div>
                        {tags?.map((tag) => {
                            return <a className="display-note-tag">{tag}</a>;
                        })}
                    </div>
                    <Separator />
                    <MarkdownWikiMD>{note.content}</MarkdownWikiMD>
                    <p>{note.createdBy?.username}</p>
                </div>
                </div>
                <NewNoteDial optionList={dashboardOptionList}/>
            </RequireLoader>
        </div>
    );
}

export default DisplayNotePage;
