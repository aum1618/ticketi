import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme/theme";
import { Wrapper } from "./src/infrastructure/components/Wrapper";
import { SafeArea } from "./src/infrastructure/components/SafeArea";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator/MainNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator/DrawerNavigator";
import ApiDataProvider from "./src/services/context/ApiDataContext/ApiDataProvider";
import ApiResponseContextProvider from "./src/services/context/ApiResponseContext/ApiResponseContextProvider";
import AuthNavigator from "./src/navigation/AuthNavigator/AuthNavigator";
import AsyncDataContextProvider from "./src/services/context/AsyncDataContext/AsyncDataContext";
import IndexScreen from "./src/navigation/Index";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  console.log("hi");
  return (
    <ThemeProvider theme={theme}>
      <AsyncDataContextProvider>
        <ApiResponseContextProvider>
          <ApiDataProvider>
            <Wrapper>
              <IndexScreen />
              <StatusBar style="auto" />
            </Wrapper>
          </ApiDataProvider>
        </ApiResponseContextProvider>
      </AsyncDataContextProvider>
    </ThemeProvider>
  );
}
