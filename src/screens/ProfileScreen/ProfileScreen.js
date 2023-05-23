import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../infrastructure/components/Text";
import { Button, TextInput } from "react-native-paper";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";

export default function ProfileScreen({ navigation }) {
  const { userData, token, storeUserData } = useContext(AsyncDataContext);
  const [fname, setFname] = useState(userData.first_name);
  const [lname, setlname] = useState(userData.last_name);
  const [zip, setZip] = useState(userData.zip_code);
  const [address, setAddress] = useState(userData.address);
  const [city, setCity] = useState(userData.city);
  const [id, setId] = useState(userData.id_number);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    if (
      fname !== userData.first_name ||
      lname !== userData.last_name ||
      zip !== userData.zip_code ||
      city !== userData.city ||
      address !== userData.address ||
      id !== userData.id_number
    ) {
      setButtonsVisible(true);
    } else {
      setButtonsVisible(false);
    }
  }, [fname, lname, id, zip, address, city]);

  const handleChange = () => {
    const bookingData = new FormData();
    bookingData.append("first_name", fname);
    bookingData.append("last_name", lname);
    bookingData.append("id_type", "Nid");
    bookingData.append("country_id", userData.country_id);
    bookingData.append("id_number", id);
    bookingData.append("address", address);
    bookingData.append("city", city);
    bookingData.append("zip_code", zip);

    axios
      .postForm(`${baseUrl}/passangers/profileinfo`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data === true) {
          const newUserData = {
            address: address,
            city: city,
            country_id: userData.country_id,
            first_name: fname,
            last_name: lname,
            id_number: id,
            id_type: userData.id_type,
            login_email: userData.login_email,
            login_mobile: userData.login_mobile,
            slug: userData.slug,
            status: userData.status,
            user_id: userData.user_id,
            zip_code: zip,
          };
          storeUserData(newUserData);
        }
      });
  };

  const onCancel = () => {
    setFname(userData.first_name);
    setlname(userData.last_name);
    setId(userData.id_number);
    setZip(userData.zip_code);
    setAddress(userData.address);
    setCity(userData.city);
  };

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>User Profile</T>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TextInput
            mode="outlined"
            label="First Name"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={fname}
            onChangeText={(x) => setFname(x)}
            style={{ margin: 10, fontFamily: "Montserrat_400Regular", flex: 1 }}
          />
          <TextInput
            mode="outlined"
            label="Last Name"
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={lname}
            onChangeText={(x) => setlname(x)}
            style={{ margin: 10, fontFamily: "Montserrat_400Regular", flex: 1 }}
          />
        </View>
        <TextInput
          mode="outlined"
          label="Nid"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          keyboardType="number-pad"
          value={id}
          onChangeText={(x) => setId(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />
        <TextInput
          mode="outlined"
          label="Address"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          value={address}
          onChangeText={(x) => setAddress(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />

        <TextInput
          mode="outlined"
          label="Zip Code"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          keyboardType="number-pad"
          value={zip}
          onChangeText={(x) => setZip(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />
        <TextInput
          mode="outlined"
          label="City"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          value={city}
          onChangeText={(x) => setCity(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />

        {buttonsVisible && (
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Button
              onPress={handleChange}
              mode="contained"
              buttonColor="#1560bd"
              style={{ flex: 1, margin: 10 }}
            >
              <P>Change</P>
            </Button>
            <Button
              mode="outlined"
              onPress={onCancel}
              style={{ flex: 1, margin: 10, borderColor: "#1560bd" }}
            >
              <P style={{ color: "#1560bd" }}>Cancel</P>
            </Button>
          </View>
        )}
        <Button
          onPress={() => navigation.navigate("password")}
          icon="lock"
          mode="contained"
          buttonColor="#1560bd"
          style={{ margin: 10 }}
        >
          <P>Change Password</P>
        </Button>
      </View>
    </Wrapper>
  );
}
