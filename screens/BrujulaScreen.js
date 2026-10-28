import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Magnetometer } from "expo-sensors";

const DIRECCIONES = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

export default function BrujulaScreen() {
  const [disponible, setDisponible] = useState(null); // null = verificando
  const [datos, setDatos] = useState({ x: 0, y: 0, z: 0 });
  const [angulo, setAngulo] = useState(0);

  useEffect(() => {
    let sub = null;
    let activo = true;

    async function iniciar() {
      try {
        const ok = await Magnetometer.isAvailableAsync();
        if (!activo) return;
        setDisponible(ok);
        if (!ok) return;

        Magnetometer.setUpdateInterval(250);
        sub = Magnetometer.addListener(({ x, y, z }) => {
          const a = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
          setDatos({ x, y, z });
          setAngulo(a);
        });
      } catch (e) {
        if (activo) setDisponible(false);
      }
    }

    iniciar();

    // Limpieza: evita acumular suscripciones
    return () => {
      activo = false;
      if (sub) sub.remove();
    };
  }, []);

  if (disponible === null) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text style={styles.texto}>Verificando sensor...</Text>
      </View>
    );
  }

  if (!disponible) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>Sensor no disponible</Text>
        <Text style={styles.texto}>
          Este dispositivo no cuenta con magnetómetro.
        </Text>
      </View>
    );
  }

  const direccion = DIRECCIONES[Math.round(angulo / 45) % 8];

  return (
    <View style={styles.centro}>
      <Text style={styles.grande}>
        {angulo.toFixed(0)}° {direccion}
      </Text>
      <View style={styles.tarjeta}>
        <Text style={styles.texto}>X: {datos.x.toFixed(2)} µT</Text>
        <Text style={styles.texto}>Y: {datos.y.toFixed(2)} µT</Text>
        <Text style={styles.texto}>Z: {datos.z.toFixed(2)} µT</Text>
      </View>
      <Text style={styles.nota}>
        Orientación aproximada: supone el teléfono en posición horizontal; no es
        un rumbo geográfico calibrado ni corrige declinación magnética o
        inclinación.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 14,
  },
  grande: { fontSize: 48, fontWeight: "bold" },
  texto: { fontSize: 16, color: "#333", textAlign: "center" },
  error: { fontSize: 18, fontWeight: "bold", color: "#c0392b" },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    gap: 6,
    width: "100%",
    alignItems: "center",
  },
  nota: { fontSize: 13, color: "#667", textAlign: "center" },
});
