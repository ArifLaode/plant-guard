import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  CameraType,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CameraStackParamList } from "../../navigation/CamerStack"; // 👈 import

type CameraNavProp = NativeStackNavigationProp<
  CameraStackParamList,
  "CameraScreen"
>;

export default function CameraScreen() {
  const navigation = useNavigation<CameraNavProp>();
  const insets = useSafeAreaInsets();
  const cameraRef = React.useRef<CameraView>(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);

  if (!permission) {
    return <View style={styles.center} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btnPerm}>
          <Text style={{ color: "white" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

const takePicture = async () => {
  if (cameraRef.current && !isCapturing) {
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      navigation.navigate("LoadingProses", { uri: photo.uri });
    } catch (err) {
      Alert.alert("Error", "Gagal mengambil foto");
    } finally {
      setIsCapturing(false);
    }
  }
};

  const toggleFlash = () => {
    setFlash((f) => (f === "on" ? "off" : "on"));
  }

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // langsung kirim ke LoadingProses
      navigation.navigate("LoadingProses", { uri });
    }
  };

  return (
  <View style={styles.container}>
    <CameraView
      ref={cameraRef}
      style={styles.preview}
      facing={facing}
      flash={flash}
    />

    {/* tombol back */}
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.topButton, { top: insets.top + 10 }]}
    >
      <Ionicons name="arrow-back" size={26} color="white" />
    </TouchableOpacity>

    {/* tombol bawah */}
    <View style={[styles.controls, { paddingBottom: insets.bottom + 12 }]}>
      {/* kiri: flash toggle */}
      <TouchableOpacity style={styles.smallButton} onPress={toggleFlash}>
        <Ionicons name="flash" size={22} color="#000" />
      </TouchableOpacity>

      {/* tengah: shutter */}
      <TouchableOpacity
  activeOpacity={0.8}
  onPress={takePicture}
  disabled={isCapturing}
  style={[styles.shutterOuter, isCapturing && { opacity: 0.5 }]}
>
  <View style={styles.shutterInner} />
</TouchableOpacity>


      {/* kanan: gallery */}
      <TouchableOpacity style={styles.smallButton} onPress={openGallery}>
        <Ionicons name="images" size={22} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
);

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { textAlign: "center", marginBottom: 10, color: "white" },
  btnPerm: {
    padding: 10,
    backgroundColor: "black",
    borderRadius: 6,
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  topButton: {
    position: "absolute",
    left: 12,
    padding: 6,
    backgroundColor: "transparent",
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  smallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.98)",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#efefef",
  },
});
