import {Product} from "@/utils/types";
import axios from "axios";

export const buyProducts = async (products: Product[], buyerId: string) => {
    const data = {
        buyerId: buyerId,
        products: products.map(product => {
            return {
                productIds: product.id,
                qty: product.qty
            }
        })
    }
    return axios.post('http://localhost:8080/order', data);
}

export const getProducts = async () => {
    return axios.get('http://localhost:8080/product');
}