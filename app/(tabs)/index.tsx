import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const MenuScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Comida al Vuelo</Text>
          <TouchableOpacity onPress={() => navigation.navigate("carrito", { products: [] })}>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
        </View>

        {/* Sección: Bebidas */}
        <Text style={styles.sectionTitle}>BEBIDAS</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("BebidasFrias")}
          >
            <Image
              source={require("@/assets/bebidas_frias.png")}
              style={styles.image_bebidaFria}
            />
            <Text style={styles.itemText}>Bebidas frías</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("BebidasCalientes")}
          >
            <Image
              source={require("@/assets/bebidas_calientes.png")}
              style={styles.image_bebidaCaliente}
            />
            <Text style={styles.itemText}>Bebidas Calientes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        {/* Sección: Platos Fuertes */}
        <Text style={styles.sectionTitle}>PLATOS FUERTES</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Sopitas")}
          >
            <Image
              source={require("@/assets/sopitas.png")}
              style={styles.image_sopitas}
            />
            <Text style={styles.itemText}>Sopitas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("PlatosCarta")}
          >
            <Image
              source={require("@/assets/platos_carta.png")}
              style={styles.image_platosCarta}
            />
            <Text style={styles.itemText}>Platos fuertes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Corrientazo")}
          >
            <Image
              source={require("@/assets/corrientazo.png")}
              style={styles.image_corrientazo}
            />
            <Text style={styles.itemText}>Corrientazo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        {/* Sección: Menú Infantil */}
        <Text style={styles.sectionTitle}>MENÚ INFANTIL</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("MenuInfantil")}
          >
            <Image
              source={require("@/assets/menu_infantil.png")}
              style={styles.image_menuInfantil}
            />
            <Text style={styles.itemText}>Menú Infantil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Sazón directo a tu puerta 🍲</Text>
      </View>
    </View>
  );
};

export default MenuScreen;

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
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 20,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    alignItems: "center",
    width: 110,
  },
  itemText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 17
  },
  image_bebidaFria: {
    width: 75,
    height: 70,
  },
  image_bebidaCaliente: {
    width: 75,
    height: 70,
  },
  image_sopitas: {
    width: 85,
    height: 70,
  },
  image_platosCarta: {
    width: 120,
    height: 70,
  },
  image_corrientazo: {
    width: 120,
    height: 70,
  },
  image_menuInfantil: {
    width: 65,
    height: 80,
  },
  separator: {
    borderBottomColor: "#d32f2f",
    borderBottomWidth: 3,
    marginVertical: 35,
  },
  footer: {
    backgroundColor: "#d32f2f",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});
