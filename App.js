import { useState } from "react";
import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import CamaraScreen from "./screens/CamaraScreen";
import UbicacionScreen from "./screens/UbicacionScreen";
import BrujulaScreen from "./screens/BrujulaScreen";

const MODULOS = [
  { id: "camara", titulo: "Cámara" },
  { id: "ubicacion", titulo: "Ubicación" },
  { id: "brujula", titulo: "Brújula" },
];

export default function App() {
  const [activo, setActivo] = useState("camara");

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.titulo}>Explorador móvil</Text>

      <View style={styles.tabs}>
        {MODULOS.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => setActivo(m.id)}
            style={[styles.tab, activo === m.id && styles.tabActivo]}
          >
            <Text
              style={[
                styles.tabTexto,
                activo === m.id && styles.tabTextoActivo,
              ]}
            >
              {m.titulo}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.contenido}>
        {activo === "camara" && <CamaraScreen />}
        {activo === "ubicacion" && <UbicacionScreen />}
        {activo === "brujula" && <BrujulaScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f4f6f8", paddingTop: 40 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#dde3ea",
  },
  tabActivo: { backgroundColor: "#1e6fd9" },
  tabTexto: { color: "#333", fontWeight: "600" },
  tabTextoActivo: { color: "#fff" },
  contenido: { flex: 1, marginTop: 12 },
});
