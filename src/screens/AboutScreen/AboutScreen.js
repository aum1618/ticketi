import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React, { useContext } from "react";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../infrastructure/components/Text";
import { ApiData } from "../../services/context/ApiDataContext/ApiDataProvider";

export default function AboutScreen({ navigation }) {
  const { about } = useContext(ApiData);
  const { width } = useWindowDimensions();
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
          <T>{about.title}</T>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T style={{ fontFamily: "Montserrat_400Regular" }}>
            {about.sub_title}
          </T>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <P>{about.description}</P>
        </View>
        {/* <RenderHTML source={about.description} contentWidth={width} /> */}
      </ScrollView>
    </Wrapper>
  );
}
