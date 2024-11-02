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

const bebidasCalientes = () => {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  const bebidasCalientes = [
    {
      id: 3,
      name: "Tinto",
      description: "Café colombiano tradicional.",
      price: 1000,
      image: require("@/assets/Bebidascalientes/tinto.png"),
    },
    {
      id: 4,
      name: "Café",
      description: "Café espresso.",
      price: 1500,
      image: require("@/assets/Bebidascalientes/cafe.png"),
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
      {bebidasCalientes.map((bebida) => (
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

export default bebidasCalientes;
