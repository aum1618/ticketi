import { View, Text } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";

export default function Seat({ bookedSeats, setBookedSeats, item }) {
  const [isChecked, setIsChecked] = useState(bookedSeats.includes(item));

  const handlePress = () => {
    setBookedSeats((prevBookedSeats) => {
      if (isChecked) {
        return prevBookedSeats.filter((x) => x !== item);
      } else {
        return [...prevBookedSeats, item];
      }
    });
    setIsChecked(!isChecked);
  };

  return (
    <IconButton
      onPress={handlePress}
      style={{ margin: 0, padding: 0 }}
      iconColor={bookedSeats.includes(item) ? "#1560bd" : "black"}
      size={35}
      icon={require("../../../../../resources/seat.png")}
    />
  );
}
