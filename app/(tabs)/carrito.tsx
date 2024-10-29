import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const CarritoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { products, setProducts } = route.params as {
    products: any[];
    setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  };

  // Estado local para las cantidades
  const [localProducts, setLocalProducts] = useState(products);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const productosEnCarrito = localProducts.filter(
    (product) => product.quantity > 0
  );
  const subtotal = productosEnCarrito.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  let domicilio = 0;
  if (subtotal > 0) {
    domicilio = 5000;
    if (subtotal > 90000) {
      domicilio = 0;
    } else if (subtotal > 70000) {
      domicilio = 3000;
    }
  }

  const total = subtotal + domicilio;

  const handleRemoveProduct = (productId: number) => {
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      )
    );
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product
      )
    );
  };

  const handleAddProduct = (productId: number) => {
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cartIcon}>🔙</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Carrito de Compras</Text>

      <ScrollView style={styles.content}>
        <FlatList
          data={productosEnCarrito}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              {/* Se aplican estilos específicos a cada imagen según el nombre del producto */}
              <Image
                source={item.image}
                style={
                  item.name === "Soda"
                    ? styles.imageSoda
                    : item.name === "Jugo de Naranja"
                    ? styles.imageNaranja
                    : item.name === "Malteada"
                    ? styles.imageMalteada
                    : item.name === "Limonada"
                    ? styles.imageLimonada
                    : item.name === "Té de Valeriana"
                    ? styles.imagete
                    : item.name === "Tinto"
                    ? styles.imagetinto
                    : item.name === "Café en Leche"
                    ? styles.imagecafe
                    : item.name === "Chocolate"
                    ? styles.imageChocolate
                    : item.name === "Sopa de Tomate"
                    ? styles.image_sopaTomate
                    : item.name === "Sopa de Pasta"
                    ? styles.image_sopaPasta
                    : item.name === "Sancocho"
                    ? styles.image_sancocho
                    : item.name === "Crema de Auyama"
                    ? styles.image_cremaAuyama
                    : item.name === "Bandeja Paisa"
                    ? styles.imagePaisa
                    : item.name === "Hamburguesa"
                    ? styles.imageburguer
                    : item.name === "Pasta Carbonara"
                    ? styles.imagepasta
                    : item.name === "Perro Caliente"
                    ? styles.imageperro
                    : item.name === "Salmon"
                    ? styles.imagesalmon
                    : item.name === "Carne Asada"
                    ? styles.carneAsada
                    : item.name === "Carne Wok"
                    ? styles.carneWok
                    : item.name === "Pechuga"
                    ? styles.pechuga
                    : item.name === "Pollo"
                    ? styles.pollo
                    : styles.mojarra
                }
              />
              <TouchableOpacity
                onPress={() => handleRemoveProduct(item.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productQuantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => handleAddProduct(item.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>+</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  Precio: ${item.price.toLocaleString()}
                </Text>
                <Text style={styles.productTotal}>
                  Total: ${(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.totalText}>
          Subtotal: ${subtotal.toLocaleString()}
        </Text>
        <Text style={styles.totalText}>
          Domicilio: ${domicilio.toLocaleString()}
        </Text>
        <Text style={styles.totalText}>Total: ${total.toLocaleString()}</Text>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};

export default CarritoScreen;

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
    backgroundColor: "#d32f2f",
  },
  confirmButton: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 9,
    marginTop: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 8,
  },
  productImage: {
    width: 120,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  actionButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#d32f2f",
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: 18,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  productQuantity: {
    fontSize: 16,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "left",
  },
  productTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "left",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    backgroundColor: "#d32f2f",
    padding: 16,
    alignItems: "center",
    marginTop: 25,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
  imageSoda: { width: 110, height: 140, marginStart: 9 },
  imageNaranja: { width: 120, height: 150 },
  imageMalteada: { width: 85, height: 190, marginStart: 27 },
  imageLimonada: { width: 110, height: 140, marginStart: 7 },
  imagete: { width: 135, height: 115 },
  imagetinto: { width: 135, height: 170 },
  imagecafe: { width: 150, height: 150 },
  imageChocolate: { width: 145, height: 160 },
  image_sopaTomate: { width: 175, height: 145 },
  image_sopaPasta: { width: 153, height: 135, marginStart: 20 },
  image_sancocho: { width: 160, height: 125, marginStart: 14 },
  image_cremaAuyama: { width: 170, height: 157, marginStart: 8 },
  imagePaisa: { width: 210, height: 127 },
  imageburguer: { width: 175, height: 170 },
  imagepasta: { width: 170, height: 170 },
  imageperro: { width: 180, height: 150 },
  imagesalmon: { width: 170, height: 170 },
  carneAsada: { width: 210, height: 127 },
  carneWok: { width: 185, height: 130 },
  pechuga: { width: 200, height: 160 },
  pollo: { width: 180, height: 150 },
  mojarra: { width: 210, height: 120 },
});
