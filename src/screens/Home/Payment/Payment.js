import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import Bill from "./PaymentComponents/Bill/Bill";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import { Button, IconButton, TextInput } from "react-native-paper";
import PaymentMethod from "./PaymentComponents/PaymentMethod/PaymentMethod";
import { AsyncDataContext } from "../../../services/context/AsyncDataContext/AsyncDataContext";
import moment from "moment";
import axios from "axios";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";
import { baseUrl } from "../../../baseUrl/baseUrl";

export default function Payment({ navigation }) {
  const [coupon, setCoupon] = useState();
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    selectedBus,
    aseat,
    cseat,
    sseat,
    setselectedTotal,
    setSelectedSubTotal,
    setSelectedvat,
    journeydate,
    setSelectedDiscount,
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

  const verifyCoupon = () => {
    setLoading(true);
    axios
      .get(
        `${baseUrl}coupons/validation/${coupon}/${selectedBus.item.subtripId}/${journeydate}`
      )
      .then((res) => {
        if (res.data.status === "success") {
          setDiscount(Number(res.data.discount));
          setSelectedDiscount(Number(res.data.discount));
          ToastAndroid.show(
            "Coupon Verification Successfull",
            ToastAndroid.SHORT
          );
          setLoading(false);
        } else {
          setSelectedDiscount(0);
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
          setLoading(false);
        }
      });
  };

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <ScrollView style={{ margin: 20, flex: 1 }}>
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
            discount={discount}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Coupon Discount</T>
        </View>
        <View
          style={{
            width: "100%",
            height: 90,
            padding: 5,
            flexDirection: "row",
          }}
        >
          <TextInput
            mode="outlined"
            label="Enter Coupon Code"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={coupon}
            onChangeText={(x) => setCoupon(x)}
            style={{
              margin: 10,
              flex: 1,
              fontFamily: "Montserrat_400Regular",
            }}
          />
          <Button
            loading={loading}
            mode="contained"
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
            buttonColor="#1560bd"
            onPress={verifyCoupon}
          >
            <P>APPLY</P>
          </Button>
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
      </ScrollView>
    </Wrapper>
  );
}
