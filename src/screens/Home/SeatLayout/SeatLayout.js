import { View, Text, Alert, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { ScrollView } from "react-native-virtualized-view";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { P, T } from "../../../infrastructure/components/Text";
import { Button, IconButton, TextInput } from "react-native-paper";
import Seat from "./SeatLayoutComponents/Seat";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";
import AnimatedLottieView from "lottie-react-native";

export default function SeatLayout({ navigation, route }) {
  const { selectedSeats } = route.params;
  const { selectedBus, setSelectedBookedSeats, journeydate } =
    useContext(ApiResponseContext);
  const [loading, setLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatlayout, setSeatlayout] = useState();

  useEffect(() => {
    console.log(bookedSeats);
  }, [bookedSeats]);
  const handlePress = () => {
    setLoading(true);
    if (bookedSeats && bookedSeats.length !== selectedSeats) {
      console.log(bookedSeats.length);
      console.log(selectedSeats);
      Alert.alert(
        "Seats Not Selected",
        `please select your ${selectedSeats} seats properly.`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (selectedSeats === 0) {
      Alert.alert(
        "Seats Not Selected",
        `Select atleast 1 seat.`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (
      bookedSeats &&
      bookedSeats.length === selectedSeats &&
      selectedSeats !== 0
    ) {
      setSelectedBookedSeats(bookedSeats);
      navigation.navigate("Payment");
    }
    setLoading(false);
  };

  useEffect(() => {
    selectedBus &&
      axios
        .get(
          `${baseUrl}tickets/seat/${selectedBus?.item?.tripid}/${journeydate}`
        )
        .then((res) => setSeatlayout(res.data.seatlayout));
  }, []);

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {seatlayout ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>Select Your Seats </T>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <P>Reserved</P>
            <IconButton
              style={{ margin: 0, padding: 0 }}
              iconColor={"green"}
              size={35}
              icon={require("../../../../resources/seat.png")}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <P>Selected</P>
            <IconButton
              style={{ margin: 0, padding: 0 }}
              iconColor={"#1560bd"}
              size={35}
              icon={require("../../../../resources/seat.png")}
            />
          </View>
          <View
            style={{
              margin: 20,
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#1560bd",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {seatlayout.map((row, id) => {
              return (
                <FlatList
                  style={{
                    width: "100%",
                  }}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    flexDirection: "row",
                  }}
                  id={id}
                  data={row}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <Seat
                      item={item}
                      bookedSeats={bookedSeats}
                      setBookedSeats={setBookedSeats}
                      selectedSeats={selectedSeats}
                    />
                  )}
                  keyExtractor={(item, id) => id.toString()}
                />
              );
            })}
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              loading={loading}
              mode="contained"
              buttonColor="#1560bd"
              style={{ width: "50%", marginTop: 10 }}
              onPress={handlePress}
            >
              <P style={{ color: "white", fontWeight: 600 }}>Next</P>
            </Button>
          </View>
          <View style={{ height: 50, width: "100%" }} />
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            marginBottom: 100,
            flex: 1,
          }}
        >
          <AnimatedLottieView
            source={require("../../../../resources/loader.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </Wrapper>
  );
}
