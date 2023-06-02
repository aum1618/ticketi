import { ImageBackground, View } from "react-native";
import React, { useContext } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { Avatar, List } from "react-native-paper";
import { C, P, T } from "../../infrastructure/components/Text";
import ListItem from "./DrawerScreenComponents/ListItem/ListItem";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";

export default function DrawerScreen({ navigation }) {
  const { userData } = useContext(AsyncDataContext);
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
        <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
          <View>
            <ListItem navigation={navigation} />
          </View>
          {userData && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingBottom: 20,
              }}
            >
              {userData.country_id === "162" ? (
                <>
                  <P style={{ color: "#f0f0f0" }}>Made in 🇵🇰 with ❤️</P>
                  <P style={{ color: "#f0f0f0" }}>Powered by : MR.AUM</P>
                </>
              ) : (
                <>
                  <P style={{ color: "#f0f0f0" }}>Made in 🇮🇳 with ❤️</P>
                  <P style={{ color: "#f0f0f0" }}>Powered by : ASCITHUB-LKO</P>
                </>
              )}
            </View>
          )}
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
