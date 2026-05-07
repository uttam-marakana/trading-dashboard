import React, { useEffect, useMemo } from "react";

import { ThemeContext } from "./ThemeContext.jsx";

const ThemeProvider = ({ children }) => {
  // Premium: no theme switching UI/code; always run in light theme.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }, []);

  const value = useMemo(
    () => ({
      theme: "light",
      // keep stable API in case any component still consumes it
      setTheme: () => {},
      toggleTheme: () => {},
      isDark: false,
    }),
    [],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;




