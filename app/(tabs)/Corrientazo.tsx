// BebidasFriasScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Corrientazo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cartIcon}>🛒</Text>
      </View>

      {/* Contenido de la página de Bebidas Frías */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Corrientazo</Text>
        {/* Aquí puedes agregar más contenido específico de esta pantalla */}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};

export default Corrientazo;

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#d32f2f',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
