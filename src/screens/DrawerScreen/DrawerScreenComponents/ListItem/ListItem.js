import { View, Text, Alert, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import { List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncDataContext } from "../../../../services/context/AsyncDataContext/AsyncDataContext";

export default function ListItem({ navigation }) {
  const { removeToken, removeUserData, userData, token } =
    useContext(AsyncDataContext);
  const screens = [
    { title: "Home", icon: "home", navigate: "ticketSearch" },
    { title: "Profile", icon: "account", navigate: "profile" },
    { title: "Booking History", icon: "history", navigate: "history" },
    { title: "About us", icon: "arch", navigate: "about" },
    { title: "Policy", icon: "book-edit", navigate: "policy" },
    { title: "FAQ", icon: "map-marker-question", navigate: "faq" },
    { title: "Logout", icon: "login", navigate: "Logout" },
  ];
  const screens2 = [
    { title: "Home", icon: "home", navigate: "ticketSearch" },
    { title: "Login", icon: "login", navigate: "login" },
    { title: "About us", icon: "arch", navigate: "about" },
    { title: "Policy", icon: "book-edit", navigate: "policy" },
    { title: "FAQ", icon: "map-marker-question", navigate: "faq" },
  ];
  const handleNavigate = (item) => {
    navigation.navigate(item);
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you Sure", [
      {
        text: "cancel",
        onPress: () => {
          console.log("cancelled");
        },
      },
      {},
      {
        text: "Yes",
        onPress: () => {
          console.log("OK Pressed");
          removeToken(), removeUserData();
          ToastAndroid.show("Logged out Successfully", ToastAndroid.SHORT);
          navigation.toggleDrawer();
        },
      },
    ]);
  };
  return (
    <>
      {userData && token
        ? screens.map((screen, i) => {
            return (
              <List.Item
                key={i}
                onPress={() =>
                  screen.title === "Logout"
                    ? handleLogout()
                    : handleNavigate(screen.navigate)
                }
                title={screen.title}
                titleStyle={{ color: "white" }}
                left={(props) => (
                  <List.Icon {...props} icon={screen.icon} color="white" />
                )}
              />
            );
          })
        : screens2.map((screen, i) => {
            return (
              <List.Item
                key={i}
                onPress={() =>
                  screen.title === "Logout"
                    ? handleLogout()
                    : handleNavigate(screen.navigate)
                }
                title={screen.title}
                titleStyle={{ color: "white" }}
                left={(props) => (
                  <List.Icon {...props} icon={screen.icon} color="white" />
                )}
              />
            );
          })}
    </>
  );
}
