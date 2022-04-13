import { createContext, useState } from "react";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
    const [displayAlert, setDisplayAlert] = useState({});

    return (
        <AlertContext.Provider value={{ displayAlert, setDisplayAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
