import starIcon from "../../assets/icons/star-icon.svg";

import styles from "./styles.module.scss";

type CardMovieProps = {
  id: number;
  title: string;
  thumbnail: string;
  rating: number;
  onClick: (id: number) => void;
};

export function MovieCard({
  id,
  title,
  thumbnail,
  rating,
  onClick,
}: CardMovieProps) {
  return (
    <div className={styles.container} onClick={() => onClick(id)}>
      <div className={styles.content}>
        <img
          className={styles.thumbnail}
          src={`https://image.tmdb.org/t/p/original${thumbnail}`}
        />
        <div className={styles.rankingContainer}>
          <img src={starIcon} alt="Star icon" />
          <span className={styles.rating}>{rating}</span>
        </div>
      </div>
      <footer className={styles.title}>
        <strong>{title}</strong>
      </footer>
    </div>
  );
}
