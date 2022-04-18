import { useState } from "react";
import "../styles/pages/loginpage.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";

const theme = createTheme({
    palette: {
        primary: {
            main: "#30e3ca",
        },
    },
});

function LoginPage() {
    const navigate = useNavigate();
    const { displayAlert, setDisplayAlert } = useAlert();
    const { auth, setAuth } = useAuth();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: user,
                password: pwd,
            }),
        };
        try {
            fetch(
                `${process.env.REACT_APP_ENDPOINT}/user/login`,
                requestOptions
            ).then((response) => {
                const status = response.status;
                if (status == 200) {
                    response.json().then((output) => {
                        localStorage.setItem("user", JSON.stringify(output));
                        setDisplayAlert({
                            open: true,
                            message: `Welcome, ${output.username}!`,
                            severityColor: "success",
                        });
                        navigate("/");
                    });
                } else if (status === 401) {
                    setDisplayAlert({
                        open: true,
                        message: "Username or Password is incorrect",
                        severityColor: "error",
                    });
                }

                setUser("");
                setPwd("");
            });
        } catch (error) {
            console.log("BERROU");
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
            {displayAlert.open === true && <Notification />}
        </section>
    );
}

export default LoginPage;
