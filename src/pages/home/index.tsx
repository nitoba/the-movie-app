import { InputText } from "../../components/InputText";
import searchIcon from "../../assets/icons/search-icon.svg";

import { TabBarFilter } from "../../components/TabBarFilter";
import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useContent } from "../../hooks/useContent";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { isError } from "../../utils/isError";
import { toast } from "react-toastify";

type Filter = {
  title: string;
};

type ContentData = {
  id: number;
  title: string;
  original_name: string;
  poster_path: string;
  vote_average: number;
};

export function HomePage() {
  const [filters, setFilters] = useState<Filter[]>([
    { title: "All" },
    { title: "Movies" },
    { title: "Tv Shows" },
  ]);

  const [currentFilter, setCurrentFilter] = useState<Filter>(filters[0]);
  const [data, setData] = useState<ContentData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const navigate = useNavigate();

  const { loadMovies, loadTvShows, handleMoreContent, currentPage } =
    useContent();

  async function handleFilterChanged(filter: Filter) {
    setCurrentFilter(filter);
    setIsLoading(true);

    if (filter.title === "Movies") {
      const movies = await loadMovies();

      if (isError(movies)) {
        console.error(movies);
        toast(movies.message, {
          type: "error",
        });
        return;
      }

      setData(movies);
    }

    if (filter.title === "Tv Shows") {
      const tvShows = await loadTvShows();

      if (isError(tvShows)) {
        console.error(tvShows);
        toast(tvShows.message, {
          type: "error",
        });
        setIsLoading(false);

        return;
      }

      setData(tvShows);
    }

    if (filter.title === "All") {
      const movies = await loadMovies();

      if (isError(movies)) {
        console.error(movies);
        toast(movies.message, {
          type: "error",
        });
        setIsLoading(false);

        return;
      }

      const tvShows = await loadTvShows();

      if (isError(tvShows)) {
        console.error(tvShows);

        toast(tvShows.message, {
          type: "error",
        });

        setIsLoading(false);

        return;
      }

      setData([...movies, ...tvShows]);
    }

    setIsLoading(false);
  }

  async function loadMoreContent() {
    setIsLoadingMore(true);

    if (currentFilter.title === "Movies") {
      const movies = await loadMovies();

      if (isError(movies)) {
        console.error(movies);
        setIsLoadingMore(false);
        toast(movies.message, {
          type: "error",
        });

        return;
      }

      setData([...(data as ContentData[]), ...movies]);
    }

    if (currentFilter.title === "Tv Shows") {
      const tvShows = await loadTvShows();

      if (tvShows instanceof Error) {
        console.error(tvShows);
        setIsLoadingMore(false);
        toast(tvShows.message, {
          type: "error",
        });

        return;
      }

      setData([...(data as ContentData[]), ...tvShows]);
    }

    if (currentFilter.title === "All") {
      const movies = await loadMovies();

      if (isError(movies)) {
        console.error(movies);
        setIsLoadingMore(false);
        toast(movies.message, {
          type: "error",
        });

        return;
      }

      const tvShows = await loadTvShows();

      if (isError(tvShows)) {
        console.error(tvShows);
        setIsLoadingMore(false);
        toast(tvShows.message, {
          type: "error",
        });

        return;
      }

      setData([...(data as ContentData[]), ...movies, ...tvShows]);
    }

    setIsLoadingMore(false);
  }

  function handleNavigateToDetails(id: number, typeOfContent: string) {
    navigate(`/detail/${typeOfContent}/${id}`);
  }

  useEffect(() => {
    handleFilterChanged(currentFilter);
  }, [currentFilter]);

  useEffect(() => {
    loadMoreContent();
  }, [currentPage]);

  return (
    <div className={`${styles.container} container`}>
      <section className={styles.titlePageContainer}>
        <h1 className={styles.title}>MaileHereko</h1>
        <p className={styles.description}>
          List of movies and TV Shows, <span>I, Pramod Poudel</span> have
          watched till date. Explore what I have watched and also feel free to
          make a suggestion. 😉
        </p>
        <InputText
          className={styles.inputText}
          type="text"
          iconPath={searchIcon}
          placeholder="Search for a movie or TV Show"
        />
      </section>

      <div className={styles.tabFilters}>
        <TabBarFilter
          filters={filters}
          onChangeFilter={(value) => {
            setCurrentFilter(value);
          }}
        />
      </div>

      <section className={styles.filmsContainer}>
        <header className={styles.category}>
          <strong>{currentFilter.title}</strong>{" "}
          <span>({data?.length ?? 0})</span>
        </header>

        {!data && isLoading ? (
          <div className="containerNoDataOnScreen">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className={styles.moviesGallery}>
              {data?.map((content) => (
                <MovieCard
                  key={content.id}
                  id={content.id}
                  title={content.title ?? content.original_name}
                  thumbnail={content.poster_path}
                  rating={content.vote_average}
                  onClick={() => {
                    handleNavigateToDetails(
                      content.id,
                      content.title ? "movie" : "tv"
                    );
                  }}
                />
              ))}
            </div>
            <div className={styles.showMore}>
              {isLoadingMore ? (
                <LoadingSpinner />
              ) : (
                <button onClick={handleMoreContent}>
                  Show more{" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18"
                      stroke="#8E95A9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18V6"
                      stroke="#8E95A9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
