// 671011928468-tkeiaggooqnh78dv3t6p0ofh8kior2j2.apps.googleusercontent.com ios
// 671011928468-b9sn9939gtnp7j36sde9o3skpoitvs38.apps.googleusercontent.com android
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
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

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
