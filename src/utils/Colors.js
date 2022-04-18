import { createTheme } from "@mui/material/styles";

const appTheme = () => {
    return createTheme({
        palette: {
            primary: {
                main: "#30e3ca",
            },
        },
    });
};

export default appTheme;
