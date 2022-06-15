import styles from "./styles.module.scss";

export function LoadingSpinner() {
  return (
    <div className={styles.containerStyle}>
      <div className={styles.circleStyle} />
    </div>
  );
}
