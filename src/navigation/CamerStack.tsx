import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../screens/Camera/CameraScreen";
import Hasil from "../screens/Camera/Hasil";
import LoadingProses from "../screens/Camera/LoadingProses";

// 👇 pastikan type di-export
export type CameraStackParamList = {
  CameraScreen: undefined;
  Hasil: { prediction: string; probabilities: number[] };
  LoadingProses: { uri: string};
};

const Stack = createNativeStackNavigator<CameraStackParamList>();

export default function CameraStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="Hasil" component={Hasil} />
      <Stack.Screen name="LoadingProses" component={LoadingProses} />
    </Stack.Navigator>
  );
}