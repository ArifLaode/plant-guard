import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { CameraStackParamList } from "../../navigation/CameraStack";
import Header from "../../components/Header";

type HasilRouteProp = RouteProp<CameraStackParamList, "Hasil">;

export default function Hasil() {
  const route = useRoute<HasilRouteProp>();
  const { prediction, probabilities } = route.params;

  return (
    <View style={styles.container}>
      <Header title="Hasil Prediksi" />

      <View style={styles.content}>
        <Text style={styles.title}>Hasil Klasifikasi</Text>

        <Text style={styles.prediction}>{prediction}</Text>

        <Text style={styles.subtitle}>Probabilities</Text>

        <FlatList
          data={probabilities}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                Kelas {index + 1}
              </Text>
              <Text style={styles.itemValue}>
                {(item * 100).toFixed(2)}%
              </Text>
            </View>
          )}
        />
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
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  prediction: {
    fontSize: 20,
    color: "#16a34a",
    fontWeight: "600",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  itemText: {
    fontSize: 15,
  },

  itemValue: {
    fontSize: 15,
    fontWeight: "600",
  },
});
