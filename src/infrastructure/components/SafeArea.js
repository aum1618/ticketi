import { Platform, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";

export const SafeArea = styled(SafeAreaView)`
  padding-top: ${Platform.OS === "android"
    ? StatusBar.currentHeight + "px"
    : 0};
  flex: 1;
`;
