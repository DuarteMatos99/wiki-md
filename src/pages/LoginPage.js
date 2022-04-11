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
    const { setAuth } = useContext(AuthContext);
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser("");
        setPwd("");
        setSuccess(true);
        navigate("/");
    };

    return (
        <section>
            <div className="brand-area">
                <div className="brand-title">
                    <h2>
                        Wiki<span className="md">MD</span>
                    </h2>
                </div>
            </div>

            <form className="fields-area" onSubmit={handleSubmit}>
                <ThemeProvider theme={theme}>
                    <TextField
                        sx={{ mr: 2, ml: 2 }}
                        id="username"
                        label="username"
                        variant="standard"
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
                        variant="standard"
                        onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                        value={pwd}
                        required
                    />
                    <Button
                        sx={{ mr: 2, ml: 2 }}
                        variant="outlined"
                        type="submit"
                    >
                        <ArrowForwardRoundedIcon />
                    </Button>
                </ThemeProvider>
            </form>
        </section>
    );
}

export default LoginPage;
