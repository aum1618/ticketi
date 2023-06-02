import { View, Text, ScrollView, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import { P, T } from "../../infrastructure/components/Text";
import { Rating } from "react-native-ratings";
import { Spacer } from "../../infrastructure/components/spacer";
import { Button, TextInput } from "react-native-paper";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";

export default function RatingScreen({ navigation, route }) {
  const { item } = route.params;
  const { token, userData } = useContext(AsyncDataContext);

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [loading, setLoading] = useState(false);
  //   console.log(item);
  //   console.log(userData, token);

  const handleRating = (rate) => {
    console.log("Selected rating:", rate);
    setRating(rate);
    // You can perform any additional logic with the rating value here
  };

  const handleSubmit = () => {
    setLoading(true);
    const form = new FormData();
    form.append("user_id", userData.user_id);
    form.append("trip_id", item.trip_id);
    form.append("subtrip_id", item.subtrip_id);
    form.append("booking_id", item.booking_id);
    form.append("comments", review);
    form.append("rating", rating);
    axios
      .postForm(`${baseUrl}ratings/create`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          ToastAndroid.show(
            "Rating Submitted Successfully",
            ToastAndroid.SHORT
          );
          setLoading(false);
          navigation.goBack();
        }
      });
  };

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ margin: 20, flex: 1 }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>How Was your Trip?</T>
          <P>Give a Rating</P>
        </View>
        <View style={{ width: "100%" }}>
          <Rating
            showRating
            ratingTextColor="#1560bd"
            imageSize={50}
            fractions={1}
            startingValue={0}
            onFinishRating={handleRating}
            style={{ paddingVertical: 10, backgroundColor: "#f9f9f9" }}
          />
        </View>
        <Spacer size="xl" />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>Have any Suggestions?</T>
          <P>Leave a Review</P>
        </View>
        <View style={{ margin: 20 }}>
          <TextInput
            mode="outlined"
            multiline={true}
            style={{ height: 150, backgroundColor: "white" }}
            outlineColor="#1560bd"
            activeOutlineColor="#1560bd"
            value={review}
            onChangeText={(x) => setReview(x)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            loading={loading}
            mode="contained"
            buttonColor="#1560bd"
            style={{ width: "40%" }}
            onPress={handleSubmit}
          >
            <P>Submit</P>
          </Button>

          <Button
            textColor="black"
            mode="outlined"
            style={{ width: "40%" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <P>Cancel</P>
          </Button>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
