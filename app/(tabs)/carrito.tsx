import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CarritoScreen = () => {
  const route = useRoute();
  const { products } = route.params as { products: any[] }; // Recibe los productos desde la ruta

  // Calcula el total
  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>

      <FlatList
        data={products.filter((product) => product.quantity > 0)} // Muestra solo los productos con cantidad > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
            <Text style={styles.productPrice}>Precio: ${item.price.toLocaleString()}</Text>
            <Text style={styles.productTotal}>Total: ${(item.price * item.quantity).toLocaleString()}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${total.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    color: '#d32f2f',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CarritoScreen;
