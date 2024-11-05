import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const CarritoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); 
  const [orderDate, setOrderDate] = useState("");

  const fetchCart = async () => {
    const storedCart = await AsyncStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCart = async (updatedCart: { id: number; name: string; price: number; quantity: number }[]) => {
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const incrementQuantity = (id: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decrementQuantity = (id: number) => {
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

    updateCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateDeliveryCost = (subtotal: number) => {
    if (subtotal === 0) {
      return 0;
    } else if (subtotal > 90000) {
      return 0;
    } else if (subtotal > 70000) {
      return 3000;
    } else {
      return 5000;
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCost = calculateDeliveryCost(subtotal);
    return subtotal + deliveryCost;
  };

  const subtotal = calculateSubtotal();
  const deliveryCost = calculateDeliveryCost(subtotal);
  const total = calculateTotal();

  const confirmOrder = async () => {
    const newOrder = {
      date: orderDate,
      items: cart,
      subtotal,
      deliveryCost,
      total,
    };
    const storedOrders = await AsyncStorage.getItem("orders");
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    orders.unshift(newOrder);
    await AsyncStorage.setItem("orders", JSON.stringify(orders));
    setModalVisible(false);
    setOrderDate("");
    setCart([]);
    await AsyncStorage.removeItem("cart");
    navigation.navigate("Historial");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Precio Unitario: ${item.price}</Text>
            <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
            <Text style={styles.totalPrice}>
              Total: ${item.price * item.quantity}
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => decrementQuantity(item.id)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => incrementQuantity(item.id)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Subtotal: ${subtotal}</Text>
          <Text style={styles.summaryText}>Valor Domicilio: ${deliveryCost}</Text>
          <Text style={styles.summaryText}>Total: ${total}</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ingrese la fecha del pedido </Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={orderDate}
                onChangeText={setOrderDate}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmOrder}
                  style={styles.acceptButton}
                >
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón Directo a tu Puerta 🍲</Text>
      </View>
    </View>
  );
};

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
  scrollContainer: {
    padding: 16,
  },
  cartItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ff5722",
    borderRadius: 8,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#ff5722",
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
    backgroundColor: "#ff5722",
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
    borderColor: "#ff5722",
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: "#388e3c",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    padding: 8,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  cancelButton: {
    backgroundColor: "#ff5722",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  acceptButton: {
    backgroundColor: "#388e3c",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
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

export default CarritoScreen;
