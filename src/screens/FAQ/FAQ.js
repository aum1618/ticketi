import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { ApiData } from "../../services/context/ApiDataContext/ApiDataProvider";
import { Wrapper } from "../../infrastructure/components/Wrapper";
import ImageHeader from "../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../Home/TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { ScrollView } from "react-native-virtualized-view";
import { P, T } from "../../infrastructure/components/Text";

export default function FAQ({ navigation }) {
  const { Faq } = useContext(ApiData);
  console.log(Faq);

  const RenderItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 20 }}>
        <P style={{ fontFamily: "Montserrat_600SemiBold" }}>
          • {item.question}
        </P>
        <P>{item.description} </P>
      </View>
    );
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
          <T>Frequently Asked Questions</T>
        </View>
        <FlatList
          data={Faq}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </Wrapper>
  );
}
