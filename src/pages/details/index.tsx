import { useParams } from "react-router-dom";
import { ContentDetail, useContent } from "../../hooks/useContent";
import starIcon from "../../assets/icons/star-icon.svg";

import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function DetailsPage() {
  const { id, typeContent } = useParams();
  const { loadMovie, loadTvShow } = useContent();

  const [content, setContent] = useState<ContentDetail | Error>();

  async function loadContent() {
    let response: ContentDetail | Error;
    if (typeContent === "movie") {
      response = await loadMovie(+String(id));
    } else {
      response = await loadTvShow(+String(id));
    }
    setContent(response);
  }

  useEffect(() => {
    loadContent();
  }, []);

  if (content instanceof Error) {
    return (
      <div className="containerNoDataOnAllScreen">
        <h1>Error loading content</h1>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="containerNoDataOnAllScreen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`${styles.container} container`}>
      <section className={styles.contentBanner}>
        <div className={styles.backgroundBanner}>
          <img
            className={styles.bannerImage}
            src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
          />
        </div>
        <div className={styles.titleContent}>
          <span>
            MaileHereko /{" "}
            {`${typeContent?.charAt(0).toUpperCase()}${typeContent?.slice(1)}`}
          </span>
          <h1>{content.original_name ?? content.original_title}</h1>
        </div>
      </section>
      <section className={styles.contentInfos}>
        <div className={styles.containerPorter}>
          <img
            className={styles.posterImage}
            src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
          />
        </div>
        <div className={styles.containerInfos}>
          <h3 className={styles.infoTitle}>Overview</h3>
          <p className={styles.overview}>{content.overview}</p>
          <div className={styles.rankingContainer}>
            <img src={starIcon} alt="Star icon" />
            <span className={styles.rating}>{content.vote_average}</span>
          </div>

          {typeContent === "movie" ? (
            <div className={styles.moviesInfos}>
              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Type</span>
                  <strong>
                    {`${typeContent
                      ?.charAt(0)
                      .toUpperCase()}${typeContent?.slice(1)}`}
                  </strong>
                </div>

                <div className={styles.statusInfoContentContainer}>
                  <span>Status</span>
                  <strong>{content.status}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Release Date</span>
                  <strong>{content.release_date}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Tag Line</span>
                  <strong>{content.tagline}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Genres</span>
                  <strong>
                    {content.genres.map(
                      (g, i) =>
                        `${g.name} ${
                          i !== content.genres.length - 1 ? " | " : ""
                        }`
                    )}
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.tvShowInfos}>
              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Type</span>
                  <strong>Tv show</strong>
                </div>

                <div className={styles.statusInfoContentContainer}>
                  <span>Status</span>
                  <strong>{content.status}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>First air date</span>
                  <strong>{content.first_air_date}</strong>
                </div>

                <div className={styles.statusInfoContentContainer}>
                  <span>Last air date</span>
                  <strong>{content.last_air_date}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>No. of Seasons</span>
                  <strong>{content.number_of_seasons}</strong>
                </div>

                <div className={styles.statusInfoContentContainer}>
                  <span>No. of episodes</span>
                  <strong>{content.number_of_episodes}</strong>
                </div>
              </div>

              <div className={styles.statusInfoContainer}>
                <div className={styles.statusInfoContentContainer}>
                  <span>Genres</span>
                  <strong>
                    {content.genres.map(
                      (g, i) =>
                        `${g.name} ${
                          i !== content.genres.length - 1 ? " | " : ""
                        }`
                    )}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
