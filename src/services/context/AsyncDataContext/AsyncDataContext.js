import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncDataContext = createContext();

export default function AsyncDataContextProvider({ children }) {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  const storeToken = async (value) => {
    setToken(value);
    try {
      await AsyncStorage.setItem("@token", String(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeToken = () => {
    AsyncStorage.removeItem("@token");
    setToken();
  };

  const storeUserData = async (value) => {
    setUserData(value);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user_data", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const removeUserData = () => {
    AsyncStorage.removeItem("@user_data");
    setUserData();
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user_data");
      return jsonValue != null ? setUserData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, []);

  return (
    <AsyncDataContext.Provider
      value={{
        token,
        getToken,
        storeToken,
        userData,
        removeToken,
        removeUserData,
        getUserData,
        storeUserData,
      }}
    >
      {children}
    </AsyncDataContext.Provider>
  );
}
