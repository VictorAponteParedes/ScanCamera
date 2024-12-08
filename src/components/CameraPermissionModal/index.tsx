// src/components/CameraPermissionModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

interface CameraPermissionModalProps {
    visible: boolean;
    onClose: () => void;
    onGrantPermission: () => void;
}

const CameraPermissionModal: React.FC<CameraPermissionModalProps> = ({
    visible,
    onClose,
    onGrantPermission,
}) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>¡Se necesita acceso a tu cámara!</Text>

                    <TouchableOpacity style={styles.button} onPress={onGrantPermission}>
                        <Text style={styles.buttonText}>Dar Permiso</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'gray' }]}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// **Agregar la función estática checkCameraPermission**
CameraPermissionModal.checkCameraPermission = async () => {
    const permission =
        Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA;

    const status = await check(permission);

    if (status === RESULTS.DENIED) {
        const requestStatus = await request(permission);
        return requestStatus === RESULTS.GRANTED;
    }
    return status === RESULTS.GRANTED;
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        width: 300,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CameraPermissionModal;
