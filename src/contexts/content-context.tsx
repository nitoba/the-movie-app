import { createContext, ReactNode, useContext, useState } from "react";

type FiltersContextData = {
  filters: {
    title: string;
  }[];
  currentFilter: Filter;
  setCurrentFilter: (filter: Filter) => void;
};
export type Filter = {
  title: string;
};

const FiltersContext = createContext<FiltersContextData>(
  {} as FiltersContextData
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filter[]>([
    { title: "All" },
    { title: "Movies" },
    { title: "Tv Shows" },
  ]);

  const [currentFilter, setCurrentFilter] = useState<Filter>(filters[0]);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        currentFilter,
        setCurrentFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
