import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { P } from "../../../../../infrastructure/components/Text";
import { IconButton } from "react-native-paper";

export default function PaymentMethod({ source, method, navigation }) {
  const images = {
    paypal: require("../../../../../../resources/paycard.png"),
    selcom: require("../../../../../../resources/selcom.png"),
    cash: require("../../../../../../resources/paycash.png"),
    card: require("../../../../../../resources/paycard.png"),
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(source)}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        borderRadius: 12,
        margin: 10,
        flex: 1,
        padding: 10,
      }}
    >
      <Image source={images[source]} style={{ height: 50, width: 100 }} />
      <P>{method} </P>
    </TouchableOpacity>
  );
}
