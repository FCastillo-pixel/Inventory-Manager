import React, {createContext, useContext, useEffect, useState} from "react";
import { getCategories } from "../services/productService";

interface CategoryContextType {
    categories: string[];
    refreshCategories: () => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    refreshCategories: async () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [categories, setCategories] = useState<string[]>([]);

    const refreshCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
        }catch (err) {
            console.error("Error getting categories", err);
        }
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{categories, refreshCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}