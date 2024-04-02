import React, { ReactNode, createContext, useContext, useState } from "react";

interface SearchContextType {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if(!context) {
        throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context;
}

interface SearchProviderProps {
    children: ReactNode;
  }

export const SearchContextProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [query, setQuery] = useState('');

    return (
        <SearchContext.Provider value={{ query, setQuery }}>
            {children}
        </SearchContext.Provider>
    );
}