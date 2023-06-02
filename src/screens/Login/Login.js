import { View, Text, ImageBackground, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import { Avatar, Button, IconButton, TextInput } from "react-native-paper";
import { H4, P, T } from "../../infrastructure/components/Text";
import axios from "axios";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";
import { maybeCompleteAuthSession } from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/build/providers/Google";
import { baseUrl } from "../../baseUrl/baseUrl";

maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const { storeToken, storeUserData } = useContext(AsyncDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = useAuthRequest({
    androidClientId:
      "671011928468-b9sn9939gtnp7j36sde9o3skpoitvs38.apps.googleusercontent.com",
    iosClientId:
      "671011928468-tkeiaggooqnh78dv3t6p0ofh8kior2j2.apps.googleusercontent.com",
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const getUserInfo = async () => {
    setLoading(true);
    try {
      await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      }).then(async (response) => {
        const user = await response.json();
        const form = new FormData();
        form.append("appid", user.id);
        form.append("first_name", user.given_name);
        form.append("last_name", user.family_name);
        form.append("email", user.email);
        axios.postForm(`${baseUrl}passangers/loginsocial`, form).then((res) => {
          console.log(res.data.data);
          if (res.data.status === "success") {
            storeToken(res.data.data);

            axios
              .get(
                "https://tiketipopote.co.tz/adminpanel/modules/api/v1/passangers/info",
                {
                  headers: {
                    Authorization: `Bearer ${res.data.data}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data.data);
                storeUserData(response.data.data);
              })
              .finally(() => {
                navigation.navigate("ticketSearch");
                setLoading(false);
              });
          } else {
            // Alert.alert(
            //   "Login Failed.Try Again",
            //   res.data.message,
            //   [
            //     {},
            //     {},
            //     {
            //       text: "OK",
            //       onPress: () => {
            //         console.log("OK Pressed");
            //         setLoading(false);
            //       },
            //     },
            //   ],
            //   { cancelable: false }
            // );
            setTimeout(() => {
              setLoading(false);
            }, 5000);
          }
        });

        setUserInfo(user);
      });
    } catch (error) {
      // Add your own error handler here
    }
  };

  const handlePress = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      Alert.alert(
        "Insufficient Information",
        `Please Fill in the required fields.`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setLoading(false);
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      const isEmail = validateEmail(email);

      const formData = new FormData();
      formData.append("userid", email);
      formData.append("password", password);
      formData.append("type", "email");
      await axios
        .postForm(
          "https://tiketipopote.co.tz/adminpanel/modules/api/v1/passangers/login",
          formData
        )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.status === "success") {
            storeToken(res.data.data);

            formData.append("Authorization", `Bearer ${res.data.data}`);
            axios
              .get(
                "https://tiketipopote.co.tz/adminpanel/modules/api/v1/passangers/info",
                {
                  headers: {
                    Authorization: `Bearer ${res.data.data}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data.data);
                storeUserData(response.data.data);
              })
              .finally(() => {
                navigation.navigate("ticketSearch");
              });
          } else {
            Alert.alert(
              "Login Failed.Try Again",
              res.data.message,
              [
                {},
                {},
                {
                  text: "OK",
                  onPress: () => {
                    console.log("OK Pressed");
                    setLoading(false);
                  },
                },
              ],
              { cancelable: false }
            );
          }
        })
        .catch((e) => console.log(e));
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <ImageBackground
        source={require("../../../resources/backgroundImage.jpg")}
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        <View />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../../resources/logo.png")}
            style={{ height: 100, width: 100, margin: 20 }}
          />
          <View
            style={{
              width: 300,
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.6)",
              padding: 10,
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <H4>Account Login</H4>
            </View>
            <View>
              <TextInput
                style={{ margin: 10 }}
                outlineColor="#1560bd"
                selectionColor="#1560bd"
                activeOutlineColor="#1560bd"
                mode="outlined"
                value={email}
                onChangeText={(x) => setEmail(x)}
                keyboardType="email-address"
                label="Enter Email or Phone"
              />
              <TextInput
                style={{ marginHorizontal: 10 }}
                outlineColor="#1560bd"
                selectionColor="#1560bd"
                activeOutlineColor="#1560bd"
                mode="outlined"
                value={password}
                onChangeText={(x) => setPassword(x)}
                secureTextEntry={showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
                textContentType="password"
                label="Enter your Password"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button onPress={() => navigation.navigate("forget")}>
                <P style={{ color: "#1560bd" }}>Forgot Password?</P>
              </Button>
              <Button onPress={() => navigation.navigate("signup")}>
                <P style={{ color: "#1560bd" }}>Sign up</P>
              </Button>
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
                <P style={{ color: "white", fontWeight: 600 }}>Login</P>
              </Button>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <P style={{ color: "#1560bd" }}>Or Sign in With</P>
              <IconButton
                icon={require("../../../resources/google.png")}
                onPress={() => promptAsync()}
                disabled={!request}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <P style={{ color: "#f0f0f0" }}>Made in 🇮🇳 with ❤️</P>
          <P style={{ color: "#f0f0f0" }}>Powered by : ASCITHUB-LKO</P>
        </View>
      </ImageBackground>
    </Wrapper>
  );
}
