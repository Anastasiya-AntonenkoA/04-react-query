import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<MoviesResponse> {
  try {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    const config = {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get<MoviesResponse>(
      `${BASE_URL}/search/movie`,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error while retrieving movies:", error);
    throw error;
  }
}