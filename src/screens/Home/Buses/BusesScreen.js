import { View, Text, VirtualizedList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { C, P, T } from "../../../infrastructure/components/Text";
import { Spacer } from "../../../infrastructure/components/spacer";
import { Button } from "react-native-paper";
import BusCard from "./BusesScreenComponents/BusCard";
import { FlatList } from "react-native-gesture-handler";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import FilterModal from "./BusesScreenComponents/FilterModal";
import SortModal from "./BusesScreenComponents/SortModal";

export default function BusesScreen({ navigation, route }) {
  const { selectedPickup, selectedDrop } = useContext(ApiResponseContext);
  const { busesData } = route.params;
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort By");
  const [busesArray, setBussesArray] = useState(busesData);
  const [sliderValues, setSliderValues] = useState([1700, 4500]);
  const [selectedSize, setSelectedSize] = useState();

  const filterPress = () => {
    let filteredBuses = [...busesData];

    filteredBuses = filteredBuses.filter(
      (bus) =>
        Number(bus.adult_fair) > sliderValues[0] &&
        Number(bus.adult_fair) < sliderValues[1]
    );

    if (selectedSize !== null) {
      filteredBuses = filteredBuses.filter(
        (bus) => bus.fleet_id === selectedSize.id
      );
    }
    setBussesArray(filteredBuses);
  };
  const discardPress = () => {
    setBussesArray(busesData);
  };

  useEffect(() => {
    if (selectedSort === "Available Seats:Low to High") {
      const sortedAscending = busesArray.sort(
        (a, b) => a.available_seat - b.available_seat
      );
      setBussesArray(sortedAscending);
    } else if (selectedSort === "Available Seats:High to Low") {
      const sortedAscending = busesArray.sort(
        (a, b) => b.available_seat - a.available_seat
      );
      setBussesArray(sortedAscending);
    } else if (selectedSort === "Price:Low to High") {
      const sortedAscending = busesArray.sort(
        (a, b) => Number(a.adult_fair) - Number(b.adult_fair)
      );
      setBussesArray(sortedAscending);
    } else if (selectedSort === "Price:High to Low") {
      const sortedAscending = busesArray.sort(
        (a, b) => Number(b.adult_fair) - Number(a.adult_fair)
      );
      setBussesArray(sortedAscending);
    }
  }, [selectedSort]);

  const toggleSortModal = () => {
    setIsSortModalVisible(!isSortModalVisible);
  };

  const toggleFilterModal = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
  };

  return (
    <Wrapper>
      <FilterModal
        isFilterModalVisible={isFilterModalVisible}
        toggleFilterModal={toggleFilterModal}
        sliderValues={sliderValues}
        setSliderValues={setSliderValues}
        filterPress={filterPress}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        discardPress={discardPress}
      />
      <SortModal
        isSortModalVisible={isSortModalVisible}
        toggleSortModal={toggleSortModal}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      <View style={{ margin: 20, flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <T>
            {selectedPickup?.name}-{selectedDrop?.name}
          </T>
          <T>{busesData.length} Buses</T>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Button
            icon="filter-variant"
            textColor="black"
            onPress={toggleFilterModal}
            style={{ width: "40%" }}
          >
            <P>Filter</P>
          </Button>
          <Button
            icon="swap-vertical"
            style={{ width: "40%" }}
            textColor="black"
            onPress={toggleSortModal}
          >
            <P>Sort By</P>
          </Button>
        </View>
        <FlatList
          data={busesArray}
          renderItem={(item) => <BusCard bus={item} navigation={navigation} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Wrapper>
  );
}
