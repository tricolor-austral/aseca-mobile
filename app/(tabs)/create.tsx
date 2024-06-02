import {SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "react-native-paper";
import {createProduct} from "@/api";
import {useState} from "react";
import {useProductsSelected} from "@/contexts/productContext";

export default function Create() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [supplier, setSupplier] = useState('')

    const { reFetchProducts } = useProductsSelected();

    const handleCreateProduct = async () => {
        if (name && price && quantity && supplier) {
            console.log(supplier)
            await createProduct(
                name,
                parseInt(price),
                parseInt(quantity),
                supplier,
            )
                .then(() => reFetchProducts());
        }
    }

    return (
        <SafeAreaView style={styles.page}>
            <Text style={styles.title}>Create Product</Text>
            <View style={styles.container}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={'white'}
                    placeholder="Enter Name"
                    style={styles.input}
                />
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    placeholderTextColor={'white'}
                    placeholder="Enter Price"
                    style={styles.input}
                />
                <TextInput
                    value={quantity}
                    onChangeText={setQuantity}
                    placeholderTextColor={'white'}
                    placeholder="Enter Quantity"
                    style={styles.input}
                />
                <TextInput
                    value={supplier}
                    onChangeText={setSupplier}
                    placeholderTextColor={'white'}
                    placeholder="Enter Supplier name"
                    style={styles.input}
                />
                <Button onPress={handleCreateProduct} mode="contained">
                    Create Product
                </Button>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 16,
        backgroundColor: 'black'
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    input: {
        width: '70%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        textAlign: 'center',
        color: 'white',
    },
})