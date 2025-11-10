import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/userContextAPI";
import { useContext } from "react";

export interface SavedMovie {
  id: string;
  userRating: number;
  [key: string]: any;
}

const getFavoritesKey = (userEmail: string) => {
  if (!userEmail) {
    console.error("Email do usuário é nulo ou indefinido.");
    return "@favorites_guest";
  }
  return `@favorites_${userEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
};

/**
 * Salva ou atualiza um filme e sua avaliação na lista de favoritos do usuário.
 */
export async function saveFavorite(
  userEmail: string,
  movie: any,
  rating: number
) {
  const FAVORITES_KEY = getFavoritesKey(userEmail);
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  const list: SavedMovie[] = stored ? JSON.parse(stored) : [];

  const movieIndex = list.findIndex((m: SavedMovie) => m.id == movie.id);
  const movieToSave = { ...movie, userRating: rating };

  if (movieIndex > -1) {
    // Filme já existe, apenas atualiza a avaliação
    list[movieIndex] = movieToSave;
  } else {
    // Novo filme, adiciona à lista
    list.push(movieToSave);
  }

  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

/**
 * Verifica se um filme está na lista de favoritos do usuário.
 */
export async function isFavorite(userEmail: string, id: string) {
  const FAVORITES_KEY = getFavoritesKey(userEmail);
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!stored) return false;
  const list: SavedMovie[] = JSON.parse(stored);
  return list.some((m: SavedMovie) => m.id == id);
}

/**
 * Remove um filme da lista de favoritos do usuário.
 */
export async function removeFavorite(userEmail: string, id: string) {
  const FAVORITES_KEY = getFavoritesKey(userEmail);
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!stored) return;
  const list = JSON.parse(stored).filter((m: SavedMovie) => m.id != id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

/**
 * Obtém todos os filmes favoritos e suas avaliações do usuário.
 */
export async function getFavorites(userEmail: string): Promise<SavedMovie[]> {
  const FAVORITES_KEY = getFavoritesKey(userEmail);
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Obtém a avaliação específica de um filme para o usuário.
 */
export async function getMovieRating(userEmail: string, id: string) {
  const FAVORITES_KEY = getFavoritesKey(userEmail);
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!stored) return 0;
  const list: SavedMovie[] = JSON.parse(stored);
  const movie = list.find((m: SavedMovie) => m.id == id);
  return movie ? movie.userRating : 0;
}
