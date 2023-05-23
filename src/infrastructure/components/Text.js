import { Text } from "react-native";
import styled from "styled-components";
import { theme } from "../theme/theme";

const pxToNumber = (px) => Number(px.slice(0, -2));

export const H1 = styled(Text)`
  font-size: ${theme.fontSizes.h1};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.h1)}px;
  font-family: ${theme.fonts.bold};
`;
export const H2 = styled(Text)`
  font-size: ${theme.fontSizes.h2};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.h2)}px;
  font-family: ${theme.fonts.bold};
`;
export const H3 = styled(Text)`
  font-size: ${theme.fontSizes.h3};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.h3)}px;
  font-family: ${theme.fonts.medium};
`;
export const H4 = styled(Text)`
  font-size: ${theme.fontSizes.h4};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.h4)}px;
  font-family: ${theme.fonts.medium};
`;
export const T = styled(Text)`
  font-size: ${theme.fontSizes.title};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.title)}px;
  font-family: ${theme.fonts.medium};
`;
export const P = styled(Text)`
  font-size: ${theme.fontSizes.paragraph};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.paragraph)}px;
  font-family: ${theme.fonts.regular};
`;
export const C = styled(Text)`
  font-size: ${theme.fontSizes.caption};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.caption)}px;
  font-family: ${theme.fonts.regular};
`;
export const H = styled(Text)`
  font-size: ${theme.fontSizes.helper};
  line-height: ${1.5 * pxToNumber(theme.fontSizes.helper)}px;
  font-family: ${theme.fonts.regular};
`;
