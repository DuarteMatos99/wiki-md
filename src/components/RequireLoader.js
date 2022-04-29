import React from "react";

import useLoader from "../hooks/useLoader";
import Loader from "./Loader";

const RequireLoader = ({ children }) => {
    const { displayLoader } = useLoader();

    return !displayLoader ? children : <Loader />;
};

export default RequireLoader;
