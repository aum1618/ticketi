import { View, Text } from "react-native";
import React, { useContext } from "react";
import { P } from "../../../../../infrastructure/components/Text";
import { Spacer } from "../../../../../infrastructure/components/spacer";
import { ApiData } from "../../../../../services/context/ApiDataContext/ApiDataProvider";

export default function Bill({
  aseat,
  cseat,
  sseat,
  childFair,
  adultFair,
  specialFair,
  total,
  subtotal,
  vat,
  discount,
}) {
  const { taxes } = useContext(ApiData);

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
          <P style={{ fontWeight: "bold", color: "white" }}>Adult Seats</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {aseat > 0 ? `${aseat} x ${adultFair}` : "-"}
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
          <P style={{ fontWeight: "bold", color: "white" }}>Child Seats</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {cseat > 0 ? `${cseat} x ${childFair}` : "-"}
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
          <P style={{ fontWeight: "bold", color: "white" }}>Special Seats</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {sseat > 0 ? `${sseat} x ${specialFair}` : "-"}
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
          <P style={{ fontWeight: "bold", color: "white" }}>Total Seats</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {Number(aseat) + Number(cseat) + Number(sseat)}
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
          <P style={{ fontWeight: "bold", color: "white" }}>Sub Total</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{subtotal}/-</P>
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
          <P style={{ fontWeight: "bold", color: "white" }}>
            VAT ({taxes[0].value}%)
          </P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>{vat}/-</P>
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
          <P style={{ fontWeight: "bold", color: "white" }}>Discount</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white" }}>
            {discount === 0 ? "-" : total > discount ? discount : total}
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
          <P style={{ fontWeight: "bold", color: "white" }}>Total Fare</P>
          <P style={{ fontWeight: "bold", color: "white" }}>:</P>
        </View>
        <Spacer position="h" size="m" />
        <View style={{ flexDirection: "row", width: "50%" }}>
          <P style={{ color: "white", fontWeight: "bold" }}>
            {total > discount ? total - discount : 0}/-
          </P>
        </View>
      </View>
    </View>
  );
}
