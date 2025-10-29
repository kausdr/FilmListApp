import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { UserProvider } from "./dev/contexts/userContextAPI";

export default function Layout() {

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}/>
      <Toast />
    </UserProvider>
  );
}
