import { View, Text, ImageBackground } from "react-native";
import React from "react";

export default function ImageHeader({ children }) {
  return (
    <ImageBackground
      source={require("../../../resources/header.png")}
      imageStyle={{ height: 300, width: "100%" }}
      style={{
        width: "100%",
        height: 150,
      }}
    >
      {children}
    </ImageBackground>
  );
}
