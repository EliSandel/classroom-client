import React, { createContext, useContext, useState } from "react";

interface IThemeColorContext {
  themeColor: string;
  toggleColor: () => void;
}

const ThemeColorContext = createContext<IThemeColorContext | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider");
  }
  return context;
};

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //circle theme color
  //move to const
  const [themeColor, setThemeColor] = useState<string>("#3F50B5");

  const toggleColor = () => {
    setThemeColor((prevThemeColor) =>
      prevThemeColor === "#3F50B5" ? "#F50057" : "#3F50B5"
    );
  };

  return (
    <ThemeColorContext.Provider value={{ themeColor, toggleColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
