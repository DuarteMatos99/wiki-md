import React from "react";
import "../styles/components/separator.css";
import useTheme from "../hooks/useTheme";

function Separator() {

    const { displayTheme, setDisplayTheme } = useTheme();

    return (
        <div className="separator">
            <hr/>
        </div>
    );
}

export default Separator;
