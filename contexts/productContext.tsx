import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Product} from "@/utils/types";

interface ProductsContextType {
    productsSelected: Product[];
    addProductSelected: (product: Product) => void;
    removeProductSelected: (product: Product) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
    children: ReactNode;
}

// Create the provider component
export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [productsSelected, setProductsSelected] = useState<Product[]>([]);

    const addProductSelected = (product: Product) => {
        setProductsSelected((prevProducts) => [...prevProducts, product]);
    };

    const removeProductSelected = (product: Product) => {
        setProductsSelected((prevProducts) =>
            prevProducts.filter((p) => p.title !== product.title)
        );
    };

    return (
        <ProductsContext.Provider value={{ productsSelected, addProductSelected, removeProductSelected }}>
            {children}
        </ProductsContext.Provider>
    );
};

// Custom hook to use the Products context
export const useProductsSelected = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductsSelected must be used within a ProductsProvider');
    }
    return context;
};
