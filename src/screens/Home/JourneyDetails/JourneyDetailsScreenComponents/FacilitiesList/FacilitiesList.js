import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";

export default function FacilitiesList({
  facilities,
  checkedFacilities,
  setCheckedFacilities,
}) {
  const handleCheckboxChange = (id) => {
    const newCheckedFacilities = new Map(checkedFacilities);
    newCheckedFacilities.set(id, !checkedFacilities.get(id));
    setCheckedFacilities(newCheckedFacilities);
  };

  const renderCheckbox = ({ item }) => {
    const isChecked = !!checkedFacilities.get(item.id);
    return (
      <Checkbox.Item
        label={item.name}
        color="#348DCD"
        labelStyle={{ fontFamily: "Montserrat_400Regular" }}
        status={isChecked ? "checked" : "unchecked"}
        onPress={() => handleCheckboxChange(item.id)}
      />
    );
  };

  return (
    <View>
      <FlatList data={facilities} renderItem={renderCheckbox} />
    </View>
  );
}
