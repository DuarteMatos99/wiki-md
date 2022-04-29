import React from "react";
import "../styles/components/newnotedial.css";
import { SpeedDial } from "@mui/material";
import { SpeedDialAction } from "@mui/material";
import { SpeedDialIcon } from "@mui/material";

function NewNoteDial(props) {

    return (
        <SpeedDial
            id="new-dial"
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon openIcon={props.icon}/>}>
            {props.optionList.map((action) => (
                <SpeedDialAction
                    href={action.linkTo}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClickFunc}
                />
            ))}
        </SpeedDial>
    );
}

export default NewNoteDial;
