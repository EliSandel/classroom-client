import React, { createContext, useContext, useState } from "react";
import { THEME_COLORS } from "./ThemeColorContext.data";

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
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  const toggleColor = () => {
    setCurrentColorIndex(
      (prevColorIndex) => (prevColorIndex + 1) % THEME_COLORS.length
    );
  };

  const themeColor = THEME_COLORS[currentColorIndex];

  return (
    <ThemeColorContext.Provider value={{ themeColor, toggleColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
