import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="Plant Guard" />
      <View style={styles.content}>
        <Text style={styles.title}>Selamat Datang di Plant Guard</Text>
        <Text style={styles.desc}>
          Aplikasi deteksi dini penyakit tanaman berbasis citra untuk tanaman selada.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { textAlign: "center", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  desc: { textAlign: "center", fontSize: 14, marginBottom: 30 },
  cameraButton: {
    backgroundColor: "#ffcc00",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: { marginTop: 5, color: "#fff", fontWeight: "bold" },
});