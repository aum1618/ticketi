import { View, Text, Image, ScrollView, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../infrastructure/components/Text";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native-paper";
import { saveToLibraryAsync, usePermissions } from "expo-media-library";
import Ticket from "./Ticket";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";
import { ApiData } from "../../services/context/ApiDataContext/ApiDataProvider";
import AnimatedLottieView from "lottie-react-native";
import moment from "moment";

export default function TicketScreen({ navigation, route }) {
  const { bookingData, pick, drop } = route.params;
  const [permissionResponse, requestPermission] = usePermissions();
  const [trip, setTrip] = useState();

  const getVehicleData = () => {
    const tripData = new FormData();
    tripData.append("pick_location_id", bookingData.pick_location_id);
    tripData.append("drop_location_id", bookingData.drop_location_id);
    tripData.append("journeydate", moment().add(1, "days").format("YYYY-M-D"));
    tripData.append("returnDate", "");
    axios.postForm(`${baseUrl}triplist`, tripData).then((res) => {
      console.log(res.data);
      const myTrip = res.data.data.find(
        (x) => x.vehicle_id === bookingData.vehicle_id
      );
      setTrip(myTrip);
    });
  };

  useEffect(() => {
    requestPermission();
    getVehicleData();
  }, []);

  // async function saveImage() {
  //   captureRef(ref)
  //     .then((uri) => {
  //       saveToLibraryAsync(uri);
  //     })
  //     .finally(() =>
  //       ToastAndroid.show("Saved To Phone Successfully", ToastAndroid.SHORT)
  //     );
  // }
  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>

      {trip ? (
        <View style={{ flex: 1, margin: 10 }}>
          <Ticket
            bookingData={bookingData}
            pick={pick}
            drop={drop}
            trip={trip}
          />
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
            source={require("../../../resources/loader.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </Wrapper>
  );
}
