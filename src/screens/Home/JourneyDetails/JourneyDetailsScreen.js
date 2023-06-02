import { View, Text, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { C, P, T } from "../../../infrastructure/components/Text";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";
import { Button, List, TextInput } from "react-native-paper";
import StandList from "./JourneyDetailsScreenComponents/StandList/StandList";
import FacilitiesList from "./JourneyDetailsScreenComponents/FacilitiesList/FacilitiesList";
import AnimatedLottieView from "lottie-react-native";
import { ScrollView } from "react-native-virtualized-view";
import SelectDropdown from "react-native-select-dropdown";
import { Spacer } from "../../../infrastructure/components/spacer";

export default function JourneyDetailsScreen({ navigation }) {
  const { stands, facilities } = useContext(ApiData);
  const {
    selectedBus,
    setSelectedBoardingPoint,
    setSelectedDroppingPoint,
    setSelectedBoardingStand,
    setSelectedDroppingStand,
    setSelectedFacilities,
    setSseat,
    setAseat,
    setCseat,
  } = useContext(ApiResponseContext);
  const [boardingPoint, setBoardingPoint] = useState();
  const [boardingStand, setBoardingStand] = useState();
  const [droppingPoint, setDroppingPoint] = useState();
  const [droppingStand, setDroppingStand] = useState();
  const [BusFacilities, setBusFacilites] = useState();
  const [adult, setAdult] = useState("0");
  const [child, setChild] = useState("0");
  const [special, setSpecial] = useState("0");
  const [checkedFacilities, setCheckedFacilities] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const totalSeats = Number(selectedBus.item.available_seat);

  const handlePress = () => {
    setLoading(true);
    setSelectedDroppingPoint(droppingPoint);
    setSelectedBoardingPoint(boardingPoint);
    setSelectedBoardingStand(boardingStand);
    setSelectedDroppingStand(droppingStand);
    setSelectedFacilities(checkedFacilities);
    // const selectedSeats = Number(adult) + Number(child) + Number(special);
    if (Number(adult) + Number(child) + Number(special) === 0) {
      Alert.alert(
        "Seats Not Selected",
        `please select atleast one Seat`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (Number(adult) + Number(child) + Number(special) > totalSeats) {
      Alert.alert(
        "Selected more than Available Seats",
        `Please Select Again`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (Number(child) > Number(selectedBus.item.child_seat)) {
      Alert.alert(
        "Access Child Seats Selected",
        `Please Select Again`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (Number(special) > Number(selectedBus.item.special_seat)) {
      Alert.alert(
        "Access Special Seats Selected",
        `Please Select Again`,
        [
          {},
          {},
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              setAdult("0");
              setChild("0");
              setSpecial("0");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (
      Number(adult) + Number(child) + Number(special) < totalSeats ||
      Number(adult) + Number(child) + Number(special) === totalSeats
    ) {
      setAseat(adult);
      setCseat(child);
      setSseat(special);
      navigation.navigate("SeatLayout", {
        selectedSeats: Number(adult) + Number(child) + Number(special),
      });
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    getBoardingandDropping();
  }, []);

  const getBoardingandDropping = async () => {
    await axios
      .get(`${baseUrl}triplist/boardings/${selectedBus.item.trip_id}`)
      .then((res) => {
        setBoardingPoint(res.data.data);
      });
    await axios
      .get(`${baseUrl}triplist/droppings/${selectedBus.item.trip_id}`)
      .then((res) => {
        setDroppingPoint(res.data.data);
      });
    getBusFacilities();
  };
  const getBusFacilities = () => {
    setBusFacilites(facilities);
  };
  function generateArray(upToNumber) {
    let numbersArray = [];

    for (let i = 1; i <= upToNumber; i++) {
      numbersArray.push(i);
    }

    return numbersArray;
  }
  // console.log(selectedBus);

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {boardingPoint && droppingPoint && BusFacilities ? (
        <ScrollView style={{ margin: 20, flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>Enter your Journey Details</T>
          </View>
          <View>
            <StandList
              point={boardingPoint}
              stands={stands}
              title="Boarding Point"
              stand={boardingStand}
              setStand={setBoardingStand}
            />
            <StandList
              point={droppingPoint}
              stands={stands}
              title="Dropping Point"
              stand={droppingStand}
              setStand={setDroppingStand}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>Available Bus Facilities</T>
          </View>
          <View>
            <FacilitiesList
              facilities={BusFacilities}
              checkedFacilities={checkedFacilities}
              setCheckedFacilities={setCheckedFacilities}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <T>Seat Details</T>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // marginHorizontal: 10,
              paddingHorizontal: 20,
            }}
          >
            <P>Available Seats</P>
            <P>{selectedBus.item.available_seat}</P>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // marginHorizontal: 10,
              paddingHorizontal: 20,
            }}
          >
            <P>Available Child Seats</P>
            <P>{selectedBus.item.child_seat}</P>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // marginHorizontal: 10,
              paddingHorizontal: 20,
            }}
          >
            <P>Available Special Seats</P>
            <P>{selectedBus.item.special_seat}</P>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginVertical: 5,
              justifyContent: "space-between",
            }}
          >
            {/* <TextInput
              mode="outlined"
              label="Adult"
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              keyboardType="number-pad"
              value={adult}
              onChangeText={(x) => setAdult(x)}
              style={{
                margin: 10,
                flex: 1,
                fontFamily: "Montserrat_400Regular",
              }}
            /> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <C>Adult</C>
              <SelectDropdown
                data={generateArray(
                  Number(selectedBus.item.available_seat) -
                    Number(selectedBus.item.child_seat) -
                    Number(selectedBus.item.special_seat)
                )}
                defaultButtonText={adult}
                buttonStyle={{ width: "98%" }}
                onSelect={(item) => {
                  setAdult(item);
                }}
              />
            </View>
            <Spacer position="h" size="l" />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <C>Child</C>
              <SelectDropdown
                data={generateArray(Number(selectedBus.item.child_seat))}
                defaultButtonText={child}
                buttonStyle={{ width: "98%" }}
                onSelect={(item) => setChild(item)}
              />
            </View>
            <Spacer position="h" size="l" />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <C>Special</C>
              <SelectDropdown
                data={generateArray(Number(selectedBus.item.special_seat))}
                defaultButtonText={special}
                buttonStyle={{ width: "98%" }}
                onSelect={(item) => setSpecial(item)}
              />
            </View>
            {/* <TextInput
              mode="outlined"
              label="Child"
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              keyboardType="number-pad"
              value={child}
              onChangeText={(x) => setChild(x)}
              style={{
                margin: 10,
                flex: 1,
                fontFamily: "Montserrat_400Regular",
              }}
            />
            <TextInput
              mode="outlined"
              label="Special"
              outlineColor="#1560bd"
              selectionColor="#1560bd"
              activeOutlineColor="#1560bd"
              keyboardType="number-pad"
              value={special}
              onChangeText={(x) => setSpecial(x)}
              style={{
                margin: 10,
                flex: 1,
                fontFamily: "Montserrat_400Regular",
              }}
            /> */}
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              loading={loading}
              mode="contained"
              buttonColor="#1560bd"
              style={{ width: "50%", marginTop: 10 }}
              onPress={handlePress}
            >
              <P style={{ color: "white", fontWeight: 600 }}>Next</P>
            </Button>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
            marginBottom: 100,
            flex: 1,
          }}
        >
          <AnimatedLottieView
            source={require("../../../../resources/GvtTpavD2q.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </Wrapper>
  );
}
