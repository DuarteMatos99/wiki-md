import { useState, useEffect, useContext } from "react";
import "../styles/pages/loginpage.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const theme = createTheme({
    palette: {
        primary: {
            main: "#30e3ca",
        },
    },
});

function LoginPage() {
    const navigate = useNavigate();
    const {auth, setAuth} = useContext(AuthContext);
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        try {
            e.preventDefault();
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: user,
                    password: pwd,
                }),
            };
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/user/login`,
                requestOptions
            ).then((response) => {
                setUser("");
                setPwd("");
                setSuccess(true);
                if(response.status == 200) {
                    response.json().then((output) => {
                        setAuth(output)
                    })
                    navigate("/");
                } else {
                    console.log("Unauthorized");
                }
            });
        } catch (error) {
            console.log("Catch Error");
        }
    }

    return (
        <section>
            <div className="brand-area">
                <div className="brand-title">
                    <h2 className="login-page-title" href="/profile">
                        <a href="/">
                            Wiki<span className="md">MD</span>
                        </a>
                    </h2>
                </div>
            </div>

            <form className="fields-area" onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        sx={{ mr: 2, ml: 2 }}
                        id="username"
                        label="username"
                        variant="outlined"
                        onChange={(e) => {
                            setUser(e.target.value);
                        }}
                        value={user}
                        required
                    />
                    <TextField
                        sx={{ mr: 2, ml: 2 }}
                        id="password"
                        label="password"
                        type="password"
                        variant="outlined"
                        onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                        value={pwd}
                        required
                    />
                    <Button
                        id="login-button"
                        sx={{ mr: 2, ml: 2 }}
                        variant="outlined"
                        type="submit"
                    >
                        <ArrowForwardRoundedIcon />
                    </Button>
                </ThemeProvider>
            </form>
            <div className="create-account-container">
                <Button variant="text" href="/create-account">
                    Create Account
                </Button>
            </div>
        </section>
    );
}

export default LoginPage;
