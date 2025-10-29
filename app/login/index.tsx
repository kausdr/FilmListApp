import { Colors } from "@/app/styles/colors";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { indexStyles } from "../styles/indexStyles";


const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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

                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={() => console.log('Clicou!')}>
                        <Text style={indexStyles.buttonPrimaryText}>Entrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};

export default Login;