import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarritoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      {/* Agrega más contenido o funcionalidades según sea necesario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});

export default CarritoScreen;