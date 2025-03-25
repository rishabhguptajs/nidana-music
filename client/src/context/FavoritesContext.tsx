"use client";

import React, { createContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (songId: number) => void;
  removeFavorite: (songId: number) => void;
  isFavorite: (songId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (songId: number) => {
    setFavorites((prev) => [...prev, songId]);
  };

  const removeFavorite = (songId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== songId));
  };

  const isFavorite = (songId: number) => favorites.includes(songId);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};