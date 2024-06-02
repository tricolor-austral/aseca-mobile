import {StyleSheet, SafeAreaView, View, Text, Animated} from 'react-native';
import {CardComponent} from "@/components/Card";
import ScrollView = Animated.ScrollView;
import {useProductsSelected} from "@/contexts/productContext";
import {useEffect, useState} from "react";
import {getProducts} from "@/api";
import {Product} from "@/utils/types";

const arrayOfProducts = [
  {
    id: 'MacBook Air',
    price: 100,
    qty: 1,
  },
  {
    id: 'Microsoft Book',
    price: 200,
    qty: 1,
  },
  {
    id: 'Lenovo Legion',
    price: 300,
    qty: 1,
  },
];

export default function HomeScreen() {

  const [products, setProducts] = useState<Product[]>([])
  const { reFetchProducts } = useProductsSelected();

  useEffect(() => {
    async function fetch() {
        const products = await getProducts();
        // @ts-ignore
      setProducts(products);
    }
    fetch();
  }, []);

  const { addProductSelected } = useProductsSelected();

  return (
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>See products</Text>
        </View>
        <ScrollView contentContainerStyle={styles.productContainer}>
          {products.map((product, index) => (
              <CardComponent
                  key={index}
                  product={product}
                  addProduct={addProductSelected}
                  reFetch={reFetchProducts}
              />
          ))}
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black'
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
  }
});
