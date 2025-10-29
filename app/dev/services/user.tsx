import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export interface User {
    name: string;
    email: string;
    password: string;
    image?: string;
}

export const saveUser = async (user: User) => {
    try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        users.push(user);
        await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.log('Erro ao salvar usuário:', error);
    }
};

export const loadUsers = async () => {
    try {
        const storedUsers = await AsyncStorage.getItem('users');
        return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
        console.log('Erro ao carregar usuários:', error);
        return [];
    }
};

export const userExists = async (email: string) => {
    try {
        const users = await loadUsers();
        return users.some((user: User) => user.email === email);
    } catch (error) {
        console.log('Erro ao verificar usuário:', error);
        return false;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const users = await loadUsers();
        const user = users.find((u: User) => u.email === email && u.password === password);
        return user || null;
    } catch (error) {
        console.log('Erro ao fazer login:', error);
        return null;
    }
};

// --------------- Profile Pic ---------------

export const uploadImage = async (): Promise<string | null> => {
    try {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Toast.show({
                type: 'error',
                text1: 'Permissão negada!',
                text2: 'Você negou a permissão para acessar a galeria.'
            });
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        console.log('Erro ao escolher imagem:', error);
        return null;
    }
};

export const takePhoto = async (): Promise<string | null> => {
    try {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Toast.show({
                type: 'error',
                text1: 'Permissão negada!',
                text2: 'Você negou a permissão para acessar a câmera.'
            });
            return null;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }

        return null;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Erro ao tirar a foto!',
            text2: 'Ocorreu um erro ao tentar tirar a foto. Tente novamente.'
        });
        return null;
    }
};
