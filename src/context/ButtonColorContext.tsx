import React, { createContext, useContext, useState } from "react";

interface IButtonColorContext {
  buttonColor: string;
  toggleColor: () => void;
}

const ButtonColorContext = createContext<IButtonColorContext | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useButtonColor = () => {
  const context = useContext(ButtonColorContext);
  if (!context) {
    throw new Error("useButtonColor must be used within a ButtonColorProvider");
  }
  return context;
};

export const ButtonColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  
  const [buttonColor, setButtonColor] = useState<string>("#3F50B5");

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
