import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator/AuthNavigator";
import DrawerNavigator from "./DrawerNavigator/DrawerNavigator";
import { AsyncDataContext } from "../services/context/AsyncDataContext/AsyncDataContext";

export default function IndexScreen() {
  const { userData, token } = useContext(AsyncDataContext);
  console.log("hello");
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
