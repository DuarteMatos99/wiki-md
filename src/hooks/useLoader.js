import { useContext } from "react";
import LoaderContext from "../context/LoaderProvider";

const useLoader = () => {
    return useContext(LoaderContext);
};

export default useLoader;
