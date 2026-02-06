import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeStack from "./HomeStack";
import TabBar from "../components/TabBar";
import CameraStack from "./CameraStack";
import SettingStack from "./SetingStack";

export type RootTabParamList = {
  HomeStack: undefined;
  CameraStack: undefined;
  SettingStack: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      
      <Tab.Screen 
        name="CameraStack" 
        component={CameraStack} 
        options={({ route }) => {
          // cek route aktif di dalam CameraStack
          const routeName = getFocusedRouteNameFromRoute(route) ?? "CameraScreen";
          console.log("Current Route in CameraStack:", routeName);

          if (routeName === "CameraScreen") {
            return { headerShown: false, tabBarStyle: { display: "none" } };
          }

          return { headerShown: false };
        }}
      />

      <Tab.Screen name="SettingStack" component={SettingStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
