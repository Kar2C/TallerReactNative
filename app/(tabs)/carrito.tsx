import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const CarritoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { products, setProducts } = route.params as { products: any[], setProducts: React.Dispatch<React.SetStateAction<any[]>> };

  const productosEnCarrito = products.filter((product) => product.quantity > 0);
  const total = productosEnCarrito.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleRemoveProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: Math.max(0, product.quantity - 1) } : product
      )
    );
  };

  const handleAddProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
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
              <Image source={item.image} style={styles.productImage} />
              <TouchableOpacity onPress={() => handleRemoveProduct(item.id)} style={styles.actionButton}>
                <Text style={styles.actionText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productQuantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleAddProduct(item.id)} style={styles.actionButton}>
                <Text style={styles.actionText}>+</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Precio: ${item.price.toLocaleString()}</Text>
                <Text style={styles.productTotal}>Total: ${(item.price * item.quantity).toLocaleString()}</Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.totalText}>Total: ${total.toLocaleString()}</Text>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutButton} onPress={() => alert('Proceso de pago')}>
        <Text style={styles.checkoutText}>Proceder al Pago</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarritoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d32f2f',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartIcon: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  actionButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 18,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  productQuantity: {
    fontSize: 16,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'left',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'left',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});