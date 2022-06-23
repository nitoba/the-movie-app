import { useState, HTMLAttributes } from "react";
import { useFiltersContext } from "../../contexts/content-context";

import styles from "./styles.module.scss";

type Filter = {
  title: string;
};

interface TabBarFilterProps extends HTMLAttributes<HTMLDivElement> {
  filters: Filter[];
  onChangeFilter: (value: Filter) => void;
}

export function TabBarFilter({
  onChangeFilter,
  filters,
  ...props
}: TabBarFilterProps) {
  const { currentFilter, setCurrentFilter } = useFiltersContext();

  function handleChangeFilter(filter: Filter) {
    setCurrentFilter(filter);
    onChangeFilter(filter);
  }

  return (
    <div className={styles.container} {...props}>
      {filters.map((filter) => (
        <button
          key={filter.title}
          className={`${styles.tabOption} ${
            currentFilter === filter && styles.active
          }`}
          onClick={() => handleChangeFilter(filter)}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
}
