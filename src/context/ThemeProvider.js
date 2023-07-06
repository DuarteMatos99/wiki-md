import { createContext, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [displayTheme, setDisplayTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{ displayTheme, setDisplayTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
