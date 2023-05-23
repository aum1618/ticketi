import { View, Text, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import { AsyncDataContext } from "../../services/context/AsyncDataContext/AsyncDataContext";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";
import { T } from "../../infrastructure/components/Text";
import BookingHistoryCard from "./BookingHistoryCard";
import AnimatedLottieView from "lottie-react-native";

export default function BookingHistoryScreen({ navigation }) {
  const [bookedTickets, setBookedTickets] = useState();
  const { token } = useContext(AsyncDataContext);
  const getBookingHistory = () => {
    axios
      .get(`${baseUrl}passangers/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setBookedTickets(res.data.data);
      });
  };
  useEffect(() => {
    getBookingHistory();
  }, []);
  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {bookedTickets ? (
        <>
          {bookedTickets !== "No ticket found" ? (
            <View style={{ margin: 20, flex: 1 }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <T>Booking History</T>
              </View>
              <FlatList
                data={bookedTickets && bookedTickets.reverse()}
                renderItem={(item) => (
                  <BookingHistoryCard
                    item={item.item}
                    navigation={navigation}
                  />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View
              style={{
                marginBottom: 100,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <T>No Ticket Found</T>
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            marginBottom: 100,
            flex: 1,
          }}
        >
          <AnimatedLottieView
            source={require("../../../resources/loader.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </Wrapper>
  );
}
