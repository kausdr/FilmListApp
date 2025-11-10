import { Keyboard, Platform } from "react-native";

export const dismissKeyboard = () => {
    if (Platform.OS !== 'web') {
        Keyboard.dismiss();
    }
};