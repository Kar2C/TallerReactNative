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
    name: "Soda",
    description: "Refrescante y burbujeante en sabores de limón, frutos rojos y naranja",
    price: 8000,
    image: require("@/assets/BebidasFrias/soda.png"),
    quantity: 0,
  },
  {
    id: 2,
    name: "Jugo de Naranja",
    description: "Natural y refrescante, con el sabor cítrico perfecto para acompañar cualquier comida.",
    price: 6000,
    image: require("@/assets/BebidasFrias/naranja.png"),
    quantity: 0,
  },
  {
    id: 3,
    name: "Malteada",
    description: "Cremosas y deliciosas, disponibles en sabores clásicos como chocolate, vainilla y fresa.",
    price: 12000,
    image: require("@/assets/BebidasFrias/malteada.png"),
    quantity: 0,
  },
  {
    id: 4,
    name: "Limonada",
    description: "Refrescante y equilibrado, con el toque perfecto de acidez y dulzura para calmar la sed.",
    price: 5000,
    image: require("@/assets/BebidasFrias/limonada.png"),
    quantity: 0,
  },
];


const BebidasFrias = () => {
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


      <Text style={styles.title}>Bebidas Frías</Text>


      <ScrollView style={styles.content}>
        <View style={styles.listContainer}>
          {products.map((product) => (
            <View key={product.id} style={styles.listItemContainer}>
              <Image
                source={product.image}
                style={[
                  product.id === 1 && styles.imageSoda,
                  product.id === 2 && styles.imageNaranja,
                  product.id === 3 && styles.imageMalteada,
                  product.id === 4 && styles.imageLimonada,
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


export default BebidasFrias;


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
  imageSoda: {
    width: 110,
    height: 140,
    marginStart: 9,
  },
  imageNaranja: {
    width: 120,
    height: 150,
  },
  imageMalteada: {
    width: 85,
    height: 190,
    marginStart: 27,
  },
  imageLimonada: {
    width: 110,
    height: 140,
    marginStart: 7,
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


