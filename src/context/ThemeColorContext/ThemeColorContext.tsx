import { THEME_COLORS } from "./ThemeColorContext.data";
import React, { createContext, useContext, useState } from "react";

interface IThemeColorContext {
  themeColor: string;
  toggleColor: () => void;
}

const ThemeColorContext = createContext<IThemeColorContext>({
  themeColor: THEME_COLORS[0],
  toggleColor: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeColor = () => useContext(ThemeColorContext);

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
