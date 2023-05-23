import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Spacer } from "../../infrastructure/components/spacer";
import { P } from "../../infrastructure/components/Text";
import { Button } from "react-native-paper";
import { ApiData } from "../../services/context/ApiDataContext/ApiDataProvider";

export default function BookingHistoryCard({ item, navigation }) {
  const { locations } = useContext(ApiData);
  const pickLocation = locations.find((x) => x.id === item.pick_location_id);
  const dropLocation = locations.find((x) => x.id === item.drop_location_id);

  const handlePress = () => {
    navigation.navigate("Ticket", {
      bookingData: item,
      pick: pickLocation.name,
      drop: dropLocation.name,
    });
  };
  return (
    <>
      {pickLocation && dropLocation && (
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <P style={{ fontFamily: "Montserrat_700Bold", color: "white" }}>
              {pickLocation.name}-{dropLocation.name}
            </P>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "space-between",
              }}
            >
              <P style={{ fontFamily: "Montserrat_700Bold", color: "white" }}>
                Booking-ID
              </P>
              <P style={{ fontWeight: "bold", color: "white" }}>:</P>
            </View>
            <Spacer position="h" size="m" />
            <View style={{ flexDirection: "row", width: "50%" }}>
              <P style={{ color: "white" }}>{item.booking_id}</P>
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
              <P style={{ fontFamily: "Montserrat_700Bold", color: "white" }}>
                Departue Date
              </P>
              <P style={{ fontWeight: "bold", color: "white" }}>:</P>
            </View>
            <Spacer position="h" size="m" />
            <View style={{ flexDirection: "row", width: "50%" }}>
              <P style={{ color: "white" }}>{item.journeydata.split(" ")[0]}</P>
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
              <P style={{ fontFamily: "Montserrat_700Bold", color: "white" }}>
                Departure Time
              </P>
              <P style={{ fontWeight: "bold", color: "white" }}>:</P>
            </View>
            <Spacer position="h" size="m" />
            <View style={{ flexDirection: "row", width: "50%" }}>
              <P style={{ color: "white" }}>{item.startime}</P>
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
              onPress={handlePress}
              buttonColor="#1550bd"
              style={{ marginTop: 10, width: "60%" }}
              mode="contained"
            >
              <P>Show Ticket</P>
            </Button>
          </View>
        </View>
      )}
    </>
  );
}
