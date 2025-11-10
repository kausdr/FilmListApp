
import axios from "axios";


const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY!;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL!;

export const apiService = {

    // api.tsx
async getAllMovies(page: number = 1) {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { api_key: API_KEY, language: "pt-BR", page },
  });
  return res.data;
},

async searchMovies(query: string, page: number = 1) {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, language: "pt-BR", query, page },
  });
  return res.data;
},

async getMovieDetails(movieId: string) {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, language: "pt-BR" },
  });
  return res.data;
},

async getMovieById(id: string) {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY, language: "pt-BR" },
  });
  return res.data;
},


}