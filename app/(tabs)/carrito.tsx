import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarritoScreen = () => {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  // Función para obtener el carrito actualizado
  const fetchCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
  };

  // useEffect que se llama cuando la pantalla se renderiza
  useEffect(() => {
    fetchCart();  // Cargar el carrito al inicio
  }, []);

  // useEffect que escucha cambios en el AsyncStorage
  useEffect(() => {
    const updateCart = async () => {
      fetchCart(); // Actualizar el carrito al detectar cambios
    };
    const interval = setInterval(updateCart, 1000); // Cada segundo verifica cambios
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  // Función para incrementar la cantidad
  const incrementQuantity = async (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Función para disminuir la cantidad
  const decrementQuantity = async (id: number) => {
    const updatedCart = cart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          // Disminuir la cantidad si es mayor a 1
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
        // Si la cantidad es 1, no lo agrega al nuevo carrito, eliminándolo efectivamente
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as { id: number; name: string; price: number; quantity: number }[]);
  
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cart.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Precio: ${item.price}</Text>
          <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
          </View>
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
  cartItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#d32f2f",
  },
  itemQuantity: {
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
  },
  quantityButton: {
    backgroundColor: "#d32f2f",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CarritoScreen;
