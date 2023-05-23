import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { ApiData } from "../../../../../services/context/ApiDataContext/ApiDataProvider";

export default function FleetList({ title, setValue, value }) {
  const { fleets } = useContext(ApiData);
  const [expanded, setExpanded] = useState(false);

  const handlePress = (item) => {
    setValue(item.type);
    setExpanded(!expanded);
  };
  return (
    <List.Accordion
      title={title}
      titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
      descriptionStyle={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}
      description={value}
      expanded={expanded}
      style={{
        backgroundColor: "#F1F1F1",
        borderRadius: 12,
        margin: 10,
      }}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={{ backgroundColor: "#F1F1F1" }}>
        <FlatList
          data={fleets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <List.Item
                  title={item.type}
                  key={item.id}
                  onPress={() => handlePress(item)}
                />
              </View>
            );
          }}
        />
      </View>
    </List.Accordion>
  );
}
