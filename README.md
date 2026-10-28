# Explorador móvil

Aplicación móvil desarrollada con Expo y React Native para la práctica de laboratorio de la materia Desarrollo de Aplicaciones Móviles. Permite capturar una fotografía, consultar la ubicación actual y visualizar la orientación aproximada del teléfono mediante el magnetómetro.

## Funcionalidades

- Cámara: vista previa con CameraView, manejo de permisos (pendiente, concedido, denegado), botón para volver a solicitarlo, captura de foto y visualización con Image.
- Ubicación: permiso en primer plano, latitud y longitud con 6 decimales, precisión reportada en metros, indicador de carga y mensajes de error.
- Brújula: lectura del magnetómetro (X, Y, Z en µT), ángulo y dirección aproximada, mensaje "Sensor no disponible" y limpieza de la suscripción al desmontar.
- Navegación sencilla por pestañas entre los tres módulos.

## Estructura del proyecto

- App.js: pantalla principal y navegación entre módulos.
- screens/CamaraScreen.js: módulo de cámara.
- screens/UbicacionScreen.js: módulo de ubicación.
- screens/BrujulaScreen.js: módulo de brújula.

## Requisitos

- Node.js instalado.
- Editor de código (Visual Studio Code).
- Expo Go instalado en un teléfono físico Android o iOS.
- Teléfono y computadora en la misma red local (o uso de túnel).

## Instalación

1. Clonar el repositorio:

   git clone URL_DEL_REPOSITORIO
   cd explorador-movil

2. Instalar dependencias:

   npm install

## Ejecución

1. Iniciar el servidor de desarrollo:

   npx expo start

2. Escanear el código QR con Expo Go (Android) o con la cámara (iOS).
3. Si la conexión local falla, usar el modo túnel:

   npx expo start --tunnel

## Limitaciones conocidas

- Debe probarse en un dispositivo físico; los simuladores pueden carecer de cámara, magnetómetro o datos reales de ubicación.
- La orientación de la brújula se calcula con los ejes X e Y y supone que el teléfono está en posición horizontal. No es un rumbo geográfico calibrado y no corrige la declinación magnética ni la inclinación.
- El magnetómetro es sensible a interferencias de metales, imanes y aparatos electrónicos cercanos, por lo que el ángulo puede no coincidir con el norte.
- La precisión de la ubicación es un valor reportado por el sistema y no un error garantizado.
- La fotografía no se guarda en la galería y la ubicación no se almacena ni se comparte.
- Si el usuario deniega un permiso desde el sistema operativo, puede ser necesario habilitarlo manualmente en los ajustes del teléfono.

## Documentación de apoyo

- Expo Camera: https://docs.expo.dev/versions/latest/sdk/camera/
- Expo Location: https://docs.expo.dev/versions/latest/sdk/location/
- Expo Sensors: https://docs.expo.dev/versions/latest/sdk/sensors/
