// BebidasFriasScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const BebidasFrias = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
        <Text style={styles.cartIcon}>🛒</Text>
      </View>

      {/* Título centrado */}
      <Text style={styles.title}>Bebidas Frías</Text>

      <ScrollView style={styles.content}>
        {/* Lista de bebidas */}
        <View style={styles.listContainer}>
          {/* Bebida 1 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets/BebidasFrias/soda.png')} style={styles.image_soda} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Soda</Text>
              <Text style={styles.description}>Refrescante y burbujeante en sabores de limón, frutos rojos y naranja</Text>
              <Text style={styles.price}>$8.000</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>AGREGAR AL CARRITO</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Cantidad en el carrito:</Text>
                <TextInput style={styles.quantityInput} keyboardType="numeric" defaultValue="0" />
              </View>
            </View>
          </View>

          {/* Bebida 2 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets/BebidasFrias/naranja.png')} style={styles.image_jugoNaranja} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Jugo de Naranja</Text>
              <Text style={styles.description}>Natural y refrescante, con el sabor cítrico perfecto para acompañar cualquier comida.</Text>
              <Text style={styles.price}>$6.000</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>AGREGAR AL CARRITO</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Cantidad en el carrito:</Text>
                <TextInput style={styles.quantityInput} keyboardType="numeric" defaultValue="0" />
              </View>
            </View>
          </View>

          {/* Bebida 3 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets/BebidasFrias/malteada.png')} style={styles.image_malteada} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Malteada</Text>
              <Text style={styles.description}>Cremosas y deliciosas, disponibles en sabores clásicos como chocolate, vainilla y fresa.</Text>
              <Text style={styles.price}>$12.000</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>AGREGAR AL CARRITO</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Cantidad en el carrito:</Text>
                <TextInput style={styles.quantityInput} keyboardType="numeric" defaultValue="0" />
              </View>
            </View>
          </View>

          {/* Bebida 4 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets/BebidasFrias/limonada.png')} style={styles.image_limonada} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Limonada</Text>
              <Text style={styles.description}>Refrescante y equilibrado, con el toque perfecto de acidez y dulzura para calmar la sed.</Text>
              <Text style={styles.price}>$5.000</Text>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.cartButton}>
                  <Text style={styles.cartButtonText}>AGREGAR AL CARRITO</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Cantidad en el carrito:</Text>
                <TextInput style={styles.quantityInput} keyboardType="numeric" defaultValue="0" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};

export default BebidasFrias;

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
    marginVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d32f2f',
    borderRadius: 8,
  },
  image_soda: {
    width: 110,
    height: 116,
    marginStart: 7,
  },
  image_jugoNaranja: {
    width: 95,
    height: 105,
  },
  image_malteada: {
    width: 60,
    height: 165,
    marginStart: 22,
  },
  image_limonada: {
    width: 120,
    height: 157,
    marginStart: 8,
  },
  textContainer: {
    flex: 1,
    marginStart: 21,
  },
  listItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginRight: 5,
  },
  quantityInput: {
    width: 40,
    height: 30,
    borderColor: '#d32f2f',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 5,
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
