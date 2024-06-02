import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import { Card, Button } from 'react-native-paper';
import {Product} from "@/utils/types";
import {addStock} from "@/api";

interface CardProps {
    product: Product;
    addProduct: (product: Product) => void;
    reFetch: () => void;
}
export const CardComponent = ({ product, addProduct, reFetch }: CardProps) => {
    const { id, price, qty, name } = product;
    const [quantity, setQuantity] = useState('');

    const handleAddStock = () => {
        if (quantity) {
            setQuantity('')
            addStock(id, parseInt(quantity))
        }
    }

    return (
        <Card style={styles.card}>
            <Card.Title
                title={name}
                subtitle={`$${price}`}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
            />
            <Card.Cover
                source={{ uri: 'https://7x7.com.ar/wp-content/uploads/2023/08/MacBook-Air-con-M1-1000x600-1.jpg' }}
                style={styles.cover}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder="Add Stock"
                />
            </View>
            <Card.Actions style={styles.actions}>
                <Text>Stock: {qty}</Text>
                <Button mode="contained" onPress={handleAddStock}>
                    Add
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
    },
    cover: {
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    inputContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        width: '50%',
        textAlign: 'center',
    },
    actions: {
        justifyContent: 'flex-end',
    },
});
