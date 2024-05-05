import React, { ReactNode, createContext, useContext, useState } from "react";
import { Category } from "../Models/Category";

interface SearchContextType {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedCategory: Category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
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
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const contextValue = {
        query,
        setQuery,
        selectedCategory,
        setSelectedCategory
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}