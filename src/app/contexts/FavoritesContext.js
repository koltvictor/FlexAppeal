import React from "react";

export const FavoritesContext = React.createContext({
  favorites: [],
  setFavorites: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = React.useState([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
