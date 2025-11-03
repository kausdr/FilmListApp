import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { apiService } from "../dev/services/api";
import { saveFavorite, isFavorite, removeFavorite } from "../dev/services/favorites";
import { Ionicons } from "@expo/vector-icons";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [favorite, setFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await apiService.getMovieById(id as string);
      setMovie(res);
      const fav = await isFavorite(id as string);
      setFavorite(fav);
    };
    fetchMovie();
  }, []);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(id as string);
    } else {
      await saveFavorite(movie);
    }
    setFavorite(!favorite);
  };

  if (!movie) return <Text>Carregando...</Text>;

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
          height: 400,
          borderRadius: 12,
          marginBottom: 20,
        }}
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
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
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
