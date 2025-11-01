import { Image, StyleSheet, View, useWindowDimensions } from "react-native";

interface MovieCardProps {
  image: string;
}

const MovieCard = ({ image }: MovieCardProps) => {
  const { width } = useWindowDimensions();


  const cardWidth =
    width >= 1200 ? width / 6 - 20 :
    width >= 768 ? width / 4 - 20 :
    width / 2.5 - 20;

  const cardHeight = cardWidth * 1.5;

  return (
    <View style={[styles.movieCard, { width: cardWidth, height: cardHeight }]}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  movieCard: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
});
