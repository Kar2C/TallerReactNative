import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BebidasFriasScreen = () => {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  const bebidasFrias = [
    {
      id: 1,
      name: "Soda",
      description: "Refrescante bebida con gas.",
      price: 1500,
      image: require("@/assets/BebidasFrias/soda.png"),
    },
    {
      id: 2,
      name: "Jugo de Naranja",
      description: "Natural y refrescante.",
      price: 2000,
      image: require("@/assets/BebidasFrias/naranja.png"),
    },
  ];

  const addToCart = async (item: { id: number; name: string; price: number }) => {
    const storedCart = await AsyncStorage.getItem("cart");
    let updatedCart = storedCart ? JSON.parse(storedCart) : [];

    const itemIndex = updatedCart.findIndex((i: { id: number }) => i.id === item.id);
    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {bebidasFrias.map((bebida) => (
        <View key={bebida.id} style={styles.bebidaContainer}>
          <Image source={bebida.image} style={styles.image} />
          <Text style={styles.name}>{bebida.name}</Text>
          <Text style={styles.description}>{bebida.description}</Text>
          <Text style={styles.price}>Precio: ${bebida.price}</Text>
          <TouchableOpacity onPress={() => addToCart(bebida)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Añadir al carrito</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  bebidaContainer: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    color: "#d32f2f",
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
    fontSize: 16,
  },
});

export default BebidasFriasScreen;
