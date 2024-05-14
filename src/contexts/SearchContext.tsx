import { createContext, useState } from "react";

export const SearchContext = createContext({});

export const SearchProvider = ({ children }: any) => {
  const [searchParams, setSearchParams] = useState<string | null>("");

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};
