import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { IconButton, List } from "react-native-paper";
import { ApiData } from "../../../../../services/context/ApiDataContext/ApiDataProvider";
import { P } from "../../../../../infrastructure/components/Text";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "@expo/vector-icons/Ionicons";

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
    // <List.Accordion
    //   title={title}
    //   titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
    //   descriptionStyle={{ fontFamily: "Montserrat_400Regular", fontSize: 10 }}
    //   description={value.name}
    //   expanded={expanded}
    //   style={{
    //     backgroundColor: "#F0F0F0",
    //     borderRadius: 12,
    //     margin: 10,
    //     width: 150,
    //   }}
    //   onPress={() => setExpanded(!expanded)}
    // >
    //   <View style={{ backgroundColor: "#f0f0f0", height: 300 }}>
    //     <FlatList
    //       data={locations}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={renderItem}
    //     />
    //   </View>
    // </List.Accordion>
    <View
      style={{
        backgroundColor: "#F0F0F0",
        borderRadius: 12,
        margin: 10,
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <P
          style={{
            fontFamily: "Montserrat_600SemiBold",
            paddingLeft: 20,
            paddingTop: 5,
          }}
        >
          {title}
        </P>
      </View>
      <SelectDropdown
        data={locations}
        defaultButtonText={value.name}
        buttonTextStyle={{
          fontFamily: "Montserrat_400Regular",
          fontSize: 12,
        }}
        rowTextStyle={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}
        buttonTextAfterSelection={(item) => item.name}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        rowTextForSelection={(item) => item.name}
        buttonStyle={{ width: "98%", height: 35 }}
        onSelect={(item) => {
          handlePress(item);
        }}
      />
    </View>
  );
}
