import { View, Text } from "react-native";
import React, { useContext } from "react";
import { P } from "../../../../infrastructure/components/Text";
import { Spacer } from "../../../../infrastructure/components/spacer";
import moment from "moment";
import { AsyncDataContext } from "../../../../services/context/AsyncDataContext/AsyncDataContext";
import { ApiResponseContext } from "../../../../services/context/ApiResponseContext/ApiResponseContextProvider";

export default function PaymentDetailsCard({ total }) {
  const { userData } = useContext(AsyncDataContext);
  const { journeydate, selectedBookedSeats } = useContext(ApiResponseContext);
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
          <P style={{ fontWeight: "bold", color: "white" }}>Name</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {userData.first_name} {userData.last_name}
          </P>
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
          <P style={{ fontWeight: "bold", color: "white" }}>Date</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{journeydate}</P>
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
          <P style={{ fontWeight: "bold", color: "white" }}>Seat Number(s)</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{selectedBookedSeats.join(", ")}</P>
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
          <P style={{ fontWeight: "bold", color: "white" }}>Total Price</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white", fontWeight: "bold" }}>{total}/-</P>
        </View>
      </View>
    </View>
  );
}
