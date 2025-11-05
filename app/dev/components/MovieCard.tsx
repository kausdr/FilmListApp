import React from "react";
import { Image, StyleSheet, View, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";

interface MovieCardProps {
  movie: any;
  style?: ViewStyle;
}

const MovieCard = ({ movie, style }: MovieCardProps) => {
  const router = useRouter();
  const imageUri = movie?.poster_path
    ? `${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/300x450?text=Sem+Imagem";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/movie/[id]",
          params: { id: String(movie.id) },
        })
      }
      style={[styles.card, style]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir detalhes do filme ${movie.title}`}
    >
      {/* Usando aspectRatio para manter proporção e evitar corte */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 2 / 3, // padrão póster (ex.: 2:3). Ajuste se necessário.
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
