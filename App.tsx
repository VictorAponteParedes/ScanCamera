import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Permission, check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App: React.FC = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA;

      const status = await check(permission);
      if (status === RESULTS.DENIED) {
        const requestStatus = await request(permission);
        if (requestStatus === RESULTS.GRANTED) {
          console.log('Permission granted');
        } else {
          Alert.alert('Permiso denegado', 'No se pudo acceder a la cámara.');
        }
      }
    };

    requestCameraPermission();
  }, []);

  if (device == null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => setIsCameraActive(true)}>
          <Text style={styles.buttonText}>📸 Abrir Cámara</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
