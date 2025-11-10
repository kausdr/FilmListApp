import { UserContext } from "@/app/_dev/contexts/userContextAPI";
import { getFavorites, SavedMovie } from "@/app/_dev/services/favorites";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MovieCard from "../_dev/components/MovieCard";
import { indexStyles } from "../_styles/indexStyles";

const FavoritesList = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState<SavedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    if (user?.email) {
      setIsLoading(true);
      try {
        const favs = await getFavorites(user.email);
        setMovies(favs);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  // useFocusEffect recarrega os dados toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const numColumns = width > 1200 ? 6 : width > 768 ? 4 : 3;
  const cardWidth = width / numColumns - 20;

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Você ainda não salvou nenhum filme.</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        indexStyles.outerContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <MovieCard
              movie={item}
              style={{
                width: cardWidth,
                height: cardWidth * 1.5,
              }}
            />
            {item.userRating > 0 && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.userRating} / 5</Text>
              </View>
            )}
          </View>
        )}
        numColumns={numColumns}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FavoritesList;
