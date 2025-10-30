
import axios from "axios";


const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY!;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL!;

export const apiService = {

    async getAllMovies() {
        try {
            const res = await axios.get(`${BASE_URL}/discover/movie`, {
                params: {
                    api_key: API_KEY, language: 'pt-BR',
                },
            })
            if (!res.data) {
                throw new Error('Nenhum dado recebido da API');
            };
            return res.data

        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            throw error;
        }

    }
}