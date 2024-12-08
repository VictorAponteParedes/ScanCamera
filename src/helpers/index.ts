// src/helpers/requestCameraPermission.ts
import { Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestCameraPermission = async () => {
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

export default requestCameraPermission;
