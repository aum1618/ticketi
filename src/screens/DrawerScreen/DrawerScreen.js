import { ImageBackground, View } from "react-native";
import React from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { Avatar, List } from "react-native-paper";
import { T } from "../../infrastructure/components/Text";
import ListItem from "./DrawerScreenComponents/ListItem/ListItem";

export default function DrawerScreen({ navigation }) {
  return (
    <Wrapper>
      <ImageBackground
        source={require("../../../resources/backgroundImage.jpg")}
        style={{ flex: 1 }}
      >
        <View
          style={{
            height: "30%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar.Image
            source={require("../../../resources/logo.png")}
            size={74}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          />
          <T style={{ color: "white" }}>Tiketi Popoti</T>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <ListItem navigation={navigation} />
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
