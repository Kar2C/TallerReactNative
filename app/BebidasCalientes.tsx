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

const BebidasCalientesScreen = () => {
  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});

  const bebidasCalientes = [
    {
      id: 5,
      name: "Té de Valeriana",
      description: "Suave y relajante, ideal para disfrutar en momentos de calma y descanso.",
      price: 2500,
      image: require("@/assets/Bebidascalientes/te.png"),
      quantity: 0,
    },
    {
      id: 6,
      name: "Tinto",
      description: "Café negro, fuerte y aromático, perfecto para acompañar cualquier momento del día.",
      price: 1200,
      image: require("@/assets/Bebidascalientes/tinto.png"),
      quantity: 0,
    },
    {
      id: 7,
      name: "Café en Leche",
      description: "Suave y cremoso, con la combinación perfecta de café y leche para un sabor equilibrado y reconfortante.",
      price: 3000,
      image: require("@/assets/Bebidascalientes/cafe.png"),
      quantity: 0,
    },
    {
      id: 8,
      name: "Chocolate",
      description: "Cremoso y reconfortante, con un sabor intenso a cacao, ideal para endulzar cualquier momento.",
      price: 3500,
      image: require("@/assets/Bebidascalientes/chocolate.webp"),
      quantity: 0,
    },
  
  ];

  useEffect(() => {
    const fetchCartQuantities = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      const quantities = cart.reduce((acc: { [key: number]: number }, item: { id: number; quantity: number }) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
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
    <ScrollView contentContainerStyle={styles.container}>
      {bebidasCalientes.map((bebida) => (
        <View key={bebida.id} style={styles.bebidaContainer}>
          <Image source={bebida.image} style={styles.image} />
          <Text style={styles.name}>{bebida.name}</Text>
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
  quantityText: {
    fontSize: 14,
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
    fontSize: 16,
  },
});

export default BebidasCalientesScreen;
