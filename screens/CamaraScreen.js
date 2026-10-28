import { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CamaraScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState(null);
  const [listo, setListo] = useState(false);
  const [capturando, setCapturando] = useState(false);
  const [error, setError] = useState(null);

  async function tomarFoto() {
    if (!listo || capturando || !cameraRef.current) return;
    try {
      setError(null);
      setCapturando(true);
      const foto = await cameraRef.current.takePictureAsync();
      if (foto?.uri) setFotoUri(foto.uri);
    } catch (e) {
      setError("No se pudo tomar la foto. Intenta de nuevo.");
    } finally {
      setCapturando(false);
    }
  }

  // Permiso pendiente de consulta
  if (!permission) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text style={styles.texto}>Verificando permiso de cámara...</Text>
      </View>
    );
  }

  // Permiso denegado o aún no concedido
  if (!permission.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.estado}>
          Estado del permiso: denegado o pendiente
        </Text>
        <Text style={styles.texto}>
          La aplicación necesita acceso a la cámara para tomar fotografías.
          Puedes concederlo presionando el botón.
        </Text>
        <Pressable style={styles.boton} onPress={requestPermission}>
          <Text style={styles.botonTexto}>Solicitar permiso</Text>
        </Pressable>
      </View>
    );
  }

  // Foto capturada
  if (fotoUri) {
    return (
      <View style={styles.centro}>
        <Text style={styles.estado}>Foto capturada</Text>
        <Image source={{ uri: fotoUri }} style={styles.foto} />
        <Pressable style={styles.boton} onPress={() => setFotoUri(null)}>
          <Text style={styles.botonTexto}>Tomar otra foto</Text>
        </Pressable>
      </View>
    );
  }

  // Vista previa
  return (
    <View style={styles.flex}>
      <CameraView
        ref={cameraRef}
        style={styles.flex}
        facing="back"
        onCameraReady={() => setListo(true)}
      />
      <View style={styles.barra}>
        {error && <Text style={styles.error}>{error}</Text>}
        <Pressable
          style={[styles.boton, (!listo || capturando) && styles.botonOff]}
          onPress={tomarFoto}
          disabled={!listo || capturando}
        >
          <Text style={styles.botonTexto}>
            {capturando
              ? "Capturando..."
              : listo
                ? "Tomar foto"
                : "Preparando cámara..."}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  texto: { textAlign: "center", fontSize: 15, color: "#333" },
  estado: { fontSize: 16, fontWeight: "bold" },
  foto: { width: "100%", flex: 1, resizeMode: "contain" },
  barra: { padding: 14, alignItems: "center", backgroundColor: "#f4f6f8" },
  boton: {
    backgroundColor: "#1e6fd9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonOff: { backgroundColor: "#9aa7b5" },
  botonTexto: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "#c0392b", marginBottom: 8 },
});
