import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { List } from "react-native-paper";
import { DateSelectionCalendar } from "react-native-easy-calendar";
import moment from "moment";

export default function DatePicker({ title, setValue, value }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <List.Accordion
      title={title}
      titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
      descriptionStyle={{ fontFamily: "Montserrat_400Regular", fontSize: 12 }}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      description={value}
      style={{
        backgroundColor: "#F1F1F1",
        borderRadius: 12,
        margin: 10,
      }}
    >
      <ScrollView style={{ height: 200, width: "100%" }}>
        <DateSelectionCalendar
          selectedDate={value}
          onSelectDate={(value) => {
            setValue(value);
            setExpanded(!expanded);
          }}
        />
      </ScrollView>
    </List.Accordion>
  );
}
