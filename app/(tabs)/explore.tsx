import {
    StyleSheet,
    Image,
    SafeAreaView,
    Text,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';
import ScrollView = Animated.ScrollView;
import {Button} from "react-native-paper";
import {useProductsSelected} from "@/contexts/productContext";
import {Product} from "@/utils/types";
import {buyProducts, getProducts} from "@/api";

const buyers = [
    "60361e51-2613-4454-af1c-b1481293a0e1",
    "7f28232b-e554-4f8e-ad59-aadc108f1911",
    "cd7e8069-aae4-4761-9a1b-eb7c189c2e23"
];

export default function Cart() {

    const { productsSelected, removeProductSelected } = useProductsSelected();

    const handleRemoveProduct = (product: Product) => {
        removeProductSelected(product);
    }

    const handleBuy = async () => {
        const buyerId =  buyers[Math.floor(Math.random() * buyers.length)];
        await buyProducts(productsSelected, buyerId);
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Buy Product</Text>
            </View>
            <ScrollView contentContainerStyle={styles.productContainer}>
                <View style={styles.justifyContent}>
                    {productsSelected.length > 0 ? (
                        productsSelected.map((product, index) => (
                            <View style={styles.selectedProduct} key={index}>
                                <Text style={styles.textColors}>
                                    {product.id.slice(0, 7) + ': '}
                                    <Text style={styles.textColors}>
                                        {product.qty + ' x $' + product.price}
                                    </Text>
                                </Text>
                                <TouchableOpacity onPress={() => handleRemoveProduct(product)}>
                                    <Image
                                        source={{ uri: 'https://cdn-icons-png.freepik.com/256/14025/14025328.png?ga=GA1.2.1998481517.1707690289&semt=ais_hybrid' }}
                                        style={{ width: 25, height: 25 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )))
                    :
                        <Text style={styles.textColors}>No products selected</Text>
                    }
                    {productsSelected.length > 0 && (
                        <View style={styles.total}>
                            <Text style={styles.textColors}>
                                Total: ${productsSelected.reduce((acc, product) => acc + product.price * product.qty, 0)}
                            </Text>
                        </View>
                    )}
                </View>
                <Button onPress={handleBuy} style={styles.button} mode={"contained"}>
                    Buy
                </Button>
            </ScrollView>
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
        gap: 8,
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: 'white'
    },
    productContainer: {
        padding: 16,
        display: 'flex',
        gap: 16,
        height: '100%',
        justifyContent: 'space-between',
    },
    selectedProduct: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    justifyContent: {
        display: 'flex',
    },
    textColors: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    total: {
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#4b2f4f',
        borderRadius: 8,
        color: 'black',
    },
    button: {
        marginBottom: 16,
        borderRadius: 8,
    }
});
