import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { CameraStackParamList } from "../../navigation/CamerStack"; // 👈 import

type HasilRouteProp = RouteProp<CameraStackParamList, "Hasil">;

export default function Hasil() {
  const route = useRoute<HasilRouteProp>();
  const { prediction, probabilities } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Hasil Klasifikasi
      </Text>
      <Text style={{ fontSize: 18, color: "green", marginBottom: 20 }}>
        {prediction}
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
        Probabilities:
      </Text>
      <FlatList
        data={probabilities}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <Text>
            Kelas {index + 1}: {(item * 100).toFixed(2)}%
          </Text>
        )}
      />
    </View>
  );
}
