import React from "react";
import { View } from "react-native";
import styled, { useTheme } from "styled-components";

const sizeVariant = {
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  v: "marginTop",
  h: "marginLeft",
};

const getVariant = (position, size, theme) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled(View)`
  ${({ variant }) => variant};
`;

export const Spacer = ({ position = "v", size = "s", children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};
