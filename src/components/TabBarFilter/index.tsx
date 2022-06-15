import { useState, HTMLAttributes } from "react";

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
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);

  function handleChangeFilter(filter: Filter) {
    setSelectedFilter(filter);
    onChangeFilter(filter);
  }

  return (
    <div className={styles.container} {...props}>
      {filters.map((filter) => (
        <button
          key={filter.title}
          className={`${styles.tabOption} ${
            selectedFilter === filter && styles.active
          }`}
          onClick={() => handleChangeFilter(filter)}
        >
          {filter.title}
        </button>
      ))}
    </div>
  );
}
