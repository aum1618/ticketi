import { View, Text, ImageBackground, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { H4, P } from "../../infrastructure/components/Text";
import CountriesList from "../SignUp/SignUpComponents/CountriesList";
import { Button } from "react-native-paper";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";

export default function Country({ navigation, route }) {
  const { userData } = route.params;
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Select your country",
  });
  const [loading, setLoading] = useState(false);
  console.log(userData);

  const handlePress = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("login_email", userData?.email);
    formData.append("login_mobile", userData?.phone);
    formData.append("password", userData?.pass);
    formData.append("repassword", userData?.pass);
    formData.append("first_name", userData?.firstname);
    formData.append("last_name", userData?.lastName);
    formData.append("id_type", "Nid");
    formData.append("id_number", userData?.nid);
    formData.append("country_id", selectedCountry?.id);

    axios.postForm(`${baseUrl}passangers/signup`, formData).then((res) => {
      console.log(res.data);
      if (res.data.status === "success") {
        Alert.alert(
          `${res.data.data}`,
          `Proceed to login.`,
          [
            {},
            {},
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                navigation.navigate("login");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          `${res.data.data}`,
          `Please try Again.`,
          [
            {},
            {},
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                navigation.navigate("login");
              },
            },
          ],
          { cancelable: false }
        );
      }
    });
    setLoading(false);
  };
  return (
    <Wrapper>
      <ImageBackground
        source={require("../../../resources/backgroundImage.jpg")}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        <Image
          source={require("../../../resources/logo.png")}
          style={{ height: 100, width: 100, margin: 10 }}
        />
        <View
          style={{
            width: "90%",
            height: "70%",
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: 10,
            paddingVertical: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <H4>Registeration</H4>
          </View>
          <View style={{ margin: 10, flex: 1, overflow: "hidden" }}>
            <CountriesList
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
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
              loading={loading}
              mode="contained"
              buttonColor="#1560bd"
              style={{ width: "50%", marginTop: 10 }}
              onPress={handlePress}
            >
              <P style={{ color: "white", fontWeight: 600 }}>Register</P>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
