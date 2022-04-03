import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import "../styles/components/notification.css";
import { AlertContext } from "../helper/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function Notification(props) {
    const classes = useStyles();

    const { alertOpen, setAlertOpen } = useContext(AlertContext);

    return (
        <div className={`${classes.root} alert-area`}>
            {console.log(props.info)}
            <div className="alert">
                {alertOpen === true && (
                    <Alert
                        onClose={() => {
                            setAlertOpen(false);
                        }}
                        severity={props.info.severityColor}
                    >
                        {props.info.message}
                    </Alert>
                )}
            </div>
        </div>
    );
}

export default Notification;
