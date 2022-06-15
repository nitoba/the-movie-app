import { useState } from "react";
import { api, apiKey } from "../services/api";

type ContentData = {
  id: number;
  title: string;
  original_name: string;
  poster_path: string;
  vote_average: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type ContentDetail = {
  id: number;
  original_name: string;
  original_title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  status: string;
  genres: Genre[];
  tagline: string;
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
  last_air_date: string;
};

interface TheMoviesDBResponse<T> {
  results: T;
}

export function useContent() {
  const [currentPage, setCurrentPage] = useState(1);

  async function loadMovies(): Promise<ContentData[] | Error> {
    try {
      const response = await api.get<TheMoviesDBResponse<ContentData[]>>(
        `/movie/popular/?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
      );

      return response.data.results;
    } catch (error) {
      return new Error("Error loading movies");
    }
  }

  async function loadMovie(id: number): Promise<ContentDetail | Error> {
    try {
      const response = await api.get<ContentDetail>(
        `/movie/${id}?api_key=${apiKey}&language=pt-BR`
      );

      return response.data;
    } catch (error) {
      return new Error("Error loading movies");
    }
  }

  async function loadTvShows(): Promise<ContentData[] | Error> {
    try {
      const response = await api.get<TheMoviesDBResponse<ContentData[]>>(
        `/tv/popular/?api_key=${apiKey}&language=pt-BR&page=${currentPage}`
      );
      return response.data.results;
    } catch (error) {
      return new Error("Error loading movies");
    }
  }

  async function loadTvShow(id: number): Promise<ContentDetail | Error> {
    try {
      const response = await api.get<ContentDetail>(
        `/tv/${id}?api_key=${apiKey}&language=pt-BR`
      );
      return response.data;
    } catch (error) {
      return new Error("Error loading movies");
    }
  }

  function handleMoreContent() {
    setCurrentPage(currentPage + 1);
  }

  return {
    loadMovies,
    loadMovie,
    loadTvShows,
    loadTvShow,
    currentPage,
    handleMoreContent,
  };
}
