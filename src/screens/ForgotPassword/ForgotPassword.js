import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { H4, P } from "../../infrastructure/components/Text";
import { Button, TextInput } from "react-native-paper";

export default function ForgotPassword() {
  return (
    <Wrapper>
      <ImageBackground
        source={require("../../../resources/backgroundImage.jpg")}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        <Image
          source={require("../../../resources/logo.png")}
          style={{ height: 100, width: 100, margin: 10 }}
        />

        <View
          style={{
            height: 200,
            width: 300,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <H4>Forgot Password?</H4>
          </View>
          <TextInput
            style={{ margin: 10 }}
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            mode="outlined"
            label="Enter Your Email"
          />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              // loading={loading}
              mode="contained"
              buttonColor="#1560bd"
              style={{ width: "50%", marginTop: 10 }}
              // onPress={handlePress}
              icon="lock"
            >
              <P style={{ color: "white", fontWeight: 600 }}>Reset</P>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
