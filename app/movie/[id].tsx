import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UserContext } from "../_dev/contexts/userContextAPI";
import { apiService } from "../_dev/services/api";
import {
  getMovieRating,
  isFavorite,
  removeFavorite,
  saveFavorite,
} from "../_dev/services/favorites";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { user } = useContext(UserContext);

  const [movie, setMovie] = useState<any>(null);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!user?.email || !id) return;

      setIsLoading(true);
      try {
        const res = await apiService.getMovieById(id as string);
        setMovie(res);

        const fav = await isFavorite(user.email, id as string);
        setFavorite(fav);

        if (fav) {
          const userRating = await getMovieRating(user.email, id as string);
          setRating(userRating);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do filme:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieData();
  }, [id, user]);

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    if (!user?.email || !movie) return;

    // Salva/atualiza o filme como favorito automaticamente ao avaliar
    try {
      await saveFavorite(user.email, movie, newRating);
      if (!favorite) {
        setFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user?.email || !movie) return;

    try {
      if (favorite) {
        await removeFavorite(user.email, id as string);
        setRating(0);
        setFavorite(false);
      } else {
        await saveFavorite(user.email, movie, rating);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!movie) return <Text>Filme não encontrado.</Text>;

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://placehold.co/300x450?text=Sem+Imagem",
        }}
        style={{
          width: "100%",
          aspectRatio: 2 / 3,
          borderRadius: 12,
          marginBottom: 20,
          resizeMode: "cover",
        }}
        accessibilityLabel={`Pôster do filme: ${movie.title}`}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{movie.title}</Text>
      <Text style={{ fontSize: 16, color: "gray", marginVertical: 8 }}>
        {movie.release_date} • {movie.runtime} min
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20 }}>{movie.overview}</Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Sua avaliação:
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star}
            onPress={() => handleRatingChange(star)}
            accessibilityLabel={`Avaliar com ${star} estrela${
              star > 1 ? "s" : ""
            }`}
            accessibilityRole="button"
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={toggleFavorite}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: favorite ? "#ff4d4d" : "#007BFF",
          padding: 14,
          borderRadius: 10,
        }}
        accessibilityLabel={
          favorite
            ? "Remover da Minha Lista de filmes"
            : "Salvar na Minha Lista de filmes"
        }
        accessibilityRole="button"
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={22}
          color="#fff"
        />
        <Text style={{ color: "#fff", marginLeft: 8, fontSize: 16 }}>
          {favorite ? "Remover da Lista" : "Salvar na Minha Lista"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
