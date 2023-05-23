import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { List } from "react-native-paper";

export default function StandList({ point, stands, title, stand, setStand }) {
  const [expanded, setExpanded] = useState(false);
  const getStand = () => {
    setStand(stands.find((stand) => stand.id === point[0].stand_id));
  };
  useEffect(() => {
    getStand();
  }, []);

  return (
    <>
      {stand && (
        <List.Accordion
          expanded={expanded}
          title={title}
          description={stand?.name}
          titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
          descriptionStyle={{
            fontFamily: "Montserrat_400Regular",
            fontSize: 12,
          }}
          style={{
            backgroundColor: "#F0F0F0",
            borderRadius: 12,
            margin: 10,
          }}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <List.Item
            title={stand.name}
            style={{ backgroundColor: "#f0f0f0" }}
            description={point[0].detail}
            titleStyle={{ fontFamily: "Montserrat_600SemiBold" }}
            descriptionStyle={{
              fontFamily: "Montserrat_400Regular",
            }}
            onPress={() => {
              setExpanded(!expanded);
            }}
          />
        </List.Accordion>
      )}
    </>
  );
}
