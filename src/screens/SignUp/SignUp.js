import { View, ImageBackground, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { H4, P } from "../../infrastructure/components/Text";
import { Button, TextInput } from "react-native-paper";

export default function SignUp({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [nid, setNid] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      pass === "" ||
      phone === ""
    ) {
      Alert.alert(
        "Insufficient Information",
        `Please Fill in the required fields.(*)`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (pass !== confirmPass) {
      Alert.alert(
        "Passwords don't match!",
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      const userData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        pass: pass,
        nid: nid,
        phone: phone,
      };
      navigation.navigate("country", { userData: userData });
    }
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
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.6)",
            padding: 10,
            paddingVertical: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <H4>Registeration</H4>
          </View>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              style={{ margin: 10, flex: 1 }}
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              value={firstname}
              onChangeText={(x) => setFirstname(x)}
              mode="outlined"
              label="First Name"
            />
            <TextInput
              style={{ margin: 10, flex: 1 }}
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              value={lastname}
              onChangeText={(x) => setLastname(x)}
              mode="outlined"
              label="Last Name"
            />
          </View>
          <TextInput
            style={{ margin: 10 }}
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={email}
            onChangeText={(x) => setEmail(x)}
            mode="outlined"
            textContentType="emailAddress"
            label="Email"
          />
          <TextInput
            style={{ margin: 10 }}
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={phone}
            onChangeText={(x) => setPhone(x)}
            mode="outlined"
            keyboardType="numeric"
            textContentType="telephoneNumber"
            label="Phone Number"
          />

          <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              style={{ margin: 10, flex: 1 }}
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              value={pass}
              onChangeText={(x) => setPass(x)}
              mode="outlined"
              textContentType="newPassword"
              secureTextEntry
              label="Password"
            />
            <TextInput
              style={{ margin: 10, flex: 1 }}
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              value={confirmPass}
              onChangeText={(x) => setConfirmPass(x)}
              mode="outlined"
              textContentType="newPassword"
              secureTextEntry
              label="Confirm Password"
            />
          </View>
          <TextInput
            style={{ margin: 10 }}
            outlineColor="#1560bd"
            selectionColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={nid}
            onChangeText={(x) => setNid(x)}
            mode="outlined"
            keyboardType="numeric"
            label="NID number"
          />
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
              <P style={{ color: "white", fontWeight: 600 }}>Continue</P>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
