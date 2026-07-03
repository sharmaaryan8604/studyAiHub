import {
    createContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "studyhub-theme";

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        return (
            localStorage.getItem(THEME_STORAGE_KEY) ===
            "dark"
        );
    });

    useEffect(() => {
        const nextTheme = isDarkTheme ? "dark" : "light";

        document.documentElement.classList.toggle(
            "dark",
            isDarkTheme
        );
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme((current) => !current);
    };

    return (
        <ThemeContext.Provider
            value={{
                isDarkTheme,
                setIsDarkTheme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
