import {StyleSheet, SafeAreaView, View, Text, Animated} from 'react-native';
import {CardComponent} from "@/components/Card";
import ScrollView = Animated.ScrollView;
import {useProductsSelected} from "@/contexts/productContext";

const arrayOfProducts = [
  {
    title: 'MacBook Air',
    price: 100,
    source: 'https://7x7.com.ar/wp-content/uploads/2023/08/MacBook-Air-con-M1-1000x600-1.jpg',
  },
  {
    title: 'Microsoft Book',
    price: 200,
    source: 'https://7x7.com.ar/wp-content/uploads/2023/08/MacBook-Air-con-M1-1000x600-1.jpg',
  },
  {
    title: 'Lenovo Legion',
    price: 300,
    source: 'https://7x7.com.ar/wp-content/uploads/2023/08/MacBook-Air-con-M1-1000x600-1.jpg',
  },
];

export default function HomeScreen() {

  const { addProductSelected } = useProductsSelected();


  return (
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add To Cart</Text>
        </View>
        <ScrollView contentContainerStyle={styles.productContainer}>
          {arrayOfProducts.map((product, index) => (
              <CardComponent
                  key={index}
                  title={product.title}
                  price={product.price}
                  source={product.source}
                  addProduct={addProductSelected}
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
