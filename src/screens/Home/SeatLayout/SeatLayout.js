import { View, Text, Alert, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import SeatsLayout from "@mindinventory/react-native-bus-seat-layout";
import { ScrollView } from "react-native-virtualized-view";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { P, T } from "../../../infrastructure/components/Text";
import { Button, TextInput } from "react-native-paper";
import Seat from "./SeatLayoutComponents/Seat";

export default function SeatLayout({ navigation }) {
  const { selectedBus, setSseat, setAseat, setCseat, setSelectedBookedSeats } =
    useContext(ApiResponseContext);
  const [adult, setAdult] = useState("0");
  const [child, setChild] = useState("0");
  const [special, setSpecial] = useState("0");
  const [loading, setLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [left, right] = selectedBus.item.layout.split("-").map(Number);
  const totalSeats = Number(selectedBus.item.total_seat);

  const selectedSeats = Number(adult) + Number(child) + Number(special);

  const seatNumberString = selectedBus.item.seat_number;
  const seatNames = seatNumberString.split(",");

  let leftside = [];
  let rightSide = [];
  let currentArray = leftside;

  while (seatNames.length > 0) {
    if (currentArray === leftside) {
      let items = seatNames.slice(0, left);
      leftside = [...leftside, ...items];
      seatNames.splice(0, items.length);
      currentArray = rightSide;
    } else if (currentArray === rightSide) {
      let items = seatNames.slice(0, right);
      rightSide = [...rightSide, ...items];
      seatNames.splice(0, items.length);
      currentArray = leftside;
    }
  }

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
        `please select your ${totalSeats} seats properly.`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
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
              setAdult("0");
              setChild("0");
              setSpecial("0");
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
      setAseat(adult);
      setCseat(child);
      setSseat(special);
      setSelectedBookedSeats(bookedSeats);
      navigation.navigate("Payment");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSeats >= totalSeats) {
      Alert.alert(
        "Exeeded Maximum Seats",
        `You cannot enter more than  ${totalSeats} seats.`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [adult, child, special]);

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Select Your Seats </T>
        </View>
        <View
          style={{ flexDirection: "row", width: "100%", marginVertical: 20 }}
        >
          <TextInput
            mode="outlined"
            label="Adult"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            keyboardType="number-pad"
            value={adult}
            onChangeText={(x) => setAdult(x)}
            style={{ margin: 10, flex: 1, fontFamily: "Montserrat_400Regular" }}
          />
          <TextInput
            mode="outlined"
            label="Child"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            keyboardType="number-pad"
            value={child}
            onChangeText={(x) => setChild(x)}
            style={{ margin: 10, flex: 1, fontFamily: "Montserrat_400Regular" }}
          />
          <TextInput
            mode="outlined"
            label="Special"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            keyboardType="number-pad"
            value={special}
            onChangeText={(x) => setSpecial(x)}
            style={{ margin: 10, flex: 1, fontFamily: "Montserrat_400Regular" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            padding: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#1560bd",
          }}
        >
          <FlatList
            data={leftside}
            numColumns={left}
            renderItem={(item) => (
              <Seat
                item={item.item}
                bookedSeats={bookedSeats}
                setBookedSeats={setBookedSeats}
              />
            )}
            keyExtractor={(item) => item}
          />
          <FlatList
            data={rightSide}
            numColumns={right}
            renderItem={(item) => (
              <Seat
                item={item.item}
                bookedSeats={bookedSeats}
                setBookedSeats={setBookedSeats}
              />
            )}
            keyExtractor={(item) => item}
          />
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
    </Wrapper>
  );
}
