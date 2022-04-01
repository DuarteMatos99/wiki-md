import React from "react";
import "../styles/components/newnotedial.css";
import { SpeedDial } from "@mui/material";
import { SpeedDialAction } from "@mui/material";
import { SpeedDialIcon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function NewNoteDial() {

    const actions = [{
        "name": "Create New Note",
        "icon": <AddIcon />,
    }];

    return (
        <SpeedDial
        id="new-dial"
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
        
        {actions.map((action) => (
            <SpeedDialAction
            href="../create-note"
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            />
        ))}
        </SpeedDial>
    )
}

export default NewNoteDial;