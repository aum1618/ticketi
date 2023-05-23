import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/baseUrl";

export const ApiData = createContext();

export default function ApiDataProvider({ children }) {
  const [locations, setLocations] = useState();
  const [stands, setStands] = useState();
  const [facilities, setFacilities] = useState();
  const [about, setAbout] = useState();
  const [Faq, setFaq] = useState();
  const [policy, setPolicy] = useState();
  const [countries, setCountries] = useState();
  const [fleets, setFleets] = useState();
  const [taxes, setTaxes] = useState();

  useEffect(() => {
    getLocations();
    getStands();
    getFacilities();
    getAbout();
    getfaq();
    getPolicy();
    getCountries();
    getFleets();
    getTaxes();
  }, []);
  const getTaxes = async () => {
    await axios
      .get(`${baseUrl}taxs`)
      .then((res) => {
        setTaxes(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getStands = async () => {
    await axios
      .get(`${baseUrl}stands`)
      .then((res) => {
        setStands(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const getFleets = async () => {
    await axios
      .get(`${baseUrl}frontend/fleets`)
      .then((res) => {
        setFleets(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const getCountries = async () => {
    await axios
      .get(`${baseUrl}countries`)
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getAbout = async () => {
    await axios
      .get(`${baseUrl}pages/aboutpage`)
      .then((res) => {
        setAbout(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  const getfaq = async () => {
    await axios
      .get(`${baseUrl}pages/question`)
      .then((res) => {
        setFaq(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getPolicy = async () => {
    await axios
      .get(`${baseUrl}pages/termspage`)
      .then((res) => {
        setPolicy(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getFacilities = async () => {
    await axios
      .get(`${baseUrl}facilities`)
      .then((res) => {
        setFacilities(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getLocations = async () => {
    await axios
      .get(`${baseUrl}locations`)
      .then((res) => {
        setLocations(res.data.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <ApiData.Provider
      value={{
        locations,
        stands,
        facilities,
        about,
        Faq,
        policy,
        countries,
        fleets,
        taxes,
      }}
    >
      {children}
    </ApiData.Provider>
  );
}
