import { HTMLAttributes } from "react";
import { useFiltersContext } from "../../contexts/content-context";

import styles from "./styles.module.scss";

interface TabBarFilterProps extends HTMLAttributes<HTMLDivElement> {}

export function TabBarFilter({ ...props }: TabBarFilterProps) {
  const { filters, currentFilter, setCurrentFilter } = useFiltersContext();

  return (
    <div className={styles.container} {...props}>
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
