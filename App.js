// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './MenuScreen';
import BebidasFriasScreen from './BebidasFriasScreen'; // Nueva pantalla

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="BebidasFrias" component={BebidasFriasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
