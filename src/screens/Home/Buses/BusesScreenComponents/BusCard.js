import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { P } from "../../../../infrastructure/components/Text";
import { Spacer } from "../../../../infrastructure/components/spacer";
import { Button } from "react-native-paper";
import { ApiResponseContext } from "../../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { ApiData } from "../../../../services/context/ApiDataContext/ApiDataProvider";

export default function BusCard({ bus, navigation }) {
  const { setSelectedBus } = useContext(ApiResponseContext);
  const { fleets } = useContext(ApiData);
  // console.log(fleets, bus);
  const fleet = fleets.find((item) => item.id === bus.item.fleet_id);

  const handlePress = () => {
    setSelectedBus(bus);
    navigation.navigate("JourneyDetails");
  };

  return (
    <View
      style={{
        marginVertical: 10,
        width: "100%",
        backgroundColor: "#348DCD",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        padding: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Bus Name</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{bus.item.company_name}</P>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Departure</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{bus.item.start_time}</P>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Arrival</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{bus.item.end_time}</P>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Fleet Type</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{fleet.type}</P>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Total Seats</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{bus.item.total_seat}</P>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
          }}
        >
          <P style={{ fontWeight: "bold", color: "white" }}>Seats Available</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white", fontWeight: "bold" }}>
            {bus.item.available_seat} Seats Available
          </P>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          buttonColor="#1560bd"
          style={{ width: "50%", marginTop: 10 }}
          onPress={handlePress}
        >
          <P style={{ color: "white", fontWeight: 600 }}>Book</P>
        </Button>
      </View>
    </View>
  );
}
