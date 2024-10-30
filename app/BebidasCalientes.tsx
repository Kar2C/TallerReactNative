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
    name: "Té de Valeriana",
    description: "Suave y relajante, ideal para disfrutar en momentos de calma y descanso.",
    price: 2500,
    image: require("@/assets/Bebidascalientes/te.png"),
    quantity: 0,
  },
  {
    id: 2,
    name: "Tinto",
    description: "Café negro, fuerte y aromático, perfecto para acompañar cualquier momento del día.",
    price: 1200,
    image: require("@/assets/Bebidascalientes/tinto.png"),
    quantity: 0,
  },
  {
    id: 3,
    name: "Café en Leche",
    description: "Suave y cremoso, con la combinación perfecta de café y leche para un sabor equilibrado y reconfortante.",
    price: 3000,
    image: require("@/assets/Bebidascalientes/cafe.png"),
    quantity: 0,
  },
  {
    id: 4,
    name: "Chocolate",
    description: "Cremoso y reconfortante, con un sabor intenso a cacao, ideal para endulzar cualquier momento.",
    price: 3500,
    image: require("@/assets/Bebidascalientes/chocolate.webp"),
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




      <Text style={styles.title}>Bebidas Calientes</Text>




      <ScrollView style={styles.content}>
        <View style={styles.listContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.listItemContainer}>
              <Image
                source={product.image}
                style={[
                  product.id === 1 && styles.imagete,
                  product.id === 2 && styles.imagetinto,
                  product.id === 3 && styles.imagecafe,
                  product.id === 4 && styles.imageChocolate,
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
  imagete: {
    width: 123,
    height: 105,
  },
  imagetinto: {
    width: 110,
    height: 140,
  },
  imagecafe: {
    width: 120,
    height: 120,
  },
  imageChocolate: {
    width: 120,
    height: 130,
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
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 7,
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
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
