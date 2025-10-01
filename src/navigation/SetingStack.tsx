import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../screens/Setting";

export type SettingStackParamList = {
  SettingScreen: undefined;
};

const Stack = createNativeStackNavigator<SettingStackParamList>();

export default function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
}
