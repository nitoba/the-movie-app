import { useFiltersContext } from "../../contexts/filters-context";

import styles from "./styles.module.scss";

export function TabBarFilter() {
  const { filters, currentFilter, setCurrentFilter } = useFiltersContext();

  return (
    <div className={styles.container}>
      {filters.map((filter) => (
        <button
          key={filter.title}
          className={`${styles.tabOption} ${
            currentFilter === filter && styles.active
          }`}
          onClick={() => setCurrentFilter(filter)}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
}
