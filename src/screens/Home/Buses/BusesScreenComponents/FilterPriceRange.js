import React, { useState } from "react";
import { Text, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { C, P } from "../../../../infrastructure/components/Text";

export default function FilterPriceRange({ sliderValues, setSliderValues }) {
  const handleSliderValuesChange = (values) => {
    setSliderValues(values);
  };

  return (
    <View
      style={{
        height: 160,
        padding: 20,
        justifyContent: "space-between",
      }}
    >
      <P variant="title">Price Range</P>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
            flexDirection: "row",
          }}
        >
          <P>{sliderValues[0]}/-</P>
          <P>{sliderValues[1]}/-</P>
        </View>
        <MultiSlider
          values={sliderValues}
          min={1000}
          max={5000}
          sliderLength={350}
          onValuesChange={handleSliderValuesChange}
          selectedStyle={{ backgroundColor: "#1560bd" }}
          markerStyle={{
            backgroundColor: "#1560bd",
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
          pressedMarkerStyle={{ height: 25, width: 25, borderRadius: 12.5 }}
        />
      </View>
    </View>
  );
}
