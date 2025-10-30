import { Redirect, Stack, useSegments } from "expo-router";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { UserContext, UserProvider } from "./dev/contexts/userContextAPI";

export default function Layout() {

  return (
    <UserProvider>
      <AuthGuard />
      <Toast />
    </UserProvider>
  );
}



function AuthGuard() {
  const { user, isLoading } = useContext(UserContext);
  const segments = useSegments();

  const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup';

  if (isLoading) {
    return <View><Text>aaa</Text></View>;
  }

  if (!user && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthGroup) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup/index"
        options={{
          title: 'Cadastro',
          headerTitle: 'Cadastro',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: 'Perfil',
          headerTitle: 'Perfil',
          headerShown: true,
        }}
      />
    </Stack>
  );
}