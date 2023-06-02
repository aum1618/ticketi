import { View } from "react-native";
import ReactNativeModal from "react-native-modal";
import FilterPriceRange from "./FilterPriceRange";
import { P, T } from "../../../../infrastructure/components/Text";
import FilterSize from "./FilterFleet";
import { Button } from "react-native-paper";

export default function FilterModal({
  isFilterModalVisible,
  toggleFilterModal,
  sliderValues,
  setSliderValues,
  filterPress,
  selectedSize,
  setSelectedSize,
  discardPress,
}) {
  return (
    <ReactNativeModal
      isVisible={isFilterModalVisible}
      onBackdropPress={toggleFilterModal}
      onSwipeComplete={toggleFilterModal}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "white",
          height: "65%",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 40,
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              height: 5,
              width: 100,
              borderRadius: 30,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <T>Filter Buses</T>
        </View>
        <FilterPriceRange
          sliderValues={sliderValues}
          setSliderValues={setSliderValues}
        />
        <FilterSize
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <View
          style={{
            flexDirection: "row",
            margin: 10,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            mode="contained"
            buttonColor="#1560bd"
            style={{ width: "40%" }}
            onPress={() => {
              filterPress();
              toggleFilterModal();
            }}
          >
            <P>Apply</P>
          </Button>

          <Button
            textColor="black"
            mode="outlined"
            style={{ width: "40%" }}
            onPress={() => {
              discardPress();
              toggleFilterModal();
            }}
          >
            <P>Discard</P>
          </Button>
        </View>
      </View>
    </ReactNativeModal>
  );
}
