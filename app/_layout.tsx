import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
