import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TicketSearchScreen from "../../screens/Home/TicketFinder/TicketSearchScreen";
import BusesScreen from "../../screens/Home/Buses/BusesScreen";
import JourneyDetailsScreen from "../../screens/Home/JourneyDetails/JourneyDetailsScreen";
import SeatLayout from "../../screens/Home/SeatLayout/SeatLayout";
import Payment from "../../screens/Home/Payment/Payment";
import Paypal from "../../screens/Home/PayPal/Paypal";
import AboutScreen from "../../screens/AboutScreen/AboutScreen";
import FAQ from "../../screens/FAQ/FAQ";
import PolicyScreen from "../../screens/PolicyScreen/PolicyScreen";
import PayCash from "../../screens/Home/PayCash/PayCash";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import TicketScreen from "../../screens/Ticket/TicketScreen";
import BookingHistoryScreen from "../../screens/BookingHistory/BookingHistoryScreen";
import PasswordScreen from "../../screens/PasswordScreen/PasswordScreen";
import AuthIndex from "../AuthIndex";
import Login from "../../screens/Login/Login";
import ForgotPassword from "../../screens/ForgotPassword/ForgotPassword";
import SignUp from "../../screens/SignUp/SignUp";
import Country from "../../screens/Country/Country";
import RatingScreen from "../../screens/RatingScreen/RatingScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ticketSearch" component={TicketSearchScreen} />
      <Stack.Screen name="Buses" component={BusesScreen} />
      <Stack.Screen name="JourneyDetails" component={AuthIndex} />
      <Stack.Screen name="SeatLayout" component={SeatLayout} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="paypal" component={Paypal} />
      <Stack.Screen name="cash" component={PayCash} />
      <Stack.Screen name="about" component={AboutScreen} />
      <Stack.Screen name="faq" component={FAQ} />
      <Stack.Screen name="policy" component={PolicyScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="Ticket" component={TicketScreen} />
      <Stack.Screen name="history" component={BookingHistoryScreen} />
      <Stack.Screen name="password" component={PasswordScreen} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forget" component={ForgotPassword} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="country" component={Country} />
      <Stack.Screen name="rating" component={RatingScreen} />
    </Stack.Navigator>
  );
}
