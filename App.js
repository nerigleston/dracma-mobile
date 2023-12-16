import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TelaLogin from "./src/pages/login/login";
import TelaRecPassword from "./src/pages/recPassword/recPassword";
import TelaHome from "./src/pages/home/home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaRecPassword"
          component={TelaRecPassword}
          options={{
            title: "Recuperar Senha",
            headerStyle: { backgroundColor: "#020202" },
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="TelaHome"
          component={TelaHome}
          options={{
            title: "Home",
            headerStyle: { backgroundColor: "#020202" },
            headerTintColor: "#FFF",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
