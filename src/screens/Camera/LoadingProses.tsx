import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { CameraStackParamList } from "../../navigation/CameraStack"; // 👈 import
import Header from "../../components/Header";

type LoadingProsesNavProp = NativeStackNavigationProp<
  CameraStackParamList,
  "LoadingProses"
>;

type LoadingRouteProp = RouteProp<CameraStackParamList, "LoadingProses">;

export default function LoadingProses() {
  const navigation = useNavigation<LoadingProsesNavProp>();
  const route = useRoute<LoadingRouteProp>();

  useEffect(() => {
    const fetchData = async () => {
      console.log("🔄 [LoadingProses] fetchData() dipanggil");

      try {
        const { uri } = route.params;

        const formData = new FormData();
        formData.append("file", {
          uri,
          name: "photo.jpg",
          type: "image/jpeg",
        } as any);

        const res = await fetch("http://103.253.212.20/predict", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(
          "✅ [LoadingProses] Response diterima:",
          res.status,
          res.statusText,
        );

        const data = await res.json();
        console.log("📦 [LoadingProses] Data hasil parsing JSON:", data);

        navigation.replace("Hasil", {
          prediction: data.prediction,
          probabilities: data.probabilities,
        });
        console.log(
          "➡️ [LoadingProses] Navigasi ke Hasil dengan result:",
          data.result,
        );
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
