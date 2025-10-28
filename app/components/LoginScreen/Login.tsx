import { Colors } from "@/app/styles/colors";
import React from "react";
import { Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { indexStyles } from "../../styles/indexStyles";

export const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
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
                <TouchableOpacity style={indexStyles.link} onPress={() => Linking.openURL('https://google.com')}>
                    <Text style={indexStyles.linkText}>
                        Não tem uma conta?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={() => console.log('Clicou!')}>
                    <Text style={indexStyles.buttonPrimaryText}>Entrar</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};