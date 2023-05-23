import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { ApiData } from "../../../../../services/context/ApiDataContext/ApiDataProvider";

export default function AreaList({ title, setValue, value }) {
  const [expanded, setExpanded] = useState(false);
  const { locations } = useContext(ApiData);

  const handlePress = (item) => {
    setValue(item);
    setExpanded(!expanded);
  };

  const renderItem = ({ item }) => {
    return <List.Item title={item.name} onPress={() => handlePress(item)} />;
  };

  return (
    <List.Accordion
      title={title}
      titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
      descriptionStyle={{ fontFamily: "Montserrat_400Regular", fontSize: 10 }}
      description={value.name}
      expanded={expanded}
      style={{
        backgroundColor: "#F0F0F0",
        borderRadius: 12,
        margin: 10,
        width: 150,
      }}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={{ backgroundColor: "#f0f0f0", height: 300 }}>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </List.Accordion>
  );
}
