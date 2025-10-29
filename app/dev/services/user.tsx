import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password: string;
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
