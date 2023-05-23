import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/Login/Login";
import ForgotPassword from "../../screens/ForgotPassword/ForgotPassword";
import SignUp from "../../screens/SignUp/SignUp";
import Country from "../../screens/Country/Country";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forget" component={ForgotPassword} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="country" component={Country} />
    </Stack.Navigator>
  );
}
