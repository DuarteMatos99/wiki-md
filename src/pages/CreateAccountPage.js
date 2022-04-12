import { useState, useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import Navbar from "../components/Navbar";
import "../styles/pages/createaccountpage.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Input = styled('input')({
    display: 'none',
});


function CreateAccountPage() {

    const navigate = useNavigate();
    const [uploadFileName, setUploadFileName] = useState(" Upload Image");
    const [imageBase64, setImage] = useState("image");
    const [createUsername, setUsername] = useState("");
    const [createPassword, setPassword] = useState("");

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

    function uploadProfilePicture(event) {
        console.log(event.target.value);
        setUploadFileName(" " + String(event.target.value).replace("C:\\fakepath\\", ""));
        console.log(event.target.files[0]);
        const file = event.target.files[0];
        const base64 = convertBase64(file);
        base64.then(function(value) {
            setImage(value);
            console.log(value);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: createUsername,
                password: createPassword,
                image: imageBase64,
                permLevel: "0",
            }),
        };
        fetch(
            `${process.env.REACT_APP_ENDPOINT}/user`,
            requestOptions
        ).then((response) => {
            console.log(response);
            if (response.status == 200) {
                // setAlertOpen(true);
                navigate("/login");
            } else {
                console.log("error");
                // setAlertOpen(true);
            }
        });

        
    };

    return (
        <div>
            <Navbar/>
            <div class="create-account-block">
                <h1>Create Account</h1>
                <form class="create-account-form" onSubmit={handleSubmit}>
                    <img className="upload-picture" src={imageBase64}></img>
                    <div className="upload-picture-button-name">
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={uploadProfilePicture}/>
                            <Button variant="contained" component="span">
                            Upload
                            </Button>
                        </label>
                        {uploadFileName}
                    </div>
                    <div class="create-account-textfield-wrapper">
                        <TextField 
                        id="create-account-username"
                        label="Username"
                        variant="outlined"
                        onChange={(event) => {
                            console.log(event.target.value);
                            setUsername(event.target.value);
                        }}
                        required />
                    </div>
                    <div class="create-account-textfield-wrapper">
                        <TextField
                        id="create-account-password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            console.log(event.target.value);
                            setPassword(event.target.value);
                        }}
                        required
                        />
                    </div>
                    <Button
                            id="create-account-submit-button"
                            variant="contained"
                            type="submit">
                            Submit
                    </Button>
                </form>
            </div>    
        </div>
    )
}

export default CreateAccountPage;