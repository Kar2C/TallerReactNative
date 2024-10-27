// BebidasFriasScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const BebidasCalientes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
        <Text style={styles.cartIcon}>🛒</Text>
      </View>

      {/* Título centrado */}
      <Text style={styles.title}>Bebidas Calientes</Text>

      <ScrollView style={styles.content}>
        {/* Lista de bebidas */}
        <View style={styles.listContainer}>
          {/* Bebida 1 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets//Bebidascalientes/te.png')} style={styles.image_te} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Té de Valeriana</Text>
              <Text style={styles.description}>Suave y relajante, ideal para disfrutar en momentos de calma y descanso.</Text>
              <Text style={styles.price}>$2.500</Text>
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
            <Image source={require('@/assets/Bebidascalientes/tinto.png')} style={styles.image_tinto} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Tinto</Text>
              <Text style={styles.description}>Café negro, fuerte y aromático, perfecto para acompañar cualquier momento del día.</Text>
              <Text style={styles.price}>$1.200</Text>
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
            <Image source={require('@/assets/Bebidascalientes/cafe.png')} style={styles.image_cafe} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Café en Leche</Text>
              <Text style={styles.description}>Suave y cremoso, con la combinación perfecta de café y leche para un sabor equilibrado y reconfortante.</Text>
              <Text style={styles.price}>$3.000</Text>
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
            <Image source={require('@/assets/Bebidascalientes/chocolate.webp')} style={styles.image_chocolate} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Chocolate</Text>
              <Text style={styles.description}>Cremoso y reconfortante, con un sabor intenso a cacao, ideal para endulzar cualquier momento.</Text>
              <Text style={styles.price}>$3.500</Text>
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

export default BebidasCalientes;

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
  image_te: {
    width: 125,
    height: 105,
    marginStart: 7,
  },
  image_tinto: {
    width: 130,
    height: 150,
  },
  image_cafe: {
    width: 115,
    height: 130,
    marginStart: 17,
  },
  image_chocolate: {
    width: 143,
    height: 157,
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
