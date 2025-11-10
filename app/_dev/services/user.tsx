import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export interface User {
    name: string;
    email: string;
    password: string;
    image?: string;
}

const LOGGED_IN_USER_KEY = '@LoggedInUser'; 

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

export const updateUser = async (oldEmail: string, updatedUser: User): Promise<User | null> => {
    try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const userIndex = users.findIndex((u: User) => u.email === oldEmail);

        if (userIndex === -1) {
            console.log(`Usuário com email ${oldEmail} não encontrado.`);
            return null;
        }

        users[userIndex] = updatedUser;

        await AsyncStorage.setItem('users', JSON.stringify(users));

        return updatedUser;
    } catch (error) {
        console.log('Erro ao atualizar usuário:', error);
        return null;
    }
};

export const saveLoggedInUser = async (user: User | null) => {
    try {
        if (user) {
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
        } else {
            await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
        }
    } catch (error) {
        console.log('Erro ao salvar usuário logado:', error);
    }
};

export const loadLoggedInUser = async (): Promise<User | null> => {
    try {
        const storedUser = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.log('Erro ao carregar usuário logado:', error);
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
            base64: true, 
        });

        if (!result.canceled && result.assets && result.assets[0].base64) {
            return `data:image/jpeg;base64,${result.assets[0].base64}`;
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
            base64: true, 
        });

        if (!result.canceled && result.assets && result.assets[0].base64) {
            return `data:image/jpeg;base64,${result.assets[0].base64}`;
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
