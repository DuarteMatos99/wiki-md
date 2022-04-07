import React, { useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@mui/material";
import { AlertContext } from "../helper/Context";

function Notification(props) {
    const { alertOpen, setAlertOpen } = useContext(AlertContext);

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={alertOpen}
                onClose={() => {
                    setAlertOpen(false);
                }}
                autoHideDuration={3000}
            >
                <Alert severity={props.info.severityColor}>
                    {props.info.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Notification;
