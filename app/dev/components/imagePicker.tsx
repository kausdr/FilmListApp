import React from "react";
import ReactDOM from "react-dom";
import { ActionSheetIOS, Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { indexStyles } from "../../styles/indexStyles";
import { takePhoto, uploadImage } from '../services/user';

const ImagePicker: React.FC = () => {
    const [image, setImage] = React.useState<string>("https://placehold.co/600x400?text=O");
    const [showWebOptions, setShowWebOptions] = React.useState(false);
    const [showCamera, setShowCamera] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState<MediaStream | null>(null);

    const handleUploadImage = async () => {
        if (Platform.OS === "web") {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (event: Event) => {
                const target = event.target as HTMLInputElement;
                if (target.files && target.files[0]) {
                    setImage(URL.createObjectURL(target.files[0]));
                }
            };
            input.click();
        } else {
            const uri = await uploadImage();
            if (uri) setImage(uri);
        }
        setShowWebOptions(false);
    };

    const handleTakePhotoWeb = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setVideoStream(stream);
            setShowCamera(true);
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao acessar câmera',
                text2: String(err)
            });
        }
        setShowWebOptions(false);
    };

    const capturePhoto = () => {
        if (!videoStream) return;
        const video = document.getElementById('webVideo') as HTMLVideoElement;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const uri = canvas.toDataURL('image/png');
        setImage(uri);

        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
        setShowCamera(false);
    };

    // Cancelar câmera
    const cancelCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
        }
        setVideoStream(null);
        setShowCamera(false);
    };

    const handleTakePhoto = async () => {
        if (Platform.OS === "web") {
            await handleTakePhotoWeb();
        } else {
            const uri = await takePhoto();
            if (uri) setImage(uri);
        }
        setShowWebOptions(false);
    };

    const openDropdown = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancelar', 'Escolher da galeria', 'Tirar foto'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) handleUploadImage();
                    if (buttonIndex === 2) handleTakePhoto();
                }
            );
        } else if (Platform.OS === 'web') {
            setShowWebOptions(true);
        } else {
            Alert.alert(
                'Selecionar imagem',
                'Escolha uma opção',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Escolher da galeria', onPress: handleUploadImage },
                    { text: 'Tirar foto', onPress: handleTakePhoto },
                ]
            );
        }
    };

    const WebDropdown = () => {
        if (!showWebOptions) return null;
        return ReactDOM.createPortal(
            <div style={styles.webOverlay} onClick={() => setShowWebOptions(false)}>
                <div style={styles.webDropdown} onClick={(e) => e.stopPropagation()}>
                    <button style={styles.webButtonPrimary} onClick={handleUploadImage}>Escolher da galeria</button>
                    <button style={styles.webButtonPrimary} onClick={handleTakePhotoWeb}>Tirar foto</button>
                </div>
            </div>,
            document.body
        );
    };

    const WebCamera = () => {
        if (!showCamera || !videoStream) return null;
        return ReactDOM.createPortal(
            <div style={styles.webOverlay} onClick={cancelCamera}>
                <div style={styles.webDropdown} onClick={(e) => e.stopPropagation()}>
                    <video
                        id="webVideo"
                        autoPlay
                        playsInline
                        muted
                        style={{ width: 300, borderRadius: 10 }}
                        ref={v => { if (v) v.srcObject = videoStream; }}
                    />
                    <button style={styles.webButtonPrimary} onClick={capturePhoto}>Capturar foto</button>
                    <button style={styles.webButtonSecondary} onClick={cancelCamera}>Cancelar</button>
                </div>
            </div>,
            document.body
        );
    };

    return (
        <View style={indexStyles.section}>
            <Image source={{ uri: image }} style={indexStyles.profileImage} />
            <TouchableOpacity style={indexStyles.buttonPrimary} onPress={openDropdown}>
                <Text style={indexStyles.buttonPrimaryText}>Alterar foto</Text>
            </TouchableOpacity>

            {Platform.OS === 'web' && <WebDropdown />}
            {Platform.OS === 'web' && <WebCamera />}
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    webOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    webDropdown: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
    },
    webButtonPrimary: {
        padding: 10,
        width: '100%',
        marginVertical: 5,
        backgroundColor: '#023b84ff',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 5,
        cursor: 'pointer',
        textAlign: 'center' as const,
        borderWidth: 0,
    },
    webButtonSecondary: {
        padding: 10,
        width: '100%',
        marginVertical: 5,
        backgroundColor: '#d6e4f7ff',
        color: '#001f48ff',
        fontWeight: 'bold',
        borderRadius: 5,
        cursor: 'pointer',
        textAlign: 'center' as const,
        borderWidth: 0,
    },
});
