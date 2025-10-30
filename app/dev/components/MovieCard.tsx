import { Image, StyleSheet, View } from "react-native";

interface movieCardProps {
    image: string;
}

const MovieCard = ({
    image,
}: movieCardProps) => {
    return (
        <View style={styles.movieCard}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
}

export default MovieCard;


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    movieCard: {
        width: 90,
        height: 150,
        marginBottom: 10,
    }
})