import {Product} from "@/utils/types";
import axios from "axios";

const url = 'https://1b50-24-232-109-150.ngrok-free.app';

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
    return axios.post(`${url}/order`, data);
}

export const getProducts = async () => {
    const result = axios.get(`${url}/product`);
    return result.then(response => response.data);
}

export const getOrders = async () => {
    const result = await axios.get(`${url}/order`);
    return result.data;
}

export const addStock = async (id: string, quantity: number) => {
    const data = {
        id: id,
        qty: quantity
    }
    return axios.put(`${url}/product`, data);
};

export const createOrder = async (buyerId: string, products: Product[]) => {
    return axios.post(`${url}/order`, {
        buyerId: buyerId,
        products: products.map(product => {
            return {
                productIds: product.id,
                qty: product.qty
            }
        })
    });
}

export const createProduct = async (name: string, price: number, quantity: number, supplier: string) => {
    return axios.post(`${url}/product`, {
        name: name,
        price: price,
        qty: quantity,
        supplierName: supplier
    });
}

