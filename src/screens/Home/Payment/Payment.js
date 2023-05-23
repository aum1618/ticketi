import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import Bill from "./PaymentComponents/Bill/Bill";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { IconButton } from "react-native-paper";
import PaymentMethod from "./PaymentComponents/PaymentMethod/PaymentMethod";
import { AsyncDataContext } from "../../../services/context/AsyncDataContext/AsyncDataContext";
import moment from "moment";
import axios from "axios";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";

export default function Payment({ navigation }) {
  const {
    selectedBus,
    aseat,
    cseat,
    sseat,
    setselectedTotal,
    setSelectedSubTotal,
    setSelectedvat,
  } = useContext(ApiResponseContext);
  const { taxes } = useContext(ApiData);
  const adultFair = Number(selectedBus.item.adult_fair);
  const childFair = Number(selectedBus.item.child_fair);
  const specialFair = Number(selectedBus.item.special_fair);

  const subtotal =
    adultFair * Number(aseat) +
    childFair * Number(cseat) +
    specialFair * Number(sseat);

  const vat = Math.round(
    (Number(taxes[0].value) / 100) *
      (adultFair * Number(aseat) +
        childFair * Number(cseat) +
        specialFair * Number(sseat))
  );

  const total = subtotal + vat;
  console.log(total);
  useEffect(() => {
    setselectedTotal(
      adultFair * Number(aseat) +
        childFair * Number(cseat) +
        specialFair * Number(sseat) +
        (Number(taxes[0].value) / 100) *
          (adultFair * Number(aseat) +
            childFair * Number(cseat) +
            specialFair * Number(sseat))
    );
    setSelectedSubTotal(
      adultFair * Number(aseat) +
        childFair * Number(cseat) +
        specialFair * Number(sseat)
    );
    setSelectedvat(
      Math.round(
        (Number(taxes[0].value) / 100) *
          (adultFair * Number(aseat) +
            childFair * Number(cseat) +
            specialFair * Number(sseat))
      )
    );
  }, []);

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Total Bill</T>
        </View>
        <View>
          <Bill
            childFair={childFair}
            adultFair={adultFair}
            specialFair={specialFair}
            total={total}
            aseat={aseat}
            cseat={cseat}
            sseat={sseat}
            subtotal={subtotal}
            vat={vat}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <T>Choose your payment Method</T>
        </View>
        <View style={{ flexDirection: "row" }}>
          <PaymentMethod
            method="PAY NOW"
            source="paypal"
            navigation={navigation}
          />
          <PaymentMethod
            method="PAY LATER"
            source="cash"
            navigation={navigation}
          />
        </View>
      </View>
    </Wrapper>
  );
}
