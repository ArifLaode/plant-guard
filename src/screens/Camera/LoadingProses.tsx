import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CameraStackParamList } from "../../navigation/CameraStack"; // 👈 import
import Header from "../../components/Header";


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

      console.log("📡 [LoadingProses] Mengirim request POST ke http://103.253.212.20/predict");

      const res = await fetch("http://103.253.212.20/predict", {
        method: "POST",
        body: formData,
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
  <View style={styles.container}>
    <Header title="Memproses Gambar" />

    <View style={styles.content}>
      <ActivityIndicator size="large" color="#f25c27" />

      <Text style={styles.title}>Memproses Gambar</Text>

      <Text style={styles.subtitle}>
        Mohon tunggu sebentar, sistem sedang menganalisis gambar.
      </Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
});
