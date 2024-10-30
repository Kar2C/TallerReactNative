import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
  quantity: number;
};

const productsData: Product[] = [
  {
    id: 1,
    name: "Bandeja Paisa",
    description: "...",
    price: 250,
    image: require("@/assets/platosCarta/bandejaPaisa.png"),
    quantity: 0,
  },
  {
    id: 2,
    name: "Hamburguesa",
    description: "...",
    price: 120,
    image: require("@/assets/platosCarta/hamburguesa.png"),
    quantity: 0,
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    description: "...",
    price: 300,
    image: require("@/assets/platosCarta/pasta.png"),
    quantity: 0,
  },
  {
    id: 4,
    name: "Perro Caliente",
    description: "...",
    price: 350,
    image: require("@/assets/platosCarta/perro.png"),
    quantity: 0,
  },
  {
    id: 5,
    name: "Salmon",
    description: "...",
    price: 3500,
    image: require("@/assets/platosCarta/salmon.png"),
    quantity: 0,
  },
];




const BebidasCalientes = () => {
  const [products, setProducts] = useState(productsData);
  const navigation = useNavigation<StackNavigationProp<any>>();




  const addToCart = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("carrito", { products, setProducts })
          }
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Platos a la carta</Text>

      <ScrollView style={styles.content}>
        <View style={styles.listContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.listItemContainer}>
              <Image
                source={product.image}
                style={[
                  product.id === 1 && styles.imagePaisa,
                  product.id === 2 && styles.imageburguer,
                  product.id === 3 && styles.imagepasta,
                  product.id === 4 && styles.imageperro,
                  product.id === 5 && styles.imagesalmon,
                ]}
              />
              <View style={styles.textContainer}>
                <Text style={styles.listItemTitle}>{product.name}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>
                  ${product.price.toLocaleString()}
                </Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(product.id)}
                  >
                    <Text style={styles.cartButtonText}>AGREGAR AL CARRITO</Text>
                  </TouchableOpacity>
                  <Text style={styles.label}>
                    Cantidad en el carrito: {product.quantity}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>




      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};




export default BebidasCalientes;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#d32f2f",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 8,
  },
  imagePaisa: {
    width: 210,
    height: 127,
  },
  imageburguer: {
    width: 175,
    height: 170,
  },
  imagepasta: {
    width: 170,
    height: 170,
  },
  imageperro: {
    width: 180,
    height: 150,
  },
  imagesalmon: {
    width: 170,
    height: 170,
  },
  textContainer: {
    flex: 1,
    marginStart: 21,
  },
  listItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginRight: 5,
  },
  footer: {
    backgroundColor: "#d32f2f",
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});
