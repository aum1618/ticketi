import { View, Text } from "react-native";
import React, { createContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";
import moment from "moment";

export const ApiResponseContext = createContext();

export default function ApiResponseContextProvider({ children }) {
  const [selectedPickup, setSelectedPickup] = useState();
  const [selectedDrop, setSelectedDrop] = useState();
  const [selectedBus, setSelectedBus] = useState();
  const [selectedboardingPoint, setSelectedBoardingPoint] = useState();
  const [selectedboardingStand, setSelectedBoardingStand] = useState();
  const [selecteddroppingPoint, setSelectedDroppingPoint] = useState();
  const [selecteddroppingStand, setSelectedDroppingStand] = useState();
  const [selectedFacilities, setSelectedFacilities] = useState(new Map());
  const [cseat, setCseat] = useState();
  const [aseat, setAseat] = useState();
  const [sseat, setSseat] = useState();
  const [selectedBookedSeats, setSelectedBookedSeats] = useState();
  const [selectedtotal, setselectedTotal] = useState();
  const [selectedBookingData, setSelectedBookingData] = useState();
  const [journeydate, setJourneyDate] = useState();
  const [selectedSubTotal, setSelectedSubTotal] = useState();
  const [selectedvat, setSelectedvat] = useState();

  return (
    <ApiResponseContext.Provider
      value={{
        selectedPickup,
        selectedDrop,
        selectedBus,
        selectedboardingPoint,
        selecteddroppingPoint,
        selectedboardingStand,
        selecteddroppingStand,
        selectedFacilities,
        aseat,
        cseat,
        sseat,
        selectedBookedSeats,
        selectedtotal,
        selectedBookingData,
        journeydate,
        selectedSubTotal,
        selectedvat,
        setSelectedSubTotal,
        setSelectedvat,
        setJourneyDate,
        setSelectedBookingData,
        setselectedTotal,
        setSelectedBookedSeats,
        setSseat,
        setAseat,
        setCseat,
        setSelectedBoardingPoint,
        setSelectedDroppingPoint,
        setSelectedBoardingStand,
        setSelectedDroppingStand,
        setSelectedFacilities,
        setSelectedPickup,
        setSelectedDrop,
        setSelectedBus,
      }}
    >
      {children}
    </ApiResponseContext.Provider>
  );
}
