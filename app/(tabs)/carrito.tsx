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

  // Cálculo del costo de domicilio
  let domicilio = 0; // Inicialmente se establece el domicilio en 0
  if (subtotal > 0) {
    domicilio = 5000; // Costo base del domicilio
    if (subtotal > 90000) {
      domicilio = 0; // Domicilio gratis
    } else if (subtotal > 70000) {
      domicilio = 3000; // Domicilio a $3.000
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
                    : styles.imageLimonada
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
  imageSoda: {
    width: 110,
    height: 140,
    marginStart: 9,
  },
  imageNaranja: {
    width: 120,
    height: 150,
  },
  imageMalteada: {
    width: 85,
    height: 190,
    marginStart: 27,
  },
  imageLimonada: {
    width: 110,
    height: 140,
    marginStart: 7,
  },
});
