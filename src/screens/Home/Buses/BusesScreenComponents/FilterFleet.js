import { Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import { Spacer } from "../../../../infrastructure/components/spacer";
import { C, P, T } from "../../../../infrastructure/components/Text";
import { ApiData } from "../../../../services/context/ApiDataContext/ApiDataProvider";

export default function FilterSize({ selectedSize, setSelectedSize }) {
  const { fleets } = useContext(ApiData);
  const handleSizePress = (size) => {
    setSelectedSize(size);
  };
  return (
    <View
      style={{
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <P>Fleets Available</P>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          //   padding: 10,
          //   margin: 4,
          width: "100%",
        }}
      >
        {fleets.map((fleet, id) => {
          return (
            <TouchableOpacity
              id={id}
              style={[
                {
                  padding: 20,
                  borderRadius: 8,
                  borderColor: "black",
                  borderWidth: 0.4,
                  margin: 4,
                  justifyContent: "center",
                  alignItems: "center",
                },
                selectedSize === fleet && {
                  backgroundColor: "#1560bd",
                  borderWidth: 0,
                },
              ]}
              onPress={() => handleSizePress(fleet)}
            >
              <P style={[, selectedSize === fleet && { color: "white" }]}>
                {fleet.type}
              </P>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

{
  /* <Spacer position="left" size="large" />
<TouchableOpacity
  style={[
    {
      padding: 20,
      borderRadius: 8,
      borderColor: "black",
      borderWidth: 0.4,
      margin: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedSize === "Demo" && {
      backgroundColor: "#1560bd",
      borderWidth: 0,
    },
  ]}
  onPress={() => handleSizePress("Demo")}
>
  <P style={[, selectedSize === "Demo" && { color: "white" }]}>Demo</P>
</TouchableOpacity>

<Spacer position="left" size="large" />
<TouchableOpacity
  style={[
    {
      padding: 20,
      borderRadius: 8,
      borderColor: "black",
      borderWidth: 0.4,
      margin: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedSize === "Semi-Luxury" && {
      backgroundColor: "#1560bd",
      borderWidth: 0,
    },
  ]}
  onPress={() => handleSizePress("Semi-Luxury")}
>
  <P style={[, selectedSize === "Semi-Luxury" && { color: "white" }]}>
    Semi-Luxury
  </P>
</TouchableOpacity>

<Spacer position="left" size="large" />
<TouchableOpacity
  style={[
    {
      padding: 20,
      borderRadius: 8,
      borderColor: "black",
      borderWidth: 0.4,
      margin: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    selectedSize === "Ordinary Level" && {
      backgroundColor: "#1560bd",
      borderWidth: 0,
    },
  ]}
  onPress={() => handleSizePress("Ordinary Level")}
>
  <P
    style={[, selectedSize === "Ordinary Level" && { color: "white" }]}
  >
    Ordinary Level
  </P>
</TouchableOpacity> */
}
