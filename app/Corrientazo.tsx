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


const PlatoDia = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();


  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});


  const PlatoDia = [
    {
      id: 18,
      name: "Carne Asada",
      description: "Jugosa carne a la parrilla, acompañada de arroz esponjoso, papas doradas, huevo frito y verduras frescas para una comida completa y deliciosa.",
      price: 250,
      image: require("@/assets/corrientazo/carneAsada.png"),
      quantity: 0,
    },
    {
      id: 19,
      name: "Carne Wok",
      description: "Trozos de carne salteados al wok, acompañados de arroz suave, huevo frito y papas doradas para un plato lleno de sabor y textura.",
      price: 120,
      image: require("@/assets/corrientazo/carneWok.png"),
      quantity: 0,
    },
    {
      id: 20,
      name: "Pechuga",
      description: "Pechuga de pollo jugosa a la plancha, servida con una ensalada fresca, arroz, frijoles, plátano maduro, una cremosa salsa de champiñones y jugo natural para acompañar. Una combinación completa y balanceada.",
      price: 300,
      image: require("@/assets/corrientazo/pechuga.png"),
      quantity: 0,
    },
    {
      id: 21,
      name: "Pollo",
      description: " Tierno pollo acompañado de arroz esponjoso y verduras frescas, perfecto para una comida ligera y nutritiva.",
      price: 350,
      image: require("@/assets/corrientazo/pollo.png"),
      quantity: 0,
    },
    {
      id: 22,
      name: "Mojarra",
      description: "Deliciosa y crujiente, con piel dorada y carne jugosa, perfecta para disfrutar con limón y acompañada de arroz y ensalada.",
      price: 3500,
      image: require("@/assets/corrientazo/trucha.png"),
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
        {PlatoDia.map((bebida) => (
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
    width: 150,
    height: 150,
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


export default PlatoDia;