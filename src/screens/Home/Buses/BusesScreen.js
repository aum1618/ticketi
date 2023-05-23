import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import { Spacer } from "../../../infrastructure/components/spacer";
import { Button } from "react-native-paper";
import BusCard from "./BusesScreenComponents/BusCard";
import { FlatList } from "react-native-gesture-handler";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";

export default function BusesScreen({ navigation, route }) {
  const { selectedPickup, selectedDrop } = useContext(ApiResponseContext);
  const { busesData } = route.params;

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>
            {selectedPickup?.name}-{selectedDrop?.name}
          </T>
          <T>{busesData.length} Buses</T>
        </View>
        <FlatList
          data={busesData}
          renderItem={(item) => <BusCard bus={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Wrapper>
  );
}
