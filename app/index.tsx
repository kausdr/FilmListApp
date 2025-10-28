import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login } from './components/LoginScreen/Login';
import { SignUp } from './components/LoginScreen/SignUp';

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  );
};

export default App;
