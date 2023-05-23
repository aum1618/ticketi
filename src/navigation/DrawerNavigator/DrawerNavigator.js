import { View, Text } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigator from "../MainNavigator/MainNavigator";
import DrawerScreen from "../../screens/DrawerScreen/DrawerScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerPosition="left"
      drawerStyle={{ backgroundColor: "transparent" }}
      drawerContent={(props) => <DrawerScreen {...props} />}
      screenOptions={{ headerShown: false }}
      // screenOptions={{ gestureEnabled: false }}
    >
      <Drawer.Screen name="Dashboard" component={MainNavigator} />
    </Drawer.Navigator>
  );
}
