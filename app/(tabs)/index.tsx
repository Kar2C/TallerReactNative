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

        <Text style={styles.sectionTitle}>BEBIDAS</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("BebidasFrias")}
          >
            <Image
              source={require("@/assets/bebidas_frias.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Bebidas frías</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("BebidasCalientes")}
          >
            <Image
              source={require("@/assets/bebidas_calientes.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Bebidas Calientes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>PLATOS FUERTES</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Sopitas")}
          >
            <Image
              source={require("@/assets/sopitas.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Sopitas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("PlatosCarta")}
          >
            <Image
              source={require("@/assets/platos_carta.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Platos a la carta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Corrientazo")}
          >
            <Image
              source={require("@/assets/corrientazo.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Platos del día</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>MENÚ INFANTIL</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("MenuInfantil")}
          >
            <Image
              source={require("@/assets/menu_infantil.png")}
              style={styles.image}
            />
            <Text style={styles.itemText}>Menú Infantil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </ScrollView>

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
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ff5722",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: 22,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 18,
    color: "#ff5722",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    alignItems: "center",
    width: 130, 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  image: {
    width: 100, 
    height: 100,
    resizeMode: "contain",
  },
  separator: {
    borderBottomColor: "#ff5722",
    borderBottomWidth: 2,
    marginVertical: 18,
  },
  footer: {
    backgroundColor: "#ff5722",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});
