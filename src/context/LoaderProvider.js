import { createContext, useState } from "react";

const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
    const [displayLoader, setDisplayLoader] = useState(false);

    return (
        <LoaderContext.Provider value={{ displayLoader, setDisplayLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export default LoaderContext;
