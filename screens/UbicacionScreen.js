import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

export default function UbicacionScreen() {
  const [cargando, setCargando] = useState(false);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [permiso, setPermiso] = useState("pendiente");

  async function obtenerUbicacion() {
    try {
      setError(null);
      setCargando(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermiso("denegado");
        setError(
          "Permiso de ubicación denegado. Puedes volver a intentarlo cuando lo desees.",
        );
        return;
      }
      setPermiso("concedido");

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    } catch (e) {
      setError(
        "No se pudo obtener la ubicación. Verifica que el GPS esté activo e intenta de nuevo.",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.estado}>Permiso: {permiso}</Text>

      <Pressable
        style={[styles.boton, cargando && styles.botonOff]}
        onPress={obtenerUbicacion}
        disabled={cargando}
      >
        <Text style={styles.botonTexto}>Obtener mi ubicación</Text>
      </Pressable>

      {cargando && (
        <View style={styles.fila}>
          <ActivityIndicator />
          <Text style={styles.texto}>Obteniendo ubicación...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {coords && !cargando && (
        <View style={styles.tarjeta}>
          <Text style={styles.texto}>
            Latitud: {coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.texto}>
            Longitud: {coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.texto}>
            Precisión reportada:{" "}
            {coords.accuracy != null
              ? `${coords.accuracy.toFixed(1)} m`
              : "no disponible"}
          </Text>
        </View>
      )}

      {!coords && !cargando && !error && (
        <Text style={styles.texto}>
          Presiona el botón para consultar tu ubicación actual.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: "center", padding: 20, gap: 14 },
  estado: { fontSize: 16, fontWeight: "bold" },
  fila: { flexDirection: "row", alignItems: "center", gap: 8 },
  texto: { fontSize: 16, color: "#333", textAlign: "center" },
  error: { color: "#c0392b", textAlign: "center" },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 6,
    width: "100%",
  },
  boton: {
    backgroundColor: "#1e6fd9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonOff: { backgroundColor: "#9aa7b5" },
  botonTexto: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
