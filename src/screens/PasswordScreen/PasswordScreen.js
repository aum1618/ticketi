import { View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../infrastructure/components/Text";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";

export default function PasswordScreen({ navigation }) {
  const { token, removeToken, removeUserData } = useContext(AsyncDataContext);
  const [oldP, setOldP] = useState("");
  const [newP, setNewP] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePress = () => {
    setLoading(true);
    if (oldP === "" || newP === "" || confirmP === "") {
      Alert.alert(
        "Error",
        "All Fields Required",

        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setLoading(false);
              setNewP("");
              setConfirmP("");
              setOldP("");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (newP !== confirmP) {
      Alert.alert(
        "Error",
        "Passwords don't match",
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setLoading(false);
              setNewP("");
              setConfirmP("");
              setOldP("");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      console.log(oldP);
      const form = new FormData();
      form.append("password", newP);
      form.append("repassword", confirmP);
      form.append("oldpassword", oldP);
      axios
        .postForm(`${baseUrl}/passangers/password`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            Alert.alert(
              "Password Changed Successfully",
              "Please Login Again",
              [
                {},
                {},
                {
                  text: "OK",
                  onPress: () => {
                    console.log("OK Pressed");
                    setLoading(false);
                    removeToken(), removeUserData();
                    navigation.navigate("ticketSearch");
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              res.data.status,
              res.data.data,
              [
                {},
                {},
                {
                  text: "OK",
                  onPress: () => {
                    console.log("OK Pressed");
                    setLoading(false);
                    setNewP("");
                    setConfirmP("");
                    setOldP("");
                  },
                },
              ],
              { cancelable: false }
            );
          }
        });
    }
  };
  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Change Password</T>
        </View>
        <TextInput
          mode="outlined"
          label="Old Password"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          secureTextEntry
          value={oldP}
          onChangeText={(x) => setOldP(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />
        <TextInput
          mode="outlined"
          label="New Password"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          secureTextEntry
          value={newP}
          onChangeText={(x) => setNewP(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />
        <TextInput
          mode="outlined"
          label="Confirm Password"
          outlineColor="#1560bd"
          selectionColor="#1560bd"
          activeOutlineColor="#1560bd"
          secureTextEntry
          value={confirmP}
          onChangeText={(x) => setConfirmP(x)}
          style={{ margin: 10, fontFamily: "Montserrat_400Regular" }}
        />
        <Button
          onPress={handlePress}
          loading={loading}
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
