import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import {Product} from "@/utils/types";

interface CardProps {
    title: string;
    price: number;
    source: string;
    addProduct: (product: Product) => void;
}
export const CardComponent = ({ title, price, source, addProduct }: CardProps) => {
    const [quantity, setQuantity] = useState('');

    const handleAddProduct = () => {
        if (quantity) {
            const product: Product = {
                title,
                price,
                quantity: parseInt(quantity, 10),
            };
            addProduct(product);
            setQuantity('');
        }
    }

    return (
        <Card style={styles.card}>
            <Card.Title
                title={title}
                subtitle={`$${price}`}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
            />
            <Card.Cover source={{ uri: source }} style={styles.cover} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    placeholder="Quantity"
                />
            </View>
            <Card.Actions style={styles.actions}>
                <Button mode="contained" onPress={handleAddProduct}>
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
