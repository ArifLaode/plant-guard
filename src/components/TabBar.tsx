import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const focusedRoute = state.routes[state.index];
  const childRouteName = getFocusedRouteNameFromRoute(focusedRoute);

  console.log("TabBar active parent:", focusedRoute.name, "child:", childRouteName);

  // Kalau parent = CameraStack, tentukan child (default ke "CameraScreen")
  if (focusedRoute.name === "CameraStack") {
  const activeChild = childRouteName ?? "CameraScreen";

  // 🚫 Hide hanya ketika di CameraScreen
  if (activeChild === "CameraScreen") {
    return <View style={styles.noTab} />;
  }
}

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName: keyof typeof Ionicons.glyphMap = "home";
        if (route.name === "CameraStack") iconName = "camera";
        if (route.name === "SettingStack") iconName = "settings";

        return route.name === "CameraStack" ? (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.TabCamera,
              isFocused
                ? { borderColor: "#181301ff" }
                : { borderColor: "#fff" },
            ]}
          >
            <Ionicons
              name={iconName}
              size={48}
              color={isFocused ? "#250101ff" : "#fff"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tab,
              isFocused
                ? { borderColor: "#ffcc00" }
                : { borderColor: "#fff" },
            ]}
          >
            <Ionicons
              name={iconName}
              size={28}
              color={isFocused ? "#ffcc00" : "#fff"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


export default TabBar;

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f25c27", // warna oranye bawah
        height: 90,
        paddingBottom: -3,
    },
    tab: {
        backgroundColor: "#b93100ff",
        alignItems: "center",
        justifyContent: "center",
        width: 55,
        height: 55,
        borderRadius: 27.5,
        borderWidth: 3,
    },
    TabCamera: {
        backgroundColor: "#ffcc00",
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 7,
        marginTop: -70, 
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5, 
    },
    noTab: {
        display: "none"
    }
});
