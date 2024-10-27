// BebidasFriasScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const Sopitas = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comida al Vuelo</Text>
        <Text style={styles.cartIcon}>🛒</Text>
      </View>

      {/* Título centrado */}
      <Text style={styles.title}>Sopitas</Text>

      <ScrollView style={styles.content}>
        {/* Lista de bebidas */}
        <View style={styles.listContainer}>
          {/* Bebida 1 */}
          <View style={styles.listItemContainer}>
            <Image source={require('@/assets/sopitas/sopaTomate.png')} style={styles.image_sopaTomate} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Sopa de Tomate</Text>
              <Text style={styles.description}>Suave y sabrosa, con el auténtico sabor del tomate fresco, perfecta para una comida reconfortante.</Text>
              <Text style={styles.price}>$7.000</Text>
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
            <Image source={require('@/assets/sopitas/SopaPasta.png')} style={styles.image_sopaPasta} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Sopa de Pasta</Text>
              <Text style={styles.description}>Caliente y reconfortante, con pasta suave en un caldo sabroso, ideal para disfrutar en cualquier momento.</Text>
              <Text style={styles.price}>$10.000</Text>
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
            <Image source={require('@/assets/sopitas/Sancocho.png')} style={styles.image_sancocho} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Sancocho</Text>
              <Text style={styles.description}>Tradicional y sustancioso, con carne, tubérculos y verduras en un caldo lleno de sabor, perfecto para compartir en familia.</Text>
              <Text style={styles.price}>$10.000</Text>
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
            <Image source={require('@/assets/sopitas/cremaAuyama.png')} style={styles.image_cremaAuyama} />
            <View style={styles.textContainer}>
              <Text style={styles.listItemTitle}>Crema de Auyama</Text>
              <Text style={styles.description}>Suave y aterciopelada, con el sabor dulce y delicado de la auyama, perfecta para una comida ligera y reconfortante.</Text>
              <Text style={styles.price}>$7.000</Text>
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

export default Sopitas;

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
  image_sopaTomate: {
    width: 175,
    height: 145,
  },
  image_sopaPasta: {
    width: 153,
    height: 135,
    marginStart: 20,
  },
  image_sancocho: {
    width: 160,
    height: 125,
    marginStart: 14,
  },
  image_cremaAuyama: {
    width: 170,
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
