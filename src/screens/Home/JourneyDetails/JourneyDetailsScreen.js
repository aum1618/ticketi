import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../../../infrastructure/components/Wrapper";
import ImageHeader from "../../../infrastructure/components/ImageHeader";
import TicketFinderHeader from "../TicketFinder/TicketFinderComponents/Header/TicketFinderHeader";
import { P, T } from "../../../infrastructure/components/Text";
import { ApiData } from "../../../services/context/ApiDataContext/ApiDataProvider";
import { ApiResponseContext } from "../../../services/context/ApiResponseContext/ApiResponseContextProvider";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";
import { Button, List } from "react-native-paper";
import StandList from "./JourneyDetailsScreenComponents/StandList/StandList";
import FacilitiesList from "./JourneyDetailsScreenComponents/FacilitiesList/FacilitiesList";
import AnimatedLottieView from "lottie-react-native";

export default function JourneyDetailsScreen({ navigation }) {
  const { stands, facilities } = useContext(ApiData);
  const {
    selectedBus,
    setSelectedBoardingPoint,
    setSelectedDroppingPoint,
    setSelectedBoardingStand,
    setSelectedDroppingStand,
    setSelectedFacilities,
  } = useContext(ApiResponseContext);
  const [boardingPoint, setBoardingPoint] = useState();
  const [boardingStand, setBoardingStand] = useState();
  const [droppingPoint, setDroppingPoint] = useState();
  const [droppingStand, setDroppingStand] = useState();
  const [BusFacilities, setBusFacilites] = useState();
  const [checkedFacilities, setCheckedFacilities] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const handlePress = () => {
    setLoading(true);
    setSelectedDroppingPoint(droppingPoint);
    setSelectedBoardingPoint(boardingPoint);
    setSelectedBoardingStand(boardingStand);
    setSelectedDroppingStand(droppingStand);
    setSelectedFacilities(checkedFacilities);
    navigation.navigate("SeatLayout");
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

  return (
    <Wrapper>
      <ImageHeader>
        <TicketFinderHeader navigation={navigation} />
      </ImageHeader>
      {boardingPoint && droppingPoint && BusFacilities ? (
        <View style={{ margin: 20, flex: 1 }}>
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
        </View>
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
            source={require("../../../../resources/loader.json")}
            autoPlay
            loop
            style={{ height: 100, width: 100 }}
          />
        </View>
      )}
    </Wrapper>
  );
}
