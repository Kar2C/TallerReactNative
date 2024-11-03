import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistorialScreen: React.FC = () => {
  const [orders, setOrders] = useState<
    { date: string; items: any[]; subtotal: number; deliveryCost: number; total: number }[]
  >([]);

  // Función para cargar el historial de pedidos desde AsyncStorage
  const loadOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem("orders");
      const parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
      console.log("Orders loaded:", parsedOrders); // Verificar pedidos cargados
      setOrders(parsedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();

    // Intervalo para actualizar el historial de pedidos cada 2 segundos
    const interval = setInterval(() => {
      loadOrders();
    }, 2000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Pedidos</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No hay pedidos en el historial.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()} // Idealmente, aquí deberías tener un ID único
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.dateText}>Fecha: {item.date}</Text>
              <Text style={styles.subtotalText}>Subtotal: ${item.subtotal}</Text>
              <Text style={styles.deliveryCostText}>Domicilio: ${item.deliveryCost}</Text>
              <Text style={styles.totalText}>Total: ${item.total}</Text>
              <Text style={styles.itemsTitle}>Items:</Text>
              {item.items.map((product, i) => (
                <Text key={i} style={styles.itemText}>
                  {product.name} x {product.quantity} - ${product.price * product.quantity}
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  noOrdersText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  orderContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtotalText: {
    fontSize: 16,
  },
  deliveryCostText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "#388e3c",
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default HistorialScreen;
