import { View, Text } from "react-native";
import React from "react";
import { Avatar, IconButton } from "react-native-paper";
import { T } from "../../../../../infrastructure/components/Text";

export default function TicketFinderHeader({ navigation }) {
  return (
    <>
      <View
        style={{
          marginRight: 20,
          marginTop: 35,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <IconButton
            icon="menu"
            iconColor="white"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <T style={{ color: "white" }}>TIKETI POPOTI</T>
        <Avatar.Image
          source={require("../../../../../../resources/logo.png")}
          style={{ backgroundColor: "rgba(0,0,0,0)" }}
          size={45}
        />
      </View>
      {/* <IconButton
        style={{ marginTop: 50 }}
        icon="chevron-left"
        iconColor="black"
        size={30}
        onPress={() => navigation.goBack()}
      /> */}
    </>
  );
}
