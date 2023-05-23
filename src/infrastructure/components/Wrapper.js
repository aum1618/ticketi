import { View } from "react-native";
import styled from "styled-components";

export const Wrapper = styled(View)`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
`;
