import {
  View,
  Text,
  ScrollView,
  Image,
  ToastAndroid,
  Share,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { C, H, H4, P, T } from "../../infrastructure/components/Text";
import TicketDetails from "./TicketComponents/TicketDetails";
import { Spacer } from "../../infrastructure/components/spacer";
import QRCode from "react-native-qrcode-svg";
import DashedLine from "react-native-dashed-line";
import { ApiData } from "../../services/context/ApiDataContext/ApiDataProvider";
import { Button } from "react-native-paper";
import { captureRef } from "react-native-view-shot";
import { saveToLibraryAsync } from "expo-media-library";

export default function Ticket({ bookingData, pick, drop, trip }) {
  // const [imageurl, setImageurl] = useState();
  const { fleets, taxes } = useContext(ApiData);
  const data = `{Bus_Registeration_No:${trip.vehicle_id},TicketId:${bookingData.booking_id},journeyDate:${bookingData.journeydata}}`;
  const ref = useRef();

  const myfleet = fleets.find((x) => x.id === trip.fleet_id);
  const subtotal =
    Number(trip.special_fair) * Number(bookingData.special) +
    Number(trip.child_fair) * Number(bookingData.chield) +
    Number(trip.adult_fair) * Number(bookingData.adult);
  const vat = Math.round((Number(taxes[0].value) / 100) * subtotal);
  const grandTotal = subtotal + vat;

  // useEffect(() => {
  //   captureRef(ref).then((uri) => {
  //     setImageurl(uri);
  //   });
  // }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `I am travelling from ${pick} to ${drop}.Join me in my Journey.Book your tickets from tiketi Popote | Download The app from: {link goes here .}`,
        // url: imageurl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  async function saveImage() {
    captureRef(ref)
      .then((uri) => {
        saveToLibraryAsync(uri);
      })
      .finally(() =>
        ToastAndroid.show("Saved To Phone Successfully", ToastAndroid.SHORT)
      );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        ref={ref}
        style={{
          backgroundColor: "white",
        }}
        contentContainerStyle={{
          borderColor: "black",
          borderWidth: 2,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../resources/logo.png")}
            style={{ height: 50, width: 50 }}
          />
          <View>
            <P style={{ fontFamily: "Montserrat_700Bold" }}>TIKETI POPOTE</P>
            <C style={{ fontFamily: "Montserrat_700Bold" }}>
              Intercity Safari Bus Line
            </C>
            <C style={{ fontFamily: "Montserrat_700Bold" }}>ONLINE TICKET</C>
          </View>
        </View>
        <Spacer />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <C></C>
          <C style={{ fontFamily: "Montserrat_700Bold" }}>Passenger Copy</C>
        </View>
        <TicketDetails
          bookingData={bookingData}
          pick={pick}
          drop={drop}
          trip={trip}
          myfleet={myfleet}
        />
        <Spacer size="m" />
        <View
          style={{
            width: "100%",
            //   height: "35%",
            borderWidth: 1,
            borderColor: "black",
            flexWrap: "wrap",
          }}
        >
          <View style={{ width: "100%", padding: 3 }}>
            <H style={{ fontFamily: "Montserrat_700Bold" }}>
              Ticketi Popote Policy :-
            </H>

            <H style={{ fontSize: 8 }}>
              • Children above the age of 3 will need a ticket
            </H>
            <H style={{ fontSize: 8 }}>
              • 2 pieces of luggage will be accepted free of charge per
              passenger. Excess items will be chargeable.
            </H>
            <H style={{ fontSize: 8 }}>
              • Excess baggage over 10 kgs per passenger will be chargeable.
            </H>
            <H style={{ fontSize: 8 }}>
              • Carrying or consuming liquor inside the bus is prohibited. Bus
              operator reserves the right to deboard drunk passengers.
            </H>
            <H style={{ fontSize: 8 }}>
              • Bus operator is not obligated to wait beyondthe scheduled
              departure time of the bus. No refund request will be entertained
              for late arriving passengers.
            </H>
          </View>
        </View>
        <Spacer />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <H>+255 739 900 900</H>
          <H>info@tiketipopote.co.tz</H>
        </View>
        <Spacer size="m" />
        <View
          style={{
            width: "100%",
            //   height: "35%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <QRCode value={data} size={40} />
          </View>
          <Spacer size="l" position="h" />

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>WELCOME ON BOARD!</T>
          </View>
        </View>
        <Spacer />
        <DashedLine dashColor="brown" />
        <Spacer />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <C style={{ fontFamily: "Montserrat_700Bold" }}>
            Intercity Safari Bus Line
          </C>
          <C style={{ fontFamily: "Montserrat_700Bold" }}>Agency Copy</C>
        </View>
        <View
          style={{
            width: "100%",
            //   height: "35%",
            borderWidth: 1,
            borderColor: "black",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode value={data} size={40} />
          </View>
          <View style={{ flex: 1, borderLeftWidth: 1, borderColor: "black" }}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
                paddingHorizontal: 4,
              }}
            >
              <H>Bus Registeration No :</H>
              <H style={{ color: "#1560bd" }}>
                {"  "}
                {trip.vehicle_id}
              </H>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
                paddingHorizontal: 4,
              }}
            >
              <H>Fleet :</H>
              <H style={{ color: "#1560bd" }}>
                {"  "}
                {myfleet.type}
              </H>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
                paddingHorizontal: 4,
              }}
            >
              <H>Ticket No :</H>
              <H style={{ color: "#1560bd" }}>
                {"  "}
                {bookingData.booking_id}
              </H>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
                paddingHorizontal: 4,
              }}
            >
              <H>Seat No :</H>
              <H style={{ color: "#1560bd" }}>
                {"  "}({bookingData.seatnumber.split(",").length}){" "}
                {bookingData.seatnumber}
              </H>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRightWidth: 1,
                  borderColor: "black",
                  paddingHorizontal: 4,
                }}
              >
                <H>Departure :</H>
                <H style={{ color: "#1560bd" }}>
                  {"  "}
                  {bookingData.journeydata.split(" ")[0]}
                </H>
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}
              >
                <H>Return :</H>
                <H style={{ color: "#1560bd" }}>{"  "}-</H>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRightWidth: 1,
                  borderColor: "black",
                  paddingHorizontal: 4,
                }}
              >
                <H>From :</H>
                <H style={{ color: "#1560bd" }}>
                  {"  "}
                  {pick}
                </H>
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}
              >
                <H>To :</H>
                <H style={{ color: "#1560bd" }}>
                  {"  "}
                  {drop}
                </H>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "black",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRightWidth: 1,
                  borderColor: "black",
                  paddingHorizontal: 4,
                }}
              >
                <H>Start :</H>
                <H style={{ color: "#1560bd" }}>
                  {"  "}
                  {bookingData.startime}
                </H>
              </View>
              <View
                style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}
              >
                <H>End :</H>
                <H style={{ color: "#1560bd" }}>
                  {"  "}
                  {bookingData.endtime}
                </H>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                borderColor: "black",
                flexDirection: "row",
                paddingHorizontal: 4,
                justifyContent: "space-between",
              }}
            >
              <H>Total Fare</H>
              <H style={{ color: "#1560bd" }}>
                {"  "}
                {grandTotal}
              </H>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          style={{ margin: 10, flex: 1 }}
          icon="arrow-down"
          mode="contained"
          buttonColor="#1560bd"
          onPress={saveImage}
        >
          <P>DOWNLOAD</P>
        </Button>
        <Button
          style={{ margin: 10, flex: 1 }}
          icon="share-variant-outline"
          mode="contained"
          buttonColor="#1560bd"
          onPress={onShare}
        >
          <P>SHARE</P>
        </Button>
      </View>
    </View>
  );
}
