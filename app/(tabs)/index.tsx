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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Comida al Vuelo</Text>
            <TouchableOpacity onPress={() => navigation.navigate("carrito", { products: [] })}>
              <Text style={styles.cartIcon}>🛒</Text>
            </TouchableOpacity>
          </View>
        </View>


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
            <Text>Bebidas frias</Text>
          </TouchableOpacity>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("BebidasCalientes")}
            >
              <Image
                source={require("@/assets/bebidas_calientes.png")}
                style={styles.image_platoCarta}
              />
              <Text>Bebidas Calientes</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Section: Platos Fuertes */}
        <Text style={styles.sectionTitle}>PLATOS FUERTES</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Sopitas")}
            >
              <Image
                source={require("@/assets/sopitas.png")}
                style={styles.image_Sopitas}
              />
              <Text>Sopitas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("PlatosCarta")}
            >
              <Image
                source={require("@/assets/platos_carta.png")}
                style={styles.image_platoCarta}
              />
              <Text>Platos a la carta</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("Corrientazo")}
            >
              <Image
                source={require("@/assets/corrientazo.png")}
                style={styles.image_platoCarta}
              />
              <Text>Corrientazo</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Section: Menu Infantil */}
        <Text style={styles.sectionTitle}>MENÚ INFANTIL</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("MenuInfantil")}
            >
              <Image
                source={require("@/assets/menu_infantil.png")}
                style={styles.image_MenuInfantil}
              />
              <Text>Menu Infantil</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
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
    fontSize: 24,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 35,
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  item: {
    alignItems: "center",
    width: 110,
  },
  image_platoCarta: {
    width: 120,
    height: 70,
  },
  image_bebidaFria: {
    width: 75,
    height: 70,
  },
  image_Sopitas: {
    width: 85,
    height: 70,
  },
  image_MenuInfantil: {
    width: 65,
    height: 80,
  },
  footer: {
    backgroundColor: "#d32f2f",
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
  },
});


