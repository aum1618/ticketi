import { View, Text } from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";

export default function Seat({
  bookedSeats,
  setBookedSeats,
  item,
  selectedSeats,
}) {
  const [isChecked, setIsChecked] = useState(
    bookedSeats.includes(item?.seatNumber)
  );
  // console.log(selectedSeats);

  const handlePress = () => {
    setBookedSeats((prevBookedSeats) => {
      if (isChecked) {
        return prevBookedSeats.filter((x) => x !== item?.seatNumber);
      } else {
        return [...prevBookedSeats, item?.seatNumber];
      }
    });
    setIsChecked(!isChecked);
  };

  return (
    <>
      {item ? (
        <IconButton
          onPress={!item?.isReserved && handlePress}
          disabled={
            item?.isReserved
              ? false
              : selectedSeats === bookedSeats.length &&
                !bookedSeats.includes(item?.seatNumber)
          }
          style={{ margin: 0, padding: 0 }}
          iconColor={
            item.isReserved
              ? "green"
              : bookedSeats.includes(item?.seatNumber)
              ? "#1560bd"
              : "black"
          }
          size={35}
          icon={require("../../../../../resources/seat.png")}
        />
      ) : (
        <IconButton style={{ margin: 0, padding: 0 }} size={35} />
      )}
    </>
  );
}
