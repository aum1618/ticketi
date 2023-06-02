import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import AnimatedLottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { AsyncDataContext } from "../../../services/context/AsyncDataContext/AsyncDataContext";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import axios from "axios";
import moment from "moment";

export default function PayCash({ navigation, route }) {
  const { userData } = useContext(AsyncDataContext);
  const {
    selectedBus,
    aseat,
    cseat,
    sseat,
    selectedBookedSeats,
    selectedboardingPoint,
    selecteddroppingPoint,
    setSelectedBookingData,
    selectedtotal,
    selectedSubTotal,
    selectedvat,
    journeydate,
  } = useContext(ApiResponseContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const bookingData = new FormData();
    bookingData.append("login_email", userData.login_email);
    bookingData.append("login_mobile", userData.login_mobile);
    bookingData.append("first_name", userData.first_name);
    bookingData.append("last_name", userData.last_name);
    bookingData.append("id_type", "Nid");
    bookingData.append("country_id", userData.country_id);
    bookingData.append("id_number", userData.selectedBus);
    bookingData.append("address", userData.address);
    bookingData.append("city", userData.city);
    bookingData.append("zip_code", userData.zip_code);

    bookingData.append("trip_id", selectedBus?.item.trip_id);
    bookingData.append("subtripId", selectedBus?.item.subtripId);
    bookingData.append("pick_location_id", selectedBus?.item.pick_location_id);
    bookingData.append("drop_location_id", selectedBus?.item.drop_location_id);
    bookingData.append(
      "pickstand",
      selectedboardingPoint && selectedboardingPoint[0]?.id
    );
    bookingData.append(
      "dropstand",
      selecteddroppingPoint && selecteddroppingPoint[0]?.id
    );
    bookingData.append("totalprice", selectedSubTotal);

    bookingData.append("aseat", aseat);
    bookingData.append("cseat", cseat);
    bookingData.append("spseat", sseat);

    bookingData.append("journeydate", journeydate);
    bookingData.append("returndate");

    bookingData.append("paydetail", "This is pay details");
    bookingData.append("vehicle_id", selectedBus?.item.vehicle_id);
    bookingData.append("seatnumbers", selectedBookedSeats.join(","));
    bookingData.append("totalseat", selectedBookedSeats.length);
    bookingData.append("payment_status", "unpaid");

    bookingData.append("grandtotal", selectedtotal);
    bookingData.append("discount", 0);
    bookingData.append("tax", selectedvat);
    axios
      .postForm(
        "https://tiketipopote.co.tz/adminpanel/modules/api/v1/tickets/unpaid/booking",
        bookingData
      )
      .then((res) => {
        console.log(res.data.data);
        setSelectedBookingData(res.data.data);
        setLoading(false);
      });
  }, []);
  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View
        style={{
          margin: 20,
          marginTop: 100,
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Payment Success! </T>
        </View> */}
        {!loading ? (
          <>
            <AnimatedLottieView
              source={require("../../../../resources/success.json")}
              autoPlay
              loop={false}
              style={{ height: 300, width: 300 }}
            />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <T>Success!</T>
              <T>Happy Travelling!</T>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                mode="contained"
                buttonColor="#1560bd"
                style={{ width: "50%", marginTop: 10 }}
                onPress={() => navigation.navigate("ticketSearch")}
              >
                <P style={{ color: "white", fontWeight: 600 }}>Next</P>
              </Button>
            </View>
          </>
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
      </View>
    </Wrapper>
  );
}
