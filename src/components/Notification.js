import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@mui/material";
import useAlert from "../hooks/useAlert";

function Notification() {
    const { displayAlert, setDisplayAlert } = useAlert();

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={displayAlert.open}
                onClose={() => {
                    setDisplayAlert({ ...displayAlert, open: false });
                }}
                autoHideDuration={3000}
            >
                <Alert severity={displayAlert.severityColor}>
                    {displayAlert.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Notification;
