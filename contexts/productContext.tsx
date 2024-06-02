import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Product} from "@/utils/types";
import {getProducts} from "@/api";

interface ProductsContextType {
    productsSelected: Product[];
    addProductSelected: (product: Product) => void;
    removeProductSelected: (product: Product) => void;
    reFetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

interface ProductsProviderProps {
    children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [productsSelected, setProductsSelected] = useState<Product[]>([]);

    const addProductSelected = (product: Product) => {
        const productIndex = productsSelected.findIndex((p) => p.id === product.id);
        if (productIndex !== -1) {
            const newProducts = [...productsSelected];
            newProducts[productIndex].qty += product.qty;
            setProductsSelected(newProducts);
            return;
        }
        setProductsSelected((prevProducts) => [...prevProducts, product]);
    };

    const removeProductSelected = (product: Product) => {
        setProductsSelected((prevProducts) =>
            prevProducts.filter((p) => p.id !== product.id)
        );
    };

    const reFetchProducts = async () => {
        return await getProducts();
    }

    return (
        <ProductsContext.Provider value={{
            productsSelected,
            addProductSelected,
            removeProductSelected,
            reFetchProducts,
        }}>
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
