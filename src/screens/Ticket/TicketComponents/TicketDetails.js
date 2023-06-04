import { View, Text } from "react-native";
import React, { useContext } from "react";
import { H } from "../../../infrastructure/components/Text";
import { AsyncDataContext } from "../../../services/context/AsyncDataContext/AsyncDataContext";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";

export default function TicketDetails({
  bookingData,
  pick,
  drop,
  trip,
  myfleet,
}) {
  const { taxes } = useContext(ApiData);
  const { userData } = useContext(AsyncDataContext);
  const subtotal =
    Number(trip.special_fair) * Number(bookingData.special) +
    Number(trip.child_fair) * Number(bookingData.chield) +
    Number(trip.adult_fair) * Number(bookingData.adult);
  const vat = Math.round((Number(taxes[0].value) / 100) * subtotal);
  const grandTotal = subtotal + vat;
  // console.log(vehicle);
  console.log(bookingData);
  return (
    <View
      style={{
        width: "100%",
        //   height: "35%",
        borderWidth: 1,
        borderColor: "black",
      }}
    >
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
          {trip.vehicle_id}{" "}
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
          {myfleet.type}{" "}
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
          {bookingData.booking_id}{" "}
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
        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}>
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
            {pick}{" "}
          </H>
        </View>
        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}>
          <H>To :</H>
          <H style={{ color: "#1560bd" }}>
            {"  "}
            {drop}{" "}
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
            {bookingData.startime}{" "}
          </H>
        </View>
        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}>
          <H>End :</H>
          <H style={{ color: "#1560bd" }}>
            {"  "}
            {bookingData.endtime}{" "}
          </H>
        </View>
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
        <H>Passenger Name :</H>
        <H style={{ color: "#1560bd" }}>
          {"  "}
          {userData.first_name} {userData.last_name}
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
        <H>Seat Details :-</H>
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
          <H>SeatType</H>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderRightWidth: 1,
            borderColor: "black",
            paddingHorizontal: 4,
          }}
        >
          <H> # </H>
        </View>
        <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 4 }}>
          <H>Fare (TSZ)</H>
        </View>
      </View>
      {!!Number(bookingData?.adult) && (
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
            <H style={{ color: "#1560bd" }}>Adult</H>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRightWidth: 1,
              borderColor: "black",
              paddingHorizontal: 4,
            }}
          >
            <H style={{ color: "#1560bd" }}>{bookingData.adult}</H>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: 4,
              justifyContent: "flex-end",
            }}
          >
            <H style={{ color: "#1560bd" }}>
              {Number(trip.adult_fair) * Number(bookingData.adult)}
            </H>
          </View>
        </View>
      )}
      {!!Number(bookingData?.chield) && (
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
            <H style={{ color: "#1560bd" }}>Child</H>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRightWidth: 1,
              borderColor: "black",
              paddingHorizontal: 4,
            }}
          >
            <H style={{ color: "#1560bd" }}>{bookingData.chield} </H>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: 4,
              justifyContent: "flex-end",
            }}
          >
            <H style={{ color: "#1560bd" }}>
              {Number(trip.child_fair) * Number(bookingData.chield)}
            </H>
          </View>
        </View>
      )}
      {!!Number(bookingData?.special) && (
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
            <H style={{ color: "#1560bd" }}>Special</H>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRightWidth: 1,
              borderColor: "black",
              paddingHorizontal: 4,
            }}
          >
            <H style={{ color: "#1560bd" }}>{bookingData.special} </H>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: 4,
              justifyContent: "flex-end",
            }}
          >
            <H style={{ color: "#1560bd" }}>
              {Number(trip.special_fair) * Number(bookingData.special)}
            </H>
          </View>
        </View>
      )}

      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          paddingHorizontal: 4,
          justifyContent: "space-between",
        }}
      >
        <H>Sub-total</H>
        <H style={{ color: "#1560bd" }}>
          {"  "}
          {subtotal}
        </H>
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "black",
          flexDirection: "row",
          paddingHorizontal: 4,
          justifyContent: "space-between",
        }}
      >
        <H>VAT({Number(taxes[0].value)}%)</H>
        <H style={{ color: "#1560bd" }}>
          {"  "}
          {vat}
        </H>
      </View>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 1,
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
      <View
        style={{
          width: "100%",
          borderColor: "black",
          flexDirection: "row",
          paddingHorizontal: 4,
        }}
      >
        <H>Bus Facilities :</H>
        <H style={{ color: "#1560bd" }}>{"  "}Wifi,Water Bottle</H>
      </View>
    </View>
  );
}
