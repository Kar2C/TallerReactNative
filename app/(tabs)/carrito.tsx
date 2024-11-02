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
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as { id: number; name: string; price: number; quantity: number }[]);

    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calcular el subtotal
  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Calcular el costo del domicilio
  const calculateDeliveryCost = (subtotal: number) => {
    if (subtotal === 0) {
      return 0; // Domicilio gratis si el subtotal es 0
    } else if (subtotal > 90000) {
      return 0; // Domicilio gratis
    } else if (subtotal > 70000) {
      return 3000; // Domicilio a $3.000
    } else {
      return 5000; // Domicilio a $5.000
    }
  };

  // Calcular el total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCost = calculateDeliveryCost(subtotal);
    return subtotal + deliveryCost;
  };

  const subtotal = calculateSubtotal();
  const deliveryCost = calculateDeliveryCost(subtotal);
  const total = calculateTotal();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cart.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Precio Unitario: ${item.price}</Text>
          <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
          <Text style={styles.totalPrice}>Total: ${item.price * item.quantity}</Text>
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

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal}</Text>
        <Text style={styles.summaryText}>Valor Domicilio: ${deliveryCost}</Text>
        <Text style={styles.summaryText}>Total: ${total}</Text>
      </View>
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
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#388e3c",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    marginTop: 10,
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
  summaryContainer: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default CarritoScreen;
