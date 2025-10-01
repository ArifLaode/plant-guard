import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CameraStackParamList } from "../../navigation/CamerStack"; // 👈 import

type LoadingProsesNavProp = NativeStackNavigationProp<
  CameraStackParamList,
  "LoadingProses"
>;

export default function LoadingProses() {
  const navigation = useNavigation<LoadingProsesNavProp>();
  const route = (navigation as any).getState().routes.find((r: any) => r.name === "LoadingProses");

  useEffect(() => {
  const fetchData = async () => {
    console.log("🔄 [LoadingProses] fetchData() dipanggil");

    try {
      // Ambil URI gambar yang dikirim dari CameraScreen
      const { uri } = route.params;
      console.log("📷 [LoadingProses] URI gambar yang dikirim:", uri);

      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        type: "image/jpeg",   // sesuaikan kalau PNG
        name: "photo.jpg",
      } as any);

      console.log("📡 [LoadingProses] Mengirim request POST ke http://192.168.1.35:5000/predict");

      const res = await fetch("http://192.168.1.35:5000/predict", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ [LoadingProses] Response diterima:", res.status, res.statusText);

      const data = await res.json();
      console.log("📦 [LoadingProses] Data hasil parsing JSON:", data);

      navigation.replace("Hasil", { prediction: data.prediction, probabilities: data.probabilities });
      console.log("➡️ [LoadingProses] Navigasi ke Hasil dengan result:", data.result);

    } catch (error) {
      console.error("❌ [LoadingProses] Terjadi error:", error);
    }
  };

  fetchData();
}, []);



  return (
    <View>
      <Text>Memproses Gambar...</Text>
      <ActivityIndicator size="large" color="yellow" />
    </View>
  );
}
