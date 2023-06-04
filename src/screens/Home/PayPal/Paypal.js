import { View, Text, Alert, Modal } from "react-native";
import React, { useContext, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import PaymentDetailsCard from "./PaymentDetailsCard/PaymentDetailsCard";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { Button } from "react-native-paper";
import {
  captureOrder,
  createOrder,
  generateToken,
} from "../../../services/context/Paypal/paypal";
import { WebView } from "react-native-webview";
import queryString from "query-string";
import axios from "axios";
import AnimatedLottieView from "lottie-react-native";
import { AsyncDataContext } from "../../../services/context/AsyncDataContext/AsyncDataContext";
import moment from "moment";
import { baseUrl } from "../../../baseUrl/baseUrl";

export default function Paypal({ navigation }) {
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
    selectedDiscount,
  } = useContext(ApiResponseContext);
  const [accessToken, setAccessToken] = useState();
  const [paypalUrl, setPaypalUrl] = useState();
  const [successful, setSuccessful] = useState(false);
  const [captured, setCaptured] = useState(false);
  // console.log(selectedBookingData);
  // console.log(selectedBookingData);

  const storeSuccessfulPayment = () => {
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

    bookingData.append("journeydate", moment().format("YYYY-M-D"));
    bookingData.append("returndate");

    bookingData.append("paydetail", "This is pay details");
    bookingData.append("vehicle_id", selectedBus?.item.vehicle_id);
    bookingData.append("seatnumbers", selectedBookedSeats.join(","));
    bookingData.append("totalseat", selectedBookedSeats.length);
    bookingData.append("payment_status", "paid");
    bookingData.append("partialpay", "");
    bookingData.append("pay_method", "paypal");

    bookingData.append(
      "grandtotal",
      selectedtotal > selectedDiscount ? selectedtotal - selectedDiscount : 0
    );
    bookingData.append(
      "discount",
      selectedtotal > selectedDiscount ? selectedDiscount : selectedtotal
    );
    bookingData.append("tax", selectedvat);
    axios.postForm(`${baseUrl}tickets/booking`, bookingData).then((res) => {
      console.log(res.data.data);
      setSelectedBookingData(res.data.data);
    });
  };

  const orderDetails = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: "User ID " + userData.user_id,
            description: "Booking seats " + selectedBookedSeats.join(","),
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: String(
                Math.round(
                  selectedtotal > selectedDiscount
                    ? selectedtotal - selectedDiscount
                    : 0
                )
              ),
            },
          },
        ],
        amount: {
          currency_code: "USD",
          value: String(
            Math.round(
              selectedtotal > selectedDiscount
                ? selectedtotal - selectedDiscount
                : 0
            )
          ),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: String(
                Math.round(
                  selectedtotal > selectedDiscount
                    ? selectedtotal - selectedDiscount
                    : 0
                )
              ),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
    },
  };
  const handlePress = async () => {
    try {
      const token = await generateToken();
      const res = await createOrder(token, orderDetails);
      setAccessToken(token);
      console.log("res is ", res);
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel === "approve");
        console.log(findUrl);
        setPaypalUrl(findUrl?.href);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paymentSuccess = async (id) => {
    try {
      const res = await captureOrder(id, accessToken);
      console.log("fimal res ", res);
      console.log("payment success!");
      clearPaypalState();
      setSuccessful(true);
      res && storeSuccessfulPayment();
    } catch (error) {
      console.log("payment error", error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  const onWebUrlChange = (webviewState) => {
    if (captured) return;
    if (webviewState?.url?.includes("https://example.com/cancel")) {
      clearPaypalState();
      return;
    }
    if (webviewState?.url?.includes("https://example.com/return")) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log(urlValues);
      const { token } = urlValues.query;
      console.log(token);
      if (!!token) {
        paymentSuccess(token);
        setCaptured(true);
      }
    }
    // console.log("web state url is", webviewState?.url);
  };

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {!successful ? (
        <View style={{ margin: 20, flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>Confirm Payment</T>
          </View>
          <View>
            <PaymentDetailsCard total={selectedtotal} />
          </View>
          <View
            style={{
              marginVertical: 20,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              icon="arrow-left"
              mode="contained"
              buttonColor="#1560bd"
              style={{ width: "80%" }}
              onPress={handlePress}
            >
              <T>Proceed To Pay</T>
            </Button>
          </View>
        </View>
      ) : (
        <View
          style={{
            margin: 20,
            marginTop: 100,
            flex: 1,
            alignItems: "center",
          }}
        >
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
        </View>
      )}
      <Modal visible={!!paypalUrl}>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={(webviewState) =>
              onWebUrlChange(webviewState)
            }
          />
        </View>
      </Modal>
    </Wrapper>
  );
}
