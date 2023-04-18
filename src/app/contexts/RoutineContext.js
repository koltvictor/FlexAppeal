import React from "react";

export const RoutineContext = React.createContext({
  routine: [],
  setRoutine: () => {},
});

export const RoutineProvider = ({ children }) => {
  const [routine, setRoutine] = React.useState([]);

  return (
    <RoutineContext.Provider value={{ routine, setRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
};
