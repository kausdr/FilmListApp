import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MovieCard from "../dev/components/MovieCard";
import { apiService } from "../dev/services/api";
import { indexStyles } from "../styles/indexStyles";

const Home = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [movies, setMovies] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

const getMovies = async (searchTerm: string = "", pageNumber: number = 1) => {
  try {
    let res;
    if (searchTerm.trim() === "") {
      res = await apiService.getAllMovies(pageNumber);
    } else {
      res = await apiService.searchMovies(searchTerm, pageNumber);
    }

    if (res) {
      if (pageNumber === 1) {
        setMovies(res.results); // primeira página substitui
      } else {
        setMovies(prev => [...prev, ...res.results]); // adiciona à lista
      }
      setTotalPages(res.total_pages);
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
};

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    getMovies(text);
  };

  const numColumns = width > 1200 ? 6 : width > 768 ? 4 : 3;
  const cardWidth = width / numColumns - 20;

  return (
    <View
      style={[
        indexStyles.outerContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={indexStyles.innerContainer}>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <Text style={indexStyles.pageTitle}>Rate My Movie</Text>
          <Link href="/profile" asChild>
            <TouchableOpacity
              style={indexStyles.link}
              accessibilityLabel="Botão para visitar o perfil."
              accessibilityRole="button"
            >
              <Ionicons name="person-circle-outline" size={30} color="#023b84ff" />
            </TouchableOpacity>
          </Link>
        </View>

        <TextInput
          style={[
            indexStyles.input,
            {
              width: "100%",
              marginVertical: 15,
              fontSize: width > 768 ? 18 : 16,
              paddingVertical: 10,
              paddingHorizontal: 15,
            },
          ]}
          placeholder="Buscar filmes..."
          value={query}
          onChangeText={handleSearch}
        />

        <FlatList
            data={movies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <MovieCard movie={item}
                style={{
                    width: cardWidth,
                    height: cardWidth * 1.5,
                    marginRight: 10, // espaçamento horizontal
                    marginBottom: 15, // espaçamento vertical
                }}
                />

            )}
            numColumns={numColumns}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
            />

        {page < totalPages && (
          <TouchableOpacity
            style={[
              indexStyles.buttonPrimary,
              {
                marginVertical: 20,
                width: width > 768 ? 200 : "80%",
                alignSelf: "center",
                paddingVertical: 12,
              },
            ]}
            onPress={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              getMovies(query, nextPage);
            }}
            accessibilityLabel="Carregar mais filmes"
            accessibilityRole="button"
          >
            <Text style={indexStyles.buttonPrimaryText}>Carregar Mais</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Home;
