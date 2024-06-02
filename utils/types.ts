export interface Product {
    id: string;
    price: number;
    qty: number;
    name: string;
}

export interface Order {
    orderId: string;
    products: {
        productIds: string;
        name: string;
        qtyBought: number;
    }[];
    status: STATUS;
}

export enum STATUS {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}