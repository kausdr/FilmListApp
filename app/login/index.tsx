import { Colors } from "@/app/styles/colors";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { loginUser } from "../dev/services/user";
import { indexStyles } from "../styles/indexStyles";


const Login = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        const user = await loginUser(email, password);
        if (user) {
            console.log('Login bem-sucedido!', user);
            router.push('/home');
        } else {
            console.log('Email ou senha incorretos!');
            Toast.show({
                type: 'error',
                text1: 'Erro ao fazer login!',
                text2: 'Usuário não encontrado.'
            });
        }
    };

    return (
        <View style={indexStyles.outerContainer}>
            <ScrollView style={indexStyles.innerContainer}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={indexStyles.card}>
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.pageTitle}>Login</Text>
                        <Text style={indexStyles.label}>Email:</Text>
                        <TextInput
                            style={indexStyles.input}
                            placeholder="Digite seu email"
                            placeholderTextColor={Colors.placeholder}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.label}>Senha:</Text>
                        <TextInput
                            style={indexStyles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor={Colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Link href="/signup" asChild>
                        <TouchableOpacity style={indexStyles.link}>
                            <Text style={indexStyles.linkText}>Não tem uma conta?</Text>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={handleLogin}>
                        <Text style={indexStyles.buttonPrimaryText}>Entrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};

export default Login;