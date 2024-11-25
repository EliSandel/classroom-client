import React, { createContext, useContext, useState } from "react";

// Define the context type
interface ButtonColorContextType {
  buttonColor: string;
  toggleColor: () => void;
}

// Create the context
const ButtonColorContext = createContext<ButtonColorContextType | undefined>(
  undefined
);

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useButtonColor = () => {
  const context = useContext(ButtonColorContext);
  if (!context) {
    throw new Error("useButtonColor must be used within a ButtonColorProvider");
  }
  return context;
};

// Context provider component
export const ButtonColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [buttonColor, setButtonColor] = useState("#3F50B5"); // Default color

  const toggleColor = () => {
    setButtonColor((prevColor) =>
      prevColor === "#3F50B5" ? "#F50057" : "#3F50B5"
    );
  };

  return (
    <ButtonColorContext.Provider value={{ buttonColor, toggleColor }}>
      {children}
    </ButtonColorContext.Provider>
  );
};
