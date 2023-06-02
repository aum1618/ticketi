import { Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

export default function RatingModal({
  isRatingModalVisible,
  toggleRatingModal,
}) {
  const handleRatingPress = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <ReactNativeModal
      isVisible={isRatingModalVisible}
      onBackdropPress={toggleRatingModal}
      onSwipeComplete={toggleRatingModal}
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
      </View>
    </ReactNativeModal>
  );
}
