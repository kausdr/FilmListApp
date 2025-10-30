import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MovieCard from "../dev/components/MovieCard";
import { apiService } from "../dev/services/api";
import { indexStyles } from "../styles/indexStyles";


const Home = () => {
    const insets = useSafeAreaInsets();
    const [movies, setMovies] = useState<any[]>([])


    const getMovies = async () => {
        const movies = await apiService.getAllMovies();
        if (movies) setMovies(movies.results);
        console.log(movies);
    }

    useEffect(() => {
        getMovies();

    }, [])

    return (
        <View style={[
            indexStyles.outerContainer,
            {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }
        ]}
        >
            <View style={indexStyles.innerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 15,
                    }}
                    >
                    <Text style={indexStyles.pageTitle}>INÍCIO</Text>
                    <Link href="/profile" asChild>
                        <TouchableOpacity style={indexStyles.link}>
                            <Ionicons name="person-circle-outline" size={30} color="#023b84ff" />
                        </TouchableOpacity>
                    </Link>
                    
                </View>

                <FlatList
                    style={{ flex: 1 }} 
                    data={movies}
                    keyExtractor={(movie, index) => index.toString()}
                    renderItem={({ item }) => (
                        <MovieCard image={`${process.env.EXPO_PUBLIC_IMAGE_BASE_URL}` + item.poster_path} />
                    )}
                    numColumns={3}
                    columnWrapperStyle={{ gap: 10, }}
                    contentContainerStyle={{ width: '100%', padding: 10, alignItems: 'center' }}
                    key={2}
                    removeClippedSubviews={true}
                />
            </View>


        </View>
    );
}

export default Home;