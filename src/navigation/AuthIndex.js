import { View, Text } from "react-native";
import React, { useContext } from "react";
import AuthNavigator from "./AuthNavigator/AuthNavigator";
import { AsyncDataContext } from "../services/context/AsyncDataContext/AsyncDataContext";
import JourneyDetailsScreen from "../screens/Home/JourneyDetails/JourneyDetailsScreen";

export default function AuthIndex({ navigation }) {
  const { userData, token } = useContext(AsyncDataContext);
  return (
    <>
      {userData && token ? (
        <JourneyDetailsScreen navigation={navigation} />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
}
