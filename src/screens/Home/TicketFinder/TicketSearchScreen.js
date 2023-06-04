import { View, Text, ImageBackground, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "./TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import { Button, List } from "react-native-paper";
import AreaList from "./TicketFinderComponents/AreaList/AreaList";
import moment from "moment";
import DatePickerCalendar from "react-native-calendarview-datepicker";
import { DateSelectionCalendar } from "react-native-easy-calendar";
import DatePicker from "./TicketFinderComponents/DatePicker/DatePicker";
import FleetList from "./TicketFinderComponents/FleetList/FleetList";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";
import { ScrollView } from "react-native-virtualized-view";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";
import AnimatedLottieView from "lottie-react-native";

export default function TicketSearchScreen({ navigation }) {
  const { setSelectedPickup, setSelectedDrop, setJourneyDate } =
    useContext(ApiResponseContext);
  const { locations } = useContext(ApiData);
  const [pickup, setPickup] = useState({ name: "Select Area" });
  const [drop, setDrop] = useState({ name: "Select Area" });
  const [departureDate, setDepartueDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [returnDate, setReturnDate] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);

  const getTripData = async (pickup, drop, departure, returnDate) => {
    console.log(pickup, drop, departure, returnDate);
    const tripData = new FormData();
    tripData.append("pick_location_id", pickup.id);
    tripData.append("drop_location_id", drop.id);
    tripData.append("journeydate", moment(departure).format("YYYY-M-D"));
    tripData.append("returnDate", "");

    try {
      await axios.postForm(`${baseUrl}triplist`, tripData).then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setSelectedPickup(pickup);
          setSelectedDrop(drop);
          setJourneyDate(moment(departure).format("YYYY-M-D"));
          setLoading(false);
          navigation.navigate("Buses", {
            busesData: response.data.data,
          });
        } else {
          console.log(response.data);
          Alert.alert(
            response.data.status,
            response.data.message,
            [
              {},
              {},
              {
                text: "OK",
                onPress: () => {
                  console.log("OK Pressed");
                  setLoading(false);
                },
              },
            ],
            { cancelable: false }
          );
        }
      });
      // console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
    setLoading(false);
  };

  const handleFindPress = async () => {
    setLoading(true);
    if (pickup === "Select Area" || drop === "Select Area") {
      Alert.alert(
        "Incomplete Information",
        "please Fill in the required fields",
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setLoading(false);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      getTripData(pickup, drop, departureDate, returnDate);
    }
  };
  const manageResponse = () => {};

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {locations ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 50,
          }}
        >
          <View style={{ width: "100%" }}>
            {/* <View style={{ height: 50, width: "100%" }} /> */}
            <T>Find the Best Ticket for Yourself!</T>
            <View style={{ flexDirection: "row" }}>
              <AreaList title="From" setValue={setPickup} value={pickup} />
              <AreaList title="To" setValue={setDrop} value={drop} />
            </View>
            <View>
              <DatePicker
                title="Departure Date"
                setValue={setDepartueDate}
                value={departureDate}
              />
              <DatePicker
                title="Return Date (optional)"
                setValue={setReturnDate}
                value={returnDate}
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
                icon="magnify"
                mode="contained"
                style={{ width: "70%" }}
                buttonColor="#348DCD"
                onPress={handleFindPress}
                loading={loading}
              >
                <P>SEARCH TICKETS</P>
              </Button>
              {/* <View style={{ height: 300, width: "100%" }} /> */}
            </View>
          </View>
        </View>
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
