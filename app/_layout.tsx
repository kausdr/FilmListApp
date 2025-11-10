import { Redirect, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { UserContext, UserProvider } from "./_dev/contexts/userContextAPI";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <UserProvider>
          <AuthGuard />
          <Stack
            screenOptions={{
              headerShown: true,
              headerBackTitle: "Voltar",
            }}
          >
            <Stack.Screen
              name="home/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup/index"
              options={{
                title: "Cadastro",
                headerTitle: "Cadastro",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="profile/index"
              options={{
                title: "Perfil",
                headerTitle: "Perfil",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="favorites/index"
              options={{
                title: "Minha Lista",
                headerTitle: "Minha Lista",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="movie/[id]"
              options={{
                title: "Detalhes do Filme",
                headerTitle: "Detalhes",
                headerShown: true,
              }}
            />
          </Stack>
          <Toast />
          <StatusBar style="auto" />
        </UserProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AuthGuard() {
  const { user, isLoading } = useContext(UserContext);
  const segments = useSegments();

  const inAuthGroup = segments[0] === "login" || segments[0] === "signup";

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!user && !inAuthGroup) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthGroup) {
    return <Redirect href="/home" />;
  }

  return null; // não renderiza outro Stack aqui!
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
