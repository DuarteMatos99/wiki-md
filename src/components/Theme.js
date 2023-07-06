import React, {useEffect} from "react";
import useTheme from "../hooks/useTheme";
import Switch from '@mui/material/Switch';

function Loader() {

    var { displayTheme, setDisplayTheme } = useTheme();

    useEffect(()=>{
        console.log(JSON.parse(localStorage.getItem("theme")));
        setDisplayTheme(JSON.parse(localStorage.getItem("theme")));
    }, []) // <-- empty dependency array

    function updateData() {
        console.log(displayTheme);
        setDisplayTheme(!displayTheme);
        localStorage.setItem('theme', JSON.stringify(!displayTheme));
    }

    return (
        <div>
            <Switch {..."hi"} checked={displayTheme} onChange={updateData} color="primary" />
       </div>
    )
}

export default Loader;