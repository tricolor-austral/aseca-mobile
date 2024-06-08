import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    Animated,
} from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { Order, STATUS } from "@/utils/types";
import {getOrders} from "@/api";

/*
const orders: Order[] = [
    {
        id: 'order-1',
        buyerId: 'buyer-1',
        products: [
            {
                productIds: 'product-1',
                qty: 1,
            },
            {
                productIds: 'product-2',
                qty: 1,
            },
            {
                productIds: 'product-3',
                qty: 1,
            },
        ],
        status: STATUS.PENDING
    },
    {
        id: 'order-2',
        buyerId: 'buyer-2',
        products: [
            {
                productIds: 'product-1',
                qty: 1,
            },
            {
                productIds: 'product-2',
                qty: 1,
            },
            {
                productIds: 'product-3',
                qty: 1,
            },
        ],
        status: STATUS.ACCEPTED
    },
    {
        id: 'order-3',
        buyerId: 'buyer-3',
        products: [
            {
                productIds: 'product-1',
                qty: 1,
            },
            {
                productIds: 'product-2',
                qty: 1,
            },
            {
                productIds: 'product-3',
                qty: 1,
            },
        ],
        status: STATUS.REJECTED
    }
];
*/
export default function Cart() {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        async function fetch() {
            const orders = await getOrders();
            console.log(orders);
            setOrders(orders);
        }
        fetch();
    }, []);


    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>See orders</Text>
            </View>
            <Animated.ScrollView contentContainerStyle={styles.productContainer}>
                <View style={styles.justifyContent}>
                    <List.AccordionGroup>
                        {
                            orders?.map((order, index) => (
                                <List.Accordion
                                    key={order.orderId}
                                    title={`Order ID: ${order.orderId}`}
                                    id={order.orderId}
                                    style={{backgroundColor: 'black'}}
                                    titleStyle={{color: 'white'}}
                                    left={(props) => <IconButton {...props} icon="cart" />}
                                >
                                    <Text style={styles.textColors}>Order ID: {order.orderId}</Text>
                                    <Text style={styles.textColors}>Status: {order.status}</Text>
                                    {order?.products?.map((product) => (
                                        <View key={product.productIds}>
                                            <Text style={styles.textColors}>---------------------------</Text>
                                            <Text style={styles.textColors}>- Product ID: {product.productIds}</Text>
                                            <Text style={styles.textColors}>- Name: {product.name}</Text>
                                            <Text style={styles.textColors}>- Quantity: {product.qtyBought}</Text>
                                        </View>
                                    ))}
                                    <Text style={styles.textColors}>---------------------------</Text>
                                </List.Accordion>
                            ))
                        }
                    </List.AccordionGroup>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black',
        height: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: 'white'
    },
    productContainer: {
        padding: 8,
        display: 'flex',
        gap: 8,
        height: '100%',
        justifyContent: 'space-between',
    },
    justifyContent: {
        display: 'flex',
    },
    textColors: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
