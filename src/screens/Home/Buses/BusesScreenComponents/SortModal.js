import { Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Spacer } from "../../../../infrastructure/components/spacer";
import { P, T } from "../../../../infrastructure/components/Text";

export default function SortModal({
  isSortModalVisible,
  toggleSortModal,
  selectedSort,
  setSelectedSort,
}) {
  const handleSortPress = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <ReactNativeModal
      isVisible={isSortModalVisible}
      onBackdropPress={toggleSortModal}
      onSwipeComplete={toggleSortModal}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{
          backgroundColor: "white",
          height: 370,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
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
        <Spacer size="medium" />
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <T>Sort by</T>
        </View>
        <Spacer size="large" />
        <TouchableOpacity
          style={[
            { padding: 20 },
            selectedSort === "Available Seats:Low to High" && {
              backgroundColor: "#1560bd",
            },
          ]}
          onPress={() => handleSortPress("Available Seats:Low to High")}
        >
          <P
            style={[
              ,
              selectedSort === "Available Seats:Low to High" && {
                color: "white",
              },
            ]}
          >
            Available Seats:Low to High
          </P>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { padding: 20 },
            selectedSort === "Available Seats:High to Low" && {
              backgroundColor: "#1560bd",
            },
          ]}
          onPress={() => handleSortPress("Available Seats:High to Low")}
        >
          <P
            style={[
              ,
              selectedSort === "Available Seats:High to Low" && {
                color: "white",
              },
            ]}
          >
            Available Seats:High to Low
          </P>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { padding: 20 },
            selectedSort === "Price:Low to High" && {
              backgroundColor: "#1560bd",
            },
          ]}
          onPress={() => handleSortPress("Price:Low to High")}
        >
          <P
            style={[
              ,
              selectedSort === "Price:Low to High" && { color: "white" },
            ]}
          >
            Price:Low to High
          </P>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { padding: 20 },
            selectedSort === "Price:High to Low" && {
              backgroundColor: "#1560bd",
            },
          ]}
          onPress={() => handleSortPress("Price:High to Low")}
        >
          <P
            style={[
              ,
              selectedSort === "Price:High to Low" && { color: "white" },
            ]}
          >
            Price:High to Low
          </P>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
}
