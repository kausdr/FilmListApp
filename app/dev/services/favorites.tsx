import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "my_favorite_movies";

export async function saveFavorite(movie: any) {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  const list = stored ? JSON.parse(stored) : [];
  list.push(movie);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export async function isFavorite(id: string) {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!stored) return false;
  const list = JSON.parse(stored);
  return list.some((m: any) => m.id == id);
}

export async function removeFavorite(id: string) {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  if (!stored) return;
  const list = JSON.parse(stored).filter((m: any) => m.id != id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

export async function getFavorites() {
  const stored = await AsyncStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}
