import { Colors } from "@/app/styles/colors";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import ImagePicker from "../dev/components/imagePicker";
import { saveUser, userExists } from "../dev/services/user";
import { indexStyles } from "../styles/indexStyles";



const SignUp = () => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [image, setImage] = React.useState("https://placehold.co/600x400/000000/FFF");

    const handleSignUp = async () => {
        const exists = await userExists(email);
        if (exists) {
            console.log('Usuário já cadastrado!');
            Toast.show({
                type: 'info',
                text1: 'E-mail já existe!',
                text2: 'Esse e-mail já está cadastrado.'
            });
            return;
        }

        await saveUser({ name, email, password, image });
        console.log('Usuário cadastrado com sucesso!');
        Toast.show({
            type: 'success',
            text1: 'Cadastrado!',
            text2: 'Usuário cadastrado com sucesso! Faça login.'
        });
        router.push('/login');
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
                    <Text style={indexStyles.pageTitle}>Cadastrar</Text>
                    <View style={indexStyles.section}>
                        <ImagePicker />
                    </View>
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.label}>Nome:</Text>
                        <TextInput
                            style={indexStyles.input}
                            placeholder="Digite seu nome"
                            placeholderTextColor={Colors.placeholder}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={indexStyles.section}>
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

                    <Link href="/login" asChild>
                        <TouchableOpacity style={indexStyles.link}>
                            <Text style={indexStyles.linkText}>Já tem uma conta? Faça login.</Text>
                        </TouchableOpacity>
                    </Link>


                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={handleSignUp}>
                        <Text style={indexStyles.buttonPrimaryText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};


export default SignUp;