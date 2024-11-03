import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


const BebidasFriasScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();


  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});


  const bebidasFrias = [
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


  useEffect(() => {
    const fetchCartQuantities = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      const quantities = cart.reduce(
        (acc: { [key: number]: number }, item: { id: number; quantity: number }) => {
          acc[item.id] = item.quantity;
          return acc;
        },
        {}
      );
      setCartQuantities(quantities);
    };


    fetchCartQuantities();
  }, []);


  const addToCart = async (item: { id: number; name: string; price: number }) => {
    const storedCart = await AsyncStorage.getItem("cart");
    let updatedCart = storedCart ? JSON.parse(storedCart) : [];


    const itemIndex = updatedCart.findIndex((i: { id: number }) => i.id === item.id);
    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }


    setCartQuantities((prev) => ({
      ...prev,
      [item.id]: updatedCart[itemIndex]?.quantity || 1,
    }));


    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al vuelo</Text>
        <TouchableOpacity onPress={() => navigation.navigate("carrito", { products: [] })}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
      </View>


      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.container}>
        {bebidasFrias.map((bebida) => (
          <View key={bebida.id} style={styles.bebidaContainer}>
            <Text style={styles.name}>{bebida.name}</Text>
            <Image source={bebida.image} style={styles.image} />
            <Text style={styles.description}>{bebida.description}</Text>
            <Text style={styles.price}>Precio: ${bebida.price}</Text>
            <Text style={styles.quantityText}>
              Cantidad en el carrito: {cartQuantities[bebida.id] || 0}
            </Text>
            <TouchableOpacity onPress={() => addToCart(bebida)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Añadir al carrito</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>


      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
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
  container: {
    padding: 16,
  },
  bebidaContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 8,
  },
  image: {
    width: 140,
    height: 140,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 20,
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#555",
  },
  price: {
    fontSize: 18,
    color: "#d32f2f",
    marginTop: 5,
  },
  quantityText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#d32f2f",
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    },
  addButtonText: {
    color: "#fff",
    fontSize: 19,
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


export default BebidasFriasScreen;