import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistorialScreen: React.FC = () => {
  const [orders, setOrders] = useState<
    { date: string; items: any[]; subtotal: number; deliveryCost: number; total: number }[]
  >([]);

  const loadOrders = async () => {
    try {
      const storedOrders = await AsyncStorage.getItem("orders");
      let parsedOrders = storedOrders ? JSON.parse(storedOrders) : [];
      
      parsedOrders.sort((a: { date: string }, b: { date: string }) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  
      console.log("Orders loaded:", parsedOrders);
      setOrders(parsedOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };  

  const deleteOrder = async (index: number) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);

    try {
      await AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Historial de Pedidos</Text>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>No hay pedidos en el historial.</Text>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
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
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteOrder(index)}>
                  <Text style={styles.deleteButtonText}>Eliminar Pedido</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón Directo a tu Puerta 🍲</Text>
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
    backgroundColor: "#ff5722",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 16,
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
    borderWidth: 2,
    borderColor: "#ff5722",
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
  deleteButton: {
    backgroundColor: "#ff5722",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#ff5722",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default HistorialScreen;