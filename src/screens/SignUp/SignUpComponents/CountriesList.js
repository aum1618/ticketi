import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";
import { FlatList } from "react-native-gesture-handler";

export default function CountriesList({ selectedCountry, setSelectedCountry }) {
  const { countries } = useContext(ApiData);
  const [expanded, setExpanded] = useState(false);

  return (
    <List.Accordion
      expanded={expanded}
      title="Select Country"
      description={selectedCountry.name}
      style={{ width: "100%", border: 1, borderColor: "blue" }}
      onPress={() => setExpanded(!expanded)}
    >
      <FlatList
        style={{ paddingBottom: 150 }}
        data={countries}
        renderItem={({ item }) => (
          <List.Item
            style={{ backgroundColor: "white" }}
            onPress={() => {
              setSelectedCountry(item);
              setExpanded(!expanded);
            }}
            title={item?.name}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </List.Accordion>
  );
}
